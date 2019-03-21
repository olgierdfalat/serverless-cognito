module.exports = (() => {
 return {
   debug(message, ...args) {
    console.log(message, args);
   },
   info(message, ...args) {
    console.info(message, args);
   },
   warn(message, ...args) {
     console.warn(message, ...args);
   },
   error(message, args) {
     console.error(message, args);
   }
  }
})();