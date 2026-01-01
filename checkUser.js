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
    console.error('Usage: node scripts/checkUser.js <email>');
    process.exit(1);
  }

  const normalizedEmail = String(emailArg).trim().toLowerCase();
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const existing = await User.findOne({ email: normalizedEmail });
    if (!existing) {
      console.log(`No user found for email ${normalizedEmail}`);
    } else {
      console.log(`User already exists for ${normalizedEmail}:`);
      console.log({
        id: existing._id.toString(),
        name: existing.name,
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
      });
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error('Failed to inspect user', error);
  process.exit(1);
});
