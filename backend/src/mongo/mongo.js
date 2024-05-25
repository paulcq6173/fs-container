// mongoose is a common JS module,
// which may not support all module.exports as named exports.
import mongoose from 'mongoose';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

async function connectToDB() {
  mongoose.set('strictQuery', false);

  if (config.url && !mongoose.connection.readyState) {
    await mongoose
      .connect(config.url)
      .then(() => logger.info('MongoDB connected'))
      .catch((error) => {
        logger.error('Failed to connect to MongoDB:', error.message);
      });
  }
}

export default connectToDB;
