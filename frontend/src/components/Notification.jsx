const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const lowerCaseMes = message.toLowerCase();
  if (lowerCaseMes.includes('error') || lowerCaseMes.includes('fail')) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
