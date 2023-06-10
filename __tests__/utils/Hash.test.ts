import { Hash, HashValue } from "../../src/utils/Hash.js";
import * as crypto from "crypto";

describe("Hash", () => {
  it("should hash string correctly", () => {
    const key = "test";
    const hash = Hash.hash(key);

    const cryptoHash = crypto.createHash("sha256");
    cryptoHash.update(key);
    const hashBuffer = cryptoHash.digest();
    const hashDecimal = BigInt("0x" + hashBuffer.toString("hex"));

    expect(hash.value).toEqual(hashDecimal);
  });

  it("should give different hashes for different keys", () => {
    const hash1 = Hash.hash("test1");
    const hash2 = Hash.hash("test2");

    expect(hash1.value).not.toEqual(hash2.value);
  });

  it("should give same hash for the same key", () => {
    const hash1 = Hash.hash("test");
    const hash2 = Hash.hash("test");

    expect(hash1.value).toEqual(hash2.value);
  });
});

describe("HashValue", () => {
  it("should convert to number correctly", () => {
    const hashValue = new HashValue(BigInt(123));
    expect(hashValue.toNumber()).toEqual(123);
  });

  it("should convert to string correctly", () => {
    const hashValue = new HashValue(BigInt(123));
    expect(hashValue.toString()).toEqual("123");
  });
});
