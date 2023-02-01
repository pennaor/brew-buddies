const createSpiedResponse = (Sinon) => {
  const response = {
    status: () => response,
    json: () => response,
    end: () => response, 
  };
  Sinon.spy(response, 'status');
  Sinon.spy(response, 'json');
  Sinon.spy(response, 'end');
  return response;
};

const mockController = (Sinon) => ({
  emptyRequest: {
    user: {},
    body: {},
  },
  response: createSpiedResponse(Sinon),
  next: Sinon.spy(),
});

module.exports = mockController;
