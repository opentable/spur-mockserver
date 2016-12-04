describe('config', function () {
  beforeEach(() => {
    injector().inject((config) => {
      this.config = config;
    });
  });

  it('should set the valid port', () => {
    expect(this.config.Port).to.equal(9780);
  });
});
