module.exports = (BaseWebServer, MockEndpointRegistration, Logger)->

  class MockWebServer extends BaseWebServer

    constructor:->
      super
      @useDefaults = false

    registerMiddleware:->
      super
      @registerMockEndpoints()
      @registerFixtureHandler()

    registerMockEndpoints:()->
      Logger.info "Attempting to register mock-endpoints - Use Defaults (#{@useDefaults})"
      MockEndpointRegistration.register(@app, @, @useDefaults)

    registerFixtureHandler:->
      Logger.info "Registering the fixtures handler middleware"

      @app.post "/fixtures", (req, res)=>
        _.map req.body.fixtures, (fixture)=> @["#{fixture.endpoint}MockEndpoint"].andCallMethod(fixture.method)

    setUseDefaults:(@useDefaults = false)->

    startWithDefaults:->
      @setUseDefaults(true)
      @start()
