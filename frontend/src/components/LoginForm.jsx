import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage('Welcome back to Blog list app');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      setMessage('Error: Incorrect username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          className="input-normal"
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          className="input-normal"
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="btn-normal" type="submit" id="login-button">
        login
      </button>
    </form>
  );
};

export default LoginForm;
