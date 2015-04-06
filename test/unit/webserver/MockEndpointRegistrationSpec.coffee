describe "MockEndpointRegistration", ->

  beforeEach ()->
    injector().inject (@MockEndpointRegistration)=>

  afterEach ()->

  it "should exist", ->
    expect(@MockEndpointRegistration).to.exist
