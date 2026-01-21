import { deleteCookie } from "cookies-next";

import { ASSESS_TOKEN, REFRESH_TOKEN } from "./constants";

const clearStorage = () => {
  deleteCookie(ASSESS_TOKEN);
  deleteCookie(REFRESH_TOKEN);
};

export { clearStorage };
