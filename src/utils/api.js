const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message);
  }

  return responseJson;
};

export default api;