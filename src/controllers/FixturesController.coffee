module.exports = (BaseController, Logger)->

  new class FixturesController extends BaseController

    configure:(app)->
      app.post "/fixtures", @postFixtures

    postFixtures:(req, res)=>
      for fixture in req.body.fixtures
        Logger.info fixture.endpoint
        @["#{fixture.endpoint}MockEndpoint"].andCallMethod(fixture.method)
