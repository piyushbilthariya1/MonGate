import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Standard for GCM
const AUTH_TAG_LENGTH = 16;
const MASTER_SECRET = process.env.MASTER_KEY_SECRET || "antigravity-fallback-secret-32-chars";

/**
 * Encrypts a string using AES-256-GCM
 * Returns a colon-separated string: iv:authTag:encryptedData
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.scryptSync(MASTER_SECRET, "salt", 32);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts a colon-separated string: iv:authTag:encryptedData
 */
export function decrypt(cipherText: string): string {
  const [ivHex, authTagHex, encryptedData] = cipherText.split(":");
  
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const key = crypto.scryptSync(MASTER_SECRET, "salt", 32);
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
