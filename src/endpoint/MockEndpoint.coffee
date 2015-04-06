module.exports = () ->

  class MockEndpoint

    state: false

    @METHODS:{
      GET:"GET"
      PUT:"PUT"
      DELETE:"DELETE"
      POST:"POST"
    }

    configure: (app) ->
      method = @method().toLowerCase()
      app[method](@url(), @handler)
      @

    andCallMethod: (state) ->
      @state = {type:"fn", state}

    andReturnJSON: (json, httpStatus=200) ->
      @state = {type:"json", json, httpStatus}

    handler: (req, res) =>
      if @state.type is "fn"
        @[@state.state](req,res)
      else if @state.type is "json"
        res.status(@state.httpStatus).json(@state.json)
