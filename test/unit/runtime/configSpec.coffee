describe "config", ->

  beforeEach ()->
    injector().inject (@config)=>

  afterEach ()->

  it "should exist", ->
    expect(@config).to.exist

  it "should set the valid port", ->
    expect(@config.Port).to.equal 9780
