import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
  api: {
    port: Number(process.env.PORT),
  },
};

export default config;
