injector = require "./test/fixtures/injector"

process.env.NODE_ENV = "test"

injector().inject (MockWebServer, UncaughtHandler)->

  UncaughtHandler.listen()
  MockWebServer.startWithDefaults()
