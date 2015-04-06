spur           = require "spur-ioc"
registerConfig = require "spur-common/registerConfig"
localInjector  = require "../../src/injector"
path           = require "path"

module.exports = ()->

  ioc = spur.create("test-spur-mockserver")

  registerConfig(ioc, path.join(__dirname, "./config"))

  ioc.merge(localInjector())

  ioc.registerFolders __dirname, [
    "endpoints"
  ]

  ioc
