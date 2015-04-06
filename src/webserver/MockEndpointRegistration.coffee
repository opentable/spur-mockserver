module.exports = ($injector, _, Logger, MockEndpoint)->

  controllers = $injector.getRegex(/MockEndpoint$/)

  new class MockEndpointRegistration

    register:(app)->

      instanceOfMockEndpoint = (c)->
        c instanceof MockEndpoint

      registeredCount = _.chain(controllers)
        .values()
        .filter(instanceOfMockEndpoint)
        .invoke("configure", app)
        .value().length

      Logger.info "Registered #{registeredCount} MockEndpoint(s)"
