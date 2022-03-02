function invalidCredentials(message) {
  return {
    error: {
      type: "invalid_credentials",
      message: message,
      res_code: 401,
    },
  };
}

function invalidData(message) {
  return {
    error: {
      type: "invalid_data",
      message: message,
      res_code: 400,
    },
  };
}

function resourceAlreadyExists(message) {
  return {
    error: {
      type: "resource_already_exists",
      message: message,
      res_code: 400,
    },
  };
}

function missingParameters(message) {
  return {
    error: {
      type: "missing_parameters",
      message: message,
      res_code: 400,
    },
  };
}

function resourceNotFound(message) {
  return {
    error: {
      type: "resource_not_found",
      message: message,
      res_code: 404,
    },
  };
}

module.exports = {
  invalidCredentials,
  invalidData,
  resourceAlreadyExists,
  resourceNotFound,
  missingParameters,
};
