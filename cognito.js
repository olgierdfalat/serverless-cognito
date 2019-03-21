const bootstrap = require('./services/bootstrap');
const cognitoService = bootstrap.createCognitoService();

module.exports.createUser = async (event) => {
  const username = 'olo', 
        email = 'olo@test.com', 
        temporaryPassword = 'tempPassword1&',  
  isAllowedToSetTheirPassword = true;
  await cognitoService.createUser({username, email, temporaryPassword}, isAllowedToSetTheirPassword);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'User successfully created!',
      id: 1
    }),
  };
};