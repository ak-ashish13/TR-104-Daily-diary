import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import User from '../models/User.js';

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  dotenv.config({ path: resolve(__dirname, '../.env'), override: true });

  const [emailArg] = process.argv.slice(2);
  if (!emailArg) {
    console.error('Usage: node scripts/deleteUser.js <email>');
    process.exit(1);
  }

  const normalizedEmail = String(emailArg).trim().toLowerCase();
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const result = await User.deleteOne({ email: normalizedEmail });
    console.log(`Deleted ${result.deletedCount} user(s) for email ${normalizedEmail}`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error('Failed to delete user', error);
  process.exit(1);
});
