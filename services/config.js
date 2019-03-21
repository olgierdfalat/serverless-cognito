module.exports = (() => {
  return {
    userPoolId: process.env.userPoolId,
    AWS: {
      region: process.env.AWS_REGION
    }
  }
})();