describe('config', function () {
  const base = this;

  beforeEach(() => {
    injector().inject(function (config) {
      base.config = config;
    });
  });

  it('should set the valid port', () => {
    expect(this.config.Port).to.equal(9780);
  });
});
