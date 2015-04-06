describe "SampleCode", ->

  beforeEach ()->
    injector().inject (@SampleCode)=>

  afterEach ()->

  it "should exist", ->
    expect(@SampleCode).to.exist

  it 'should return a valid text', ->
    subject = new @SampleCode()
    expect(subject.test()).to.equal("The test worked")
