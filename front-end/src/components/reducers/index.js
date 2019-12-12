import { combineReducers } from "redux";
import messages from "./messages";
import auth from "./auth";
import errors from "./errors";
import packags from "./packages";
import catalogues from "./catalogues";
import report_packags from "./reportpackages";

export default combineReducers({
  packags,
  report_packags,
  catalogues,
  errors,
  auth,
  messages
});
