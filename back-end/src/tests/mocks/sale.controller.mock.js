const validRequest = {
  params: {
    id: 1,
  },
  body: {
    status: 'Pendente',
  },
};

const invalidRequest = {
  params: {
    id: 9999,
  },
  body: {
    status: 'invalidStatus',
  },
};

module.exports = { validRequest, invalidRequest };
