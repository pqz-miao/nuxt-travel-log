import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { findLocationByName, findUniqueSlug, insertLocation } from "~/utils/db/queries/locations";
import { insertLocationSchema } from "~/utils/db/schemas";

import defineAuthenticatedEventHandler from "../utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, insertLocationSchema.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues.map(
      issue => `${issue.path.join("")}: ${issue.message}`,
    )
      .join("; ");

    const data = result.error.issues
      .reduce((errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existingLocation = await findLocationByName(result.data, event.context.user.id);

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists!",
    }));
  }

  const slug = await findUniqueSlug(slugify(result.data.name));

  try {
    return await insertLocation(result.data, slug, event.context.user.id);
  }
  catch (e) {
    const error = e as DrizzleError;
    const cause = error.cause as { code: string } | undefined;
    if (cause?.code === "SQLITE_CONSTRAINT") {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the location name is used to generate the slug).",
      }));
    }

    throw e;
  }
});
