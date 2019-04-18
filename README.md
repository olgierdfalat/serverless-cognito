# serverless-cognito
Serverless Framework and AWS Cognito example

[Based on]:(https://serverless-stack.com/chapters/configure-cognito-user-pool-in-serverless.html)

#### Prerequisites

* Install node 8.10.0

  ```
  nvm install 8.10.0
  nvm use
  ```

* Install the serverless cli

  `npm install -g serverless`

* [Configure the AWS CLI](https://serverless-stack.com/chapters/configure-the-aws-cli.html)

* Modify **stage**, **region** and **profile** settings in **serverless.yml** file. 

#### Deploy to AWS

    serverless deploy

or 

    sls deploy

After first deployment create **env.yml** file at the project root level and copy the following settings:

```
# Add the environment variables for the various stages

prod:

default:
  userPoolClientId: "****************"
  userPoolId: "****************"
```

**and re-deploy service with new settings again!**

**Note:** The **userPoolClientId** and **userPoolId** settings are available in AWS Cognito Console.

#### Endpoints

Deploy first and check the output console. It should display service information at the end e.g.:

```
Service Information
service: serverless-cognito
stage: dev
region: eu-central-1
stack: serverless-cognito-dev
resources: 19
api keys:
  None
endpoints:
  POST - https://******.execute-api.eu-central-1.amazonaws.com/dev/cognito/createUser
functions:
  createUser: serverless-cognito-dev-createUser
```

**Invoke locally**:

`serverless invoke local --function createUser`

or

`sls invoke local --function createUser`
