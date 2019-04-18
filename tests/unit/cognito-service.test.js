const cognitoService = require('../../services/cognito-service');
const identityServiceProvider = require('../../services/identity-service-provider');

jest.mock('../../services/identity-service-provider');
jest.mock('../../services/config', () => ({ 
  userPoolId: 'testUserPoolId',
  AWS: {
    region: 'aws-region'
  } 
}));

describe('cognito service', () => {
  test('create a user', async () => {
    await cognitoService.createUser({ username: 'test', email: 'test@test.com', temporaryPassword: 'password' }, true);
    const expectedParams = {
      TemporaryPassword: 'password', 
      UserAttributes: [{ 'Name': 'email', 'Value': 'test@test.com' }, { 'Name': 'email_verified', 'Value': 'true' }], 
      UserPoolId: 'testUserPoolId', 
      Username: 'test@test.com'
    };
    expect(identityServiceProvider.adminCreateUser).toHaveBeenCalledWith(expectedParams);
  });
})
