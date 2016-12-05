describe('MockWebServer', function () {
  beforeEach(() => {
    injector().inject((MockWebServer) => {
      this.MockWebServer = MockWebServer;
    });
  });

  it('should exist', () => {
    expect(this.MockWebServer).to.exist;
  });
});
