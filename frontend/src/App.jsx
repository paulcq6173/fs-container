import { useEffect, /*useRef,*/ useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import LogOutButton from './components/LogOutButton';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import './styles/main.css';

const App = () => {
  const [message, setMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const orderedBlogs = blogs.map((e) => e).sort((a, b) => b.likes - a.likes);
  // handle Toggle state from outside of BlogForm component
  //const blogFormRef = useRef();

  const BlogFormComponent = () => (
    <Togglable buttonLabel="create new blog" /*ref={blogFormRef}*/>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
    </Togglable>
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm setUser={setUser} setMessage={setMessage} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification message={message} />
        <p>
          {user.username} logged in
          <LogOutButton setUser={setUser} />
        </p>
        <div>
          <BlogFormComponent />
          <hr />

          <div className="blog-style">
            {orderedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                setMessage={setMessage}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
