const logger = require('./logger');
const config = require('./config');
const _ = require('lodash');

module.exports = (awsCognitoIdentityServiceProvider) => {
    return {
      async createUser({username, email, temporaryPassword}, isAllowedToSetTheirPassword) {
        try {
          const params = {
            UserPoolId: config.userPoolId,
            Username: email,
            TemporaryPassword: temporaryPassword,
            UserAttributes: [
              {Name: 'email', Value: _.toLower(email)},
              {Name: 'email_verified', Value: 'true'}
            ]
          };

          if (isAllowedToSetTheirPassword === false) {
            params.MessageAction = 'SUPPRESS';
          }
          const newUser = await awsCognitoIdentityServiceProvider.adminCreateUser(params).promise();
          let confirmUserResult = {};
          if (newUser && (isAllowedToSetTheirPassword === false)) {
            confirmUserResult = await setStateToConfirm({username, password: temporaryPassword});
          }
          return {newUser, confirmUserResult};
        }
        catch (error) {
          const message = `Cannot create a new user: ${username}, email: ${email}. Error details: ${error.message}.`;
          logger.error(message, error);
          throw error;
        }
    }
  }
};