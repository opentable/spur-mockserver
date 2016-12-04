describe "config", ->

  beforeEach ()->
    injector().inject (@config)=>

  afterEach ()->

  it "should set the valid port", ->
    expect(@config.Port).to.equal 9780
