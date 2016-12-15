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

  describe "test V3 client-customized data calls", ->

    beforeEach ->
      @server.start()

    afterEach ->
      @server.stop()

    generateUser = (id, firstName, lastName)->
      {
        id: id
        firstName: firstName
        lastName: lastName
      }

    expectedUser = (item, id, firstName, lastName)->
      testItem = generateUser(id, firstName, lastName)
      expect(item).to.deep.equal(testItem)

    it "should resolve with 3 results", ()->
      @HTTPService
        .post("http://localhost:#{@config.Port}/v3/fixtures/")
        # .type('json')
        .send({
          fixtures: [{
            endpoint: "UsersMockEndpoint"
            method: "withThree"
          }]
        })
        .promiseBody()
        .then =>
          @HTTPService
            .get("http://localhost:#{@config.Port}/api/users/")
            .promiseBody()
            .then (results)->

              expect(results.users.length)

              expectedUser(results.users[0], 123, "John", "Doe")
              expectedUser(results.users[1], 124, "Jane", "Doe")
              expectedUser(results.users[2], 125, "Smith", "Doe")

    it "should resolve with 2 results", ()->
      @HTTPService
        .post("http://localhost:#{@config.Port}/v3/fixtures/")
        .send({
          fixtures: [{
            endpoint: "UsersMockEndpoint"
            json: {
              users: [
                generateUser(789, "Testin", "Testerfield"),
                generateUser(910, "Testelle", "McTesting")
              ]
            }
          }]
        })
        .promiseBody()
        .then =>
          @HTTPService
            .get("http://localhost:#{@config.Port}/api/users/")
            .promiseBody()
            .then (results)->

              expect(results.users.length)

              expectedUser(results.users[0], 789, "Testin", "Testerfield")
              expectedUser(results.users[1], 910, "Testelle", "McTesting")
