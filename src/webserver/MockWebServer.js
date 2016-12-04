module.exports = (BaseWebServer, MockEndpointRegistration, Logger, ControllerRegistration, _)->

  class MockWebServer extends BaseWebServer

    constructor:->
      super
      @useDefaults = false

    registerMiddleware:->
      super
      @registerFixtureHandler()
      @registerMockEndpoints()
      ControllerRegistration.register(@app, @)

    registerControllers:->

    registerMockEndpoints:->
      Logger.log "Attempting to register mock-endpoints - Use Defaults (#{@useDefaults})"
      MockEndpointRegistration.register(@app, @, @useDefaults)

    registerFixtureHandler:->
      Logger.log "Registering the fixtures handler middleware"

      @app.post "/fixtures", @handleFixtureRequest
      @app.post "/v2/fixtures", @handleFixtureRequestV2

    handleFixtureRequest:(req, res)=>
      res.send _.map req.body.fixtures, @mapFixture

    mapFixture:(fixture)=>
      @["#{fixture.endpoint}MockEndpoint"].andCallMethod(fixture.method)
      fixture

    handleFixtureRequestV2:(req, res)=>
      res.send _.map req.body.fixtures, @mapFixtureV2

    mapFixtureV2:(fixture)=>
      @["#{fixture.endpoint}"].andCallMethod(fixture.method)
      fixture

    setUseDefaults:(@useDefaults = false)->

    startWithDefaults:->
      @setUseDefaults(true)
      @start()
