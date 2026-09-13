const TOKEN_KEY = 'forum_token';

const getToken = () => localStorage.getItem(TOKEN_KEY);

const putToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export {
  getToken,
  putToken,
  removeToken,
};