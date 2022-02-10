import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const config = {
  api: {
    port: Number(process.env.PORT),
  },
};

export default config;
