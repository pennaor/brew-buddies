import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export default api;
