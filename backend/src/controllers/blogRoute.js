import { Router } from 'express';
import Blog from '../models/blogModel.js';
import { userExtractor } from '../utils/middleware.js';

const blogRouter = Router();

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const reqUser = request.user;

  if (!title || !url) {
    return response.status(400).json({
      error: 'title and url both cannot be blank',
    });
  }
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: reqUser.id,
  });

  try {
    const savedBlog = await blog.save();
    const objId = savedBlog._id;

    // Update user blogs array in collection
    reqUser.blogs = reqUser.blogs.concat(objId);
    await reqUser.save();

    const resBlog = await Blog.findById(objId.toString()).populate('user', {
      username: 1,
      name: 1,
    });

    response.status(201).json(resBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    const blog = await Blog.findById(id).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes, user } = request.body;
  const updateObj = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updateObj,
      { new: true }
    ).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const reqId = request.params.id;
  let blog;

  try {
    blog = await Blog.findById(reqId);
  } catch (error) {
    next(error);
  }

  if (!blog) {
    return response.status(404).json({
      error: `Requested blogID: ${reqId} not found`,
    });
  }
  // Transfer user object to string
  const blogUserID = blog.user.toString();

  const reqUser = request.user;

  if (blogUserID !== reqUser.id.toString()) {
    return response.status(401).json({
      error:
        'Unauthorized operation. Only authorized user can delete this blog.',
    });
  }

  try {
    await Blog.findByIdAndDelete(reqId);

    // Update user blogs array in collection
    reqUser.blogs = reqUser.blogs.filter((e) => e.toString() !== reqId);
    await reqUser.save();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
