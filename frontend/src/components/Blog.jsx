import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user, setMessage }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isAuthorized = blog.user.username === user.username;

  const handleLikeClick = async (event) => {
    event.preventDefault();

    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    let updatedBlog;

    try {
      updatedBlog = await blogService.update(blog.id, newObject);
    } catch (error) {
      console.log(error);
      setMessage(`Error occurs when add likes`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    const newBlogs = blogs.map((e) => (e.id === blog.id ? updatedBlog : e));
    setBlogs(newBlogs);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }
    const blogID = blog.id;

    try {
      await blogService.deleteBlogById(blogID);
      const filteredBlogs = blogs.filter((e) => e.id !== blogID);
      setBlogs(filteredBlogs);
      setMessage(`Blog: ${blog.title} deleted`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage(`Error occurs when delete ${blogID}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div data-testid="blogContent" className="blog-layout">
      {showDetails ? (
        <div>
          <li>
            {blog.title} {blog.author}
            <button
              className="btn-normal"
              onClick={() => setShowDetails(false)}
            >
              hide
            </button>
          </li>
          <li>{blog.url}</li>
          <li>
            likes {blog.likes}
            <button
              data-testid="testLikeButton"
              className="btn-red"
              onClick={handleLikeClick}
            >
              like
            </button>
          </li>
          <li>{blog.user.username}</li>
          {isAuthorized && (
            <button className="btn-red" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      ) : (
        <div data-testid="testblog1">
          {blog.title} {blog.author}
          <button
            data-testid="viewButton"
            className="btn-normal"
            onClick={() => setShowDetails(true)}
          >
            view
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
