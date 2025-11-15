import type { UserWithId } from "~~/server/utils/auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  }
}

export default {};
