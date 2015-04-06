module.exports = (MockEndpoint)->

  new class UsersMockEndpoint extends MockEndpoint

    method: -> MockEndpoint.METHODS.GET
    url: -> "/api/users/"

    default: (req, res) ->
      res.json {
        users: [
          {
            id: 123
            firstName: "John"
            lastName: "Doe"
          }
          {
            id: 124
            firstName: "Jane"
            lastName: "Doe"
          }
        ]
      }

    withThree: (req, res) ->
      res.json {
        users: [
          {
            id: 123
            firstName: "John"
            lastName: "Doe"
          }
          {
            id: 124
            firstName: "Jane"
            lastName: "Doe"
          }
          {
            id: 125
            firstName: "Smith"
            lastName: "Doe"
          }
        ]
      }
