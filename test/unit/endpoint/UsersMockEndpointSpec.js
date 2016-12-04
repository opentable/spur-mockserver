describe('UsersMockEndpoint', function () {
  beforeEach(() => {
    injector().inject((UsersMockEndpoint, MockWebServer, config, HTTPService, Logger) => {
      this.UsersMockEndpoint = UsersMockEndpoint;
      this.MockWebServer = MockWebServer;
      this.config = config;
      this.HTTPService = HTTPService;
      this.Logger = Logger;

      this.Logger.useRecorder();
      this.server = new this.MockWebServer();
    });
  });

  describe('test data calls', () => {
    beforeEach(() => {
      this.server.start();
    });

    afterEach(() => {
      this.server.stop();
    });

    const expectedUser = function (item, id, firstName, lastName) {
      const testItem = { id, firstName, lastName };
      expect(item).to.deep.equal(testItem);
    };

    it('should resolve with default data', () => {
      this.UsersMockEndpoint.andCallMethod('default');
      return this.HTTPService
        .get(`http://localhost:${this.config.Port}/api/users/`)
        .promiseBody()
        .then((results) => {
          expect(results.users.length);
          expectedUser(results.users[0], 123, 'John', 'Doe');
          expectedUser(results.users[1], 124, 'Jane', 'Doe');
        });
    });


    it('should resolve with 3 results', () => {
      this.UsersMockEndpoint.andCallMethod('withThree');
      return this.HTTPService
        .get(`http://localhost:${this.config.Port}/api/users/`)
        .promiseBody()
        .then((results) => {
          expect(results.users.length);
          expectedUser(results.users[0], 123, 'John', 'Doe');
          expectedUser(results.users[1], 124, 'Jane', 'Doe');
          expectedUser(results.users[2], 125, 'Smith', 'Doe');
        });
    });
  });
});
