module.exports = (BaseWebServer, MockEndpointRegistration)->

  new class MockWebServer extends BaseWebServer

    registerMiddleware:()->
      super
      @registerMockEndpoints()

    registerMockEndpoints:()->
      MockEndpointRegistration.register(@app)
