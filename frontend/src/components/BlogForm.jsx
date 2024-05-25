import { AxiosError } from 'axios';
import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      setMessage(`New blog title: ${blog.title} created.`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form data-testid="testForm" onSubmit={addBlog}>
        <li>
          title:
          <input
            id="input-title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="input title"
          />
        </li>
        <li>
          author:
          <input
            id="input-author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="input author"
          />
        </li>
        <li>
          url:
          <input
            id="input-url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="input url"
          />
        </li>

        <button className="btn-normal" type="submit">
          create
        </button>
        <br />
      </form>
    </div>
  );
};

export default BlogForm;
