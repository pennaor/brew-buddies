import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// const test = {
//   user: {
//     id: 1,
//     name: 'Delivery App Admin',
//     email: 'adm@deliveryapp.com',
//     role: 'administrator',
//   },
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc0NTA5Mzg2LCJleHAiOjE2NzUxMTQxODZ9.oRUfSVNz9SeWThOVgNw2Xcd2dYU5XWBAu_GOSMdx-6Q',

// };

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export default api;
