import * as crypto from "crypto";

export function hash(key: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(key);
  const hashBuffer = hash.digest();
  const hashDecimal = BigInt("0x" + hashBuffer.toString("hex")).toString();
  return hashDecimal;
}
