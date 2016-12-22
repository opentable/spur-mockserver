/* eslint-disable prefer-arrow-callback */
const injector = require('./test/fixtures/injector');

process.env.NODE_ENV = 'test';

injector().inject(function (MockWebServer, UncaughtHandler) {
  UncaughtHandler.listen();

  const server = new MockWebServer();

  server.startWithDefaults();
});
