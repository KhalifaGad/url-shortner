import { randomBytes } from "crypto";

class HashService {
  generateHash() {
    return randomBytes(6).toString("base64").replace("/", ".");
  }
}

export default new HashService();
