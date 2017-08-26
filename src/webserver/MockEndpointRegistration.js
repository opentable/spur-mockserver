const _values = require('lodash.values');
const _filter = require('lodash.filter');
const _invokeMap = require('lodash.invokemap');

module.exports = function ($injector, Logger, MockEndpoint) {
  const controllers = $injector.getRegex(/MockEndpoint$/);

  class MockEndpointRegistration {

    register(app, webServer, useDefaults) {
      function instanceOfMockEndpoint(c) {
        return c instanceof MockEndpoint;
      }

      const filteredValues = _filter(_values(controllers), instanceOfMockEndpoint);

      // Call the configuration against every controller
      _invokeMap(filteredValues, 'configure', app, webServer, useDefaults);

      const registeredCount = filteredValues.length;

      Logger.log(`Registered ${registeredCount} MockEndpoint(s)`);
    }
  }

  return new MockEndpointRegistration();
};
