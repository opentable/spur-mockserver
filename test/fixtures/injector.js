const spur = require('spur-ioc');
const spurCommon = require('spur-common');
const spurWeb = require('spur-web');
const registerConfig = require('spur-common/registerConfig');
const localInjector = require('../../src/injector');
const path = require('path');

module.exports = function () {
  const ioc = spur.create('test-spur-mockserver');

  registerConfig(ioc, path.join(__dirname, './config'));

  ioc.merge(spurCommon());
  ioc.merge(spurWeb());
  ioc.merge(localInjector());

  ioc.registerFolders(__dirname, [
    'endpoints'
  ]);

  return ioc;
}
