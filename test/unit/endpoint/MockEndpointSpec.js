describe('MockEndpoint', function () {
  const base = this;

  beforeEach(() => {
    injector().inject(function (MockEndpoint) {
      base.MockEndpoint = MockEndpoint;
    });
  });

  it('should exist', () => {
    expect(this.MockEndpoint).to.exist;
  });
});
