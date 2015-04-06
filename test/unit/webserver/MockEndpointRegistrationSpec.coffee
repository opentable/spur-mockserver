describe "MockEndpointRegistration", ->

  beforeEach (done)->
    injector().inject (@MockEndpointRegistration, @BaseWebServer, @UsersMockEndpoint)=>
      @server = new @BaseWebServer()
      done()

  afterEach ()->

  it "should exist", ->
    expect(@MockEndpointRegistration).to.exist

  it "should register UsersMockEndpoint", ->
    sinon.spy(@UsersMockEndpoint, "configure")
    @MockEndpointRegistration.register(@server.app, @server, true)
    expect(@UsersMockEndpoint.configure.called).to.equal(true)
