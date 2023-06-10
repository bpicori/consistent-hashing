import { hash } from "../../src/utils/Hash.js";

describe("hash", () => {
  it("should hash a string to a valid hexadecimal value", () => {
    const key = "Hello, world!";
    const hashedValue = hash(key);
    const isValidHexadecimal = /^[0-9a-fA-F]+$/.test(hashedValue);
    expect(isValidHexadecimal).toBe(true);
  });

  it("should produce different hashes for different input strings", () => {
    const key1 = "String 1";
    const key2 = "String 2";
    const hashedValue1 = hash(key1);
    const hashedValue2 = hash(key2);
    expect(hashedValue1).not.toBe(hashedValue2);
  });

  it("should produce the same hash for the same input string", () => {
    const key = "Hello, world!";
    const hashedValue1 = hash(key);
    const hashedValue2 = hash(key);
    expect(hashedValue1).toBe(hashedValue2);
  });
});
