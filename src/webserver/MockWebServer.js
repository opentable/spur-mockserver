module.exports = function (BaseWebServer, MockEndpointRegistration, Logger, ControllerRegistration, _) {
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

    // eslint-disable-next-line
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
    }

    handleFixtureRequest(req, res) {
      res.send(_.map(req.body.fixtures, this.mapFixture.bind(this)));
    }

    handleFixtureRequestV2(req, res) {
      res.send(_.map(req.body.fixtures, this.mapFixtureV2.bind(this)));
    }

    mapFixture(fixture) {
      this[`${fixture.endpoint}MockEndpoint`].andCallMethod(fixture.method);
      return fixture;
    }

    mapFixtureV2(fixture) {
      this[`${fixture.endpoint}`].andCallMethod(fixture.method);
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
