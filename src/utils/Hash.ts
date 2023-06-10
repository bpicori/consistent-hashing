import * as crypto from "crypto";

export class HashValue {
  constructor(public value: bigint) {}

  public toNumber(): number {
    return Number(this.value);
  }

  toString(): string {
    return this.value.toString();
  }
}

export class Hash {
  public static hash(key: string): HashValue {
    const hash = crypto.createHash("sha256");
    hash.update(key);
    const hashBuffer = hash.digest();
    const hashDecimal = BigInt("0x" + hashBuffer.toString("hex"));
    return new HashValue(hashDecimal);
  }
}
