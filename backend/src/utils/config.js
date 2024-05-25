// Declare for using .env variables
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const devUrl = process.env.MONGODB_URL || null;
const url =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URL
    : devUrl
    ? devUrl
    : null;

export default {
  PORT,
  url,
};
