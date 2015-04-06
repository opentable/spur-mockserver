spur           = require "spur-ioc"
spurCommon     = require "spur-common"
spurWeb        = require "spur-web"
registerConfig = require "spur-common/registerConfig"
localInjector  = require "../../src/injector"
path           = require "path"

module.exports = ()->

  ioc = spur.create("test-spur-mockserver")

  registerConfig(ioc, path.join(__dirname, "./config"))

  ioc.merge(spurCommon())
  ioc.merge(spurWeb())
  ioc.merge(localInjector())

  ioc.registerFolders __dirname, [
    "endpoints"
  ]

  ioc
