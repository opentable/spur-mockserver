describe "MockEndpointRegistration", ->

  beforeEach ()->
    injector().inject (@MockEndpointRegistration, @BaseWebServer, @UsersMockEndpoint, @Logger) =>
      @Logger.useRecorder()
      @server = new @BaseWebServer()

  it "should register UsersMockEndpoint", ->
    sinon.spy(@UsersMockEndpoint, "configure")
    @MockEndpointRegistration.register(@server.app, @server, true)
    expect(@UsersMockEndpoint.configure.called).to.equal(true)
