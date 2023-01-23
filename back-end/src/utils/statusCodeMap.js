const statusCodeMap = {
  BAD_REQUEST: 400,
  INVALID_ID: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  ENTITY_CONFLICT: 409,
  INVALID_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const errorMap = (type) => statusCodeMap[type] || 500;

module.exports = {
  statusCodeMap,
  errorMap,
};
