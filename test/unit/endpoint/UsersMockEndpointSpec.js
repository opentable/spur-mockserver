describe "UsersMockEndpoint", ->

  beforeEach ()->
    injector().inject (@UsersMockEndpoint, @MockWebServer, @config, @HTTPService, @Logger)=>
      @Logger.useRecorder()
      @server = new @MockWebServer()


  describe "test data calls", ->

    beforeEach ->
      @server.start()

    afterEach ->
      @server.stop()

    expectedUser = (item, id, firstName, lastName)->
      testItem = {
        id: id
        firstName: firstName
        lastName: lastName
      }
      expect(item).to.deep.equal(testItem)

    it "should resolve with default data", ()->
      @UsersMockEndpoint.andCallMethod("default")
      @HTTPService
        .get("http://localhost:#{@config.Port}/api/users/")
        .promiseBody()
        .then (results)->

          expect(results.users.length)

          expectedUser(results.users[0], 123, "John", "Doe")
          expectedUser(results.users[1], 124, "Jane", "Doe")


    it "should resolve with 3 results", ()->
      @UsersMockEndpoint.andCallMethod("withThree")
      @HTTPService
        .get("http://localhost:#{@config.Port}/api/users/")
        .promiseBody()
        .then (results)->

          expect(results.users.length)

          expectedUser(results.users[0], 123, "John", "Doe")
          expectedUser(results.users[1], 124, "Jane", "Doe")
          expectedUser(results.users[2], 125, "Smith", "Doe")
