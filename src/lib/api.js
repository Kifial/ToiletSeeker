import fetch from 'unfetch';

const api = (url, options = {}) => {
  const login = localStorage.getItem('login'),
    headers = options.headers || {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${login}`
      },
    fetchOptions = {
      headers
    };
  if (options.method) {
    fetchOptions.method = options.method;
  }
  if (options.body) {
    fetchOptions.body = options.body;
  }
  return fetch(url, fetchOptions);
};

export default api;