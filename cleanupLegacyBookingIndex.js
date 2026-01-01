import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const collection = mongoose.connection.collection('bookings');

  try {
    await collection.dropIndex('bookingId_1');
    console.log('Dropped bookingId_1 index');
  } catch (error) {
    if (error.codeName === 'IndexNotFound' || error.code === 27) {
      console.log('bookingId_1 index not found, skipping drop');
    } else {
      console.error('Failed to drop bookingId_1 index:', error.message);
    }
  }

  await mongoose.disconnect();
}

run()
  .then(() => {
    console.log('Booking index cleanup complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Cleanup failed', error);
    process.exit(1);
  });
