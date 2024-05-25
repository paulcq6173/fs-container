import blogService from '../services/blogs';

const LogOutButton = ({ setUser }) => {
  const handleLogOutClick = (event) => {
    event.preventDefault();
    const localStorage = window.localStorage;
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      localStorage.removeItem('loggedUser');
      setUser(null);
      blogService.setToken(null);
    }
  };

  return (
    <button className="btn-normal" onClick={handleLogOutClick}>
      log out
    </button>
  );
};

export default LogOutButton;
