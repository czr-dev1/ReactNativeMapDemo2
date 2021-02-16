// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: 'CREATE_MESSAGE',
    payload: msg
  };
};

// RETURN ERRORS
export const retrunErrors = (msg, status) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status }
  };
};
