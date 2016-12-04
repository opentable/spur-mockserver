describe('MockEndpointRegistration', function () {
  beforeEach(() => {
    injector().inject((MockEndpointRegistration, BaseWebServer, UsersMockEndpoint, Logger) => {
      this.MockEndpointRegistration = MockEndpointRegistration;
      this.BaseWebServer = BaseWebServer;
      this.UsersMockEndpoint = UsersMockEndpoint;
      this.Logger = Logger;

      this.Logger.useRecorder();
      this.server = new this.BaseWebServer();
    });
  });

  it('should register UsersMockEndpoint', () => {
    sinon.spy(this.UsersMockEndpoint, 'configure');
    this.MockEndpointRegistration.register(this.server.app, this.server, true);
    expect(this.UsersMockEndpoint.configure.called).to.equal(true);
  });
});
