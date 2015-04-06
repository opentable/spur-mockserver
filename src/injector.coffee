spur       = require "spur-ioc"

module.exports = ()->

  ioc = spur.create("spur-mockserver")

  ioc.registerFolders __dirname, [
    "endpoint"
    "webserver"
  ]

  ioc
