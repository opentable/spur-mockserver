const spur = require('spur-ioc');

module.exports = function () {
  const ioc = spur.create('spur-mockserver');

  ioc.registerFolders(__dirname, [
    'endpoint/',
    'webserver/'
  ]);

  return ioc;
};
