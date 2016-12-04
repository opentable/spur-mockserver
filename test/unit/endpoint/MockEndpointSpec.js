describe "MockEndpoint", ->

  beforeEach ()->
    injector().inject (@MockEndpoint)=>

  afterEach ()->

  it "should exist", ->
    expect(@MockEndpoint).to.exist
