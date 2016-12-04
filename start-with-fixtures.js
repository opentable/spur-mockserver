/* eslint-disable */
var injector = require('./test/fixtures/injector');

process.env.NODE_ENV = 'test';

injector().inject(function (MockWebServer, UncaughtHandler) {
  UncaughtHandler.listen();
  MockWebServer.startWithDefaults();
});
