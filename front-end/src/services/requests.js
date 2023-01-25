import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export const requestRegister = async (body) => {
  const { data } = await api.post('/register', body);
  return data;
};

export const requestProducts = async () => {
  const { data } = await api.get('/customer/products');
  return data;
};

export default api;
