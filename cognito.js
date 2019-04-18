const cognitoService = require('./services/cognito-service');

module.exports.createUser = async (event) => {
  const username = 'olo',
    email = 'olo@test.com',
    temporaryPassword = 'tempPassword1&',
    isAllowedToSetTheirPassword = true;

  try {
    await cognitoService.createUser({ username, email, temporaryPassword }, isAllowedToSetTheirPassword);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User successfully created!',
        id: 1
      }),
    };
  }
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        errorMessage: err.message
      })      
    }
  }
};