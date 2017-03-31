export const checkAuth = (nextState, replace) => {
  const user = localStorage.getItem('login');
  if (!user) {
    replace('/login');
  }
};