spur       = require "spur-ioc"
spurCommon = require "spur-common"
spurWeb    = require "spur-web"

module.exports = ()->

  ioc = spur.create("spur-mockserver")

  ioc.merge(spurCommon())
  ioc.merge(spurWeb())

  ioc.registerFolders __dirname, [
    "endpoint"
    "webserver"
  ]

  ioc
