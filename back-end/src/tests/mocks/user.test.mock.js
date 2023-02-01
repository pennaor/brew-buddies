const validUser = {
  "dataValues": {
      "id": 1,
      "name": "Delivery App Admin",
      "email": "adm@deliveryapp.com",
      "role": "administrator"
  }
};

const userEmail = 'adm@deliveryapp.com';
const userPassword = '123456789';
const userName = 'Delivery App Admin';

const user = {
  "id": 1,
  "name": userName,
  "email": userEmail,
  "role": "administrator",
};

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc0NTgyNzYxLCJleHAiOjE2NzUxODc1NjF9.jojn3xl_Y8tEJjPKU2uwEpNCc1H1YlGPj_44ixQvn_A"

const userWithToken = {
  ...user,
  "token": userToken
};

const newUser = {
  name: "Hermione granger",
  email: "hermione@gmail.com",
  password: "123456789",
};

const invalidUser = {
  id: 1,
  name: "Hermione Hermione Hermione",
  email: "h@h",
  password: "123456789",
};

module.exports = { validUser, userToken, userWithToken, newUser, userEmail, userPassword, userName, invalidUser, user };