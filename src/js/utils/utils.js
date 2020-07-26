function isLoggedIn() {
  const props = localStorage.getItem('props');
  return props == null ? false: JSON.parse(localStorage.getItem('props')).isLoggedIn;
};

function getUserName() {
  const props = localStorage.getItem('props');
  return props == null ? false: JSON.parse(localStorage.getItem('props')).userName;
};

export {isLoggedIn, getUserName};