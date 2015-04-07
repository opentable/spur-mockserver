spur       = require "spur-ioc"

module.exports = ()->

  ioc = spur.create("spur-mockserver")

  ioc.registerFolders __dirname, [
    "controllers"
    "endpoint"
    "webserver"
  ]

  ioc
