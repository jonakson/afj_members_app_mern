function buildResponse(type, message, comments) {
  return {
    error: {
      type: type,
      message: message,
      comments: comments,
    },
  };
}

function buildResponse(type, message) {
  return {
    error: {
      type: type,
      message: message,
    },
  };
}

module.exports = {
  buildResponse,
};
