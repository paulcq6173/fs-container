import { Router } from 'express';
import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';

const testingRouter = Router();

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

export default testingRouter;
