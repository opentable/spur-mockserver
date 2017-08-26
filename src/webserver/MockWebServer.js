const _map = require('lodash.map');

module.exports = function (BaseWebServer, MockEndpointRegistration, Logger, ControllerRegistration) {

  class MockWebServer extends BaseWebServer {
    constructor() {
      super();
      this.useDefaults = false;
    }

    registerMiddleware() {
      super.registerMiddleware();
      this.registerFixtureHandler();
      this.registerMockEndpoints();
      ControllerRegistration.register(this.app, this);
    }

    registerControllers() {
    }

    registerMockEndpoints() {
      Logger.log(`Attempting to register mock-endpoints - Use Defaults (${this.useDefaults})`);
      MockEndpointRegistration.register(this.app, this, this.useDefaults);
    }

    registerFixtureHandler() {
      Logger.log('Registering the fixtures handler middleware');

      this.app.post('/fixtures', this.handleFixtureRequest.bind(this));
      this.app.post('/v2/fixtures', this.handleFixtureRequestV2.bind(this));
      this.app.post('/v3/fixtures', this.handleFixtureRequestV3.bind(this));
    }

    handleFixtureRequest(req, res) {
      res.send(_map(req.body.fixtures, this.mapFixture.bind(this)));
    }

    handleFixtureRequestV2(req, res) {
      res.send(_map(req.body.fixtures, this.mapFixtureV2.bind(this)));
    }

    mapFixture(fixture) {
      this[`${fixture.endpoint}MockEndpoint`].andCallMethod(fixture.method);
      return fixture;
    }

    mapFixtureV2(fixture) {
      this[`${fixture.endpoint}`].andCallMethod(fixture.method);
      return fixture;
    }

    handleFixtureRequestV3(req, res) {
      res.send(_map(req.body.fixtures, this.mapFixtureV3.bind(this)));
    }

    mapFixtureV3(fixture) {
      if (fixture.json) {
        this[`${fixture.endpoint}`].andReturnJSON(fixture.json);
      } else {
        this[`${fixture.endpoint}`].andCallMethod(fixture.method);
      }

      return fixture;
    }

    setUseDefaults(useDefaults = false) {
      this.useDefaults = useDefaults;
    }

    startWithDefaults() {
      this.setUseDefaults(true);
      return this.start();
    }
  }

  return MockWebServer;
};
