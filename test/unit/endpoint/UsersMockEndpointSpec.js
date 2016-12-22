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

  describe('test V3 client-customized data calls', () => {
    beforeEach(() => {
      return this.server.start();
    });

    afterEach(() => {
      this.server.stop();
    });

    const generateUser = function (id, firstName, lastName) {
      return { id, firstName, lastName };
    };

    const expectedUser = function (item, id, firstName, lastName) {
      const testItem = generateUser(id, firstName, lastName);
      expect(item).to.deep.equal(testItem);
    };

    it('should resolve with 3 results', (done) => {
      this.HTTPService
        .post(`http://localhost:${this.config.Port}/v3/fixtures/`)
        .send({
          fixtures: [{
            endpoint: 'UsersMockEndpoint',
            method: 'withThree'
          }]
        })
        .promiseBody()
        .then(() => {
          this.HTTPService
            .get(`http://localhost:${this.config.Port}/api/users/`)
            .promiseBody()
            .then((results) => {
              expect(results.users.length);
              expectedUser(results.users[0], 123, 'John', 'Doe');
              expectedUser(results.users[1], 124, 'Jane', 'Doe');
              expectedUser(results.users[2], 125, 'Smith', 'Doe');
              done();
            });
        });
    });

    it('should resolve with 2 results', (done) => {
      this.HTTPService
        .post(`http://localhost:${this.config.Port}/v3/fixtures/`)
        .send({
          fixtures: [{
            endpoint: 'UsersMockEndpoint',
            json: {
              users: [
                generateUser(789, 'Testin', 'Testerfield'),
                generateUser(910, 'Testelle', 'McTesting')
              ]
            }
          }]
        })
        .promiseBody()
        .then(() => {
          this.HTTPService
            .get(`http://localhost:${this.config.Port}/api/users/`)
            .promiseBody()
            .then((results) => {
              expect(results.users.length);
              expectedUser(results.users[0], 789, 'Testin', 'Testerfield');
              expectedUser(results.users[1], 910, 'Testelle', 'McTesting');
              done();
            });
        });
    });
  });
});
