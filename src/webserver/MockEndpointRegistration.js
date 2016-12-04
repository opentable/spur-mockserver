module.exports = ($injector, _, Logger, MockEndpoint)->

  controllers = $injector.getRegex(/MockEndpoint$/)

  new class MockEndpointRegistration

    register:(app, webServer, useDefaults)->

      instanceOfMockEndpoint = (c)->
        c instanceof MockEndpoint

      registeredCount = _.chain(controllers)
        .values()
        .filter(instanceOfMockEndpoint)
        .invoke("configure", app, webServer, useDefaults)
        .value().length

      Logger.log "Registered #{registeredCount} MockEndpoint(s)"
