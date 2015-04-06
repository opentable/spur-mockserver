spur       = require "spur-ioc"
spurCommon = require "spur-common"
path       = require "path"

module.exports = ()->

  ioc = spur.create("sample")

  ioc.registerFolders __dirname, [
    "sample"
  ]

  ioc
