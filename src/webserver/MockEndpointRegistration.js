module.exports = function ($injector, _, Logger, MockEndpoint) {
  class MockEndpointRegistration {

    constructor() {
      this.controllers = $injector.getRegex(/MockEndpoint$/);
    }

    register(app, webServer, useDefaults) {
      function instanceOfMockEndpoint(c) {
        return c instanceof MockEndpoint;
      }

      const registeredCount = _.chain(this.controllers)
        .values()
        .filter(instanceOfMockEndpoint)
        .invokeMap('configure', app, webServer, useDefaults)
        .value().length;

      Logger.log(`Registered ${registeredCount} MockEndpoint(s)`);
    }
  }

  return new MockEndpointRegistration();
};
