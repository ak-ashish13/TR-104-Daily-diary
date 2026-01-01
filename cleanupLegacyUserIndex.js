import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const collection = mongoose.connection.collection('users');

  try {
    await collection.dropIndex('username_1');
    console.log('Dropped username_1 index');
  } catch (error) {
    if (error.codeName === 'IndexNotFound' || error.code === 27) {
      console.log('username_1 index not found, skipping drop');
    } else {
      console.warn('Failed to drop username_1 index:', error.message);
    }
  }

  const result = await collection.updateMany(
    { username: { $exists: true } },
    { $unset: { username: '' } }
  );
  console.log(`Cleared username field on ${result.modifiedCount} documents`);

  await mongoose.disconnect();
}

run()
  .then(() => {
    console.log('Cleanup completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Cleanup failed', error);
    process.exit(1);
  });
