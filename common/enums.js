const ResponseType = {
  ERROR: 0,
  SUCCESS_LIST: 1,
  SUCCESS_OBJ: 2,
  SUCCESS_EMPTY: 3,
  SESSION_EXPIRE: 4
};

const UserErrorType = {
  CUSTOM: 0,
  EXISTING_USER: 1
};

module.exports = { ResponseType, UserErrorType };
