import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

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

export const requestAllSellers = async () => {
  const { data } = await api.get('/sellers');
  return data;
};

export const requestCreateSeller = async (body) => {
  const { data } = await api.post('/sellers', body);
  return data;
};

export default api;
