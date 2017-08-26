module.exports = function (Logger) {
  class MockEndpoint {

    static get state() {
      return false;
    }

    static get METHODS() {
      return {
        GET: 'GET',
        PUT: 'PUT',
        DELETE: 'DELETE',
        POST: 'POST',
        PATCH: 'PATCH'
      };
    }

    configure(app, webServer, useDefaults) {
      const method = this.method().toLowerCase();
      app[method](this.url(), this.handler.bind(this));
      this.registerOnServer(webServer, useDefaults);
      return this;
    }

    registerOnServer(webServer, useDefaults) {
      const name = this.constructor.name;
      let defaultsMessage = '';
      webServer[name] = this;

      if (useDefaults === true) {
        this.andCallMethod('default');
        defaultsMessage = 'with defaults';
      }

      Logger.log(`Registered '#{name}' mock-endpoint ${defaultsMessage}`);
    }

    andCallMethod(state) {
      this.state = { type: 'fn', state };
    }

    andReturnJSON(json, httpStatus = 200) {
      this.state = { type: 'json', json, httpStatus };
    }

    handler(req, res) {
      if (this.state.type === 'fn') {
        this[this.state.state](req, res);
      } else if (this.state.type === 'json') {
        res.status(this.state.httpStatus).json(this.state.json);
      }
    }
  }

  return MockEndpoint;
};
