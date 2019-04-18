const AWS = require('aws-sdk');
const Promise = require('bluebird');
const config = require('./config');


module.exports = (() => {
  AWS.config.update({region: config.AWS.region});
  AWS.config.setPromisesDependency(Promise);

  AWS.events.on('httpError', function () {
    if (this.response.error && this.response.error.code === 'UnknownEndpoint') {
      this.response.error.retryable = true;
    }
  });

  const awsCognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  return {
    adminCreateUser(params) {
      console.log(params);
      return awsCognitoIdentityServiceProvider.adminCreateUser(params).promise();
    }
  }
})();