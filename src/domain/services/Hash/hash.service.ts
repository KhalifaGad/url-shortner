import { randomBytes, randomUUID } from "crypto";

class HashService {
  generateHash() {
    const hexString = randomBytes(2).toString("hex");
    const uuid = randomUUID();
    const base64 = Buffer.from(hexString, "ascii");
    const randomNumber = Math.random() * 13;
    return uuid.substring(randomNumber, randomNumber + 3) + base64;
  }
}

export default new HashService();
