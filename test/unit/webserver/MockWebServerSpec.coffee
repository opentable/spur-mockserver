describe "MockWebServer", ->

  beforeEach ()->
    injector().inject (@MockWebServer)=>

  afterEach ()->

  it "should exist", ->
    expect(@MockWebServer).to.exist
