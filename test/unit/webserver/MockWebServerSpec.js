describe('MockWebServer', function () {
  const base = this;

  beforeEach(() => {
    injector().inject(function (MockWebServer) {
      base.MockWebServer = MockWebServer;
    });
  });

  it('should exist', () => {
    expect(this.MockWebServer).to.exist;
  });
});
