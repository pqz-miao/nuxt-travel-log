import { getLocations } from "~/utils/db/queries/locations";

import defineAuthenticatedEventHandler from "../utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return getLocations(event.context.user.id);
});
