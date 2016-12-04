describe('MockEndpoint', function () {
  beforeEach(() => {
    injector().inject((MockEndpoint) => {
      this.MockEndpoint = MockEndpoint;
    });
  });

  it('should exist', () => {
    // eslint-disable-next-line
    expect(this.MockEndpoint).to.exist;
  });
});
