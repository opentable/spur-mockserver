import spur from 'spur-ioc';
import spurCommon from 'spur-common';
import spurWeb from 'spur-web';
import registerConfig from 'spur-common/registerConfig';
import localInjector from '../../src/injector';
import path from 'path';

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
