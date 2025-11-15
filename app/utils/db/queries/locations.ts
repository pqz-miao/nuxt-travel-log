import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertLocation } from "../schemas";

import db from "..";
import { location } from "../schemas";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
};

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
};

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;

    existing = !!(await findLocationBySlug(idSlug));

    if (!existing) {
      return idSlug;
    }
  }

  return slug;
};

export async function getLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
};

export async function insertLocation(newLocation: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...newLocation,
    slug,
    userId,
  }).returning();

  return created;
};
