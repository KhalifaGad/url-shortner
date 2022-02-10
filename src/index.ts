require("module-alias/register");
import config from "./config";
import { API } from "@interfaces";

try {
  new API.Server(config.api.port).start();
} catch (err) {
  console.error("Cannot launch API server");
  console.error(err);
  process.exit(1);
}
