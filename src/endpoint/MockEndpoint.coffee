module.exports = (Logger) ->

  class MockEndpoint

    state: false

    @METHODS:{
      GET:"GET"
      PUT:"PUT"
      DELETE:"DELETE"
      POST:"POST"
    }

    configure: (app, webServer, useDefaults) ->
      method = @method().toLowerCase()
      app[method](@url(), @handler)
      @registerOnServer(webServer, useDefaults)
      @

    registerOnServer:(webServer, useDefaults)->
      name = @.constructor.name
      webServer[name] = @
      defaultsMessage = ""

      if useDefaults == true
        @andCallMethod("default")
        defaultsMessage = "with defaults"

      Logger.log "Registered '#{name}' mock-endpoint #{defaultsMessage}"

    andCallMethod: (state) ->
      @state = {type:"fn", state}

    andReturnJSON: (json, httpStatus=200) ->
      @state = {type:"json", json, httpStatus}

    handler: (req, res) =>
      if @state.type is "fn"
        @[@state.state](req,res)
      else if @state.type is "json"
        res.status(@state.httpStatus).json(@state.json)
