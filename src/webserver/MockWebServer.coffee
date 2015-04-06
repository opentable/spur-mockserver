module.exports = (BaseWebServer, MockEndpointRegistration, Logger)->

  class MockWebServer extends BaseWebServer

    constructor:->
      super
      @useDefaults = false

    registerMiddleware:->
      super
      @registerMockEndpoints()

    registerMockEndpoints:()->
      Logger.info "Attempting to register mock-endpoints - Use Defaults (#{@useDefaults})"
      MockEndpointRegistration.register(@app, @, @useDefaults)

    setUseDefaults:(@useDefaults = false)->

    startWithDefaults:->
      @setUseDefaults(true)
      @start()

