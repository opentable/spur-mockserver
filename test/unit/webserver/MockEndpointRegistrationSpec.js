describe('MockEndpointRegistration', function () {
  const base = this;

  beforeEach(() => {
    injector().inject(function (MockEndpointRegistration, BaseWebServer, UsersMockEndpoint, Logger) {
      base.MockEndpointRegistration = MockEndpointRegistration;
      base.BaseWebServer = BaseWebServer;
      base.UsersMockEndpoint = UsersMockEndpoint;
      base.Logger = Logger;

      base.Logger.useRecorder();
      base.server = new base.BaseWebServer();
    });
  });

  it('should register UsersMockEndpoint', () => {
    sinon.spy(this.UsersMockEndpoint, 'configure');
    this.MockEndpointRegistration.register(this.server.app, this.server, true);
    expect(this.UsersMockEndpoint.configure.called).to.equal(true);
  });
});
