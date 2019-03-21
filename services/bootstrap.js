const AWS = require('aws-sdk');
const Promise = require('bluebird');
const CognitoService = require('./cognito-service');
const config = require('./config');

module.exports = (() => {
  AWS.config.update({region: config.AWS.region});
  AWS.config.setPromisesDependency(Promise);

  AWS.events.on('httpError', function () {
    if (this.response.error && this.response.error.code === 'UnknownEndpoint') {
      this.response.error.retryable = true;
    }
  });

  return {
    createAwsCognitoIdentityServiceProvider() {
      return new AWS.CognitoIdentityServiceProvider();
    },

    createCognitoService() {
      return CognitoService(this.createAwsCognitoIdentityServiceProvider());
    }
  }
})();