path = require 'path'

module.exports = (grunt)->

  config = require("./grunt-tasks/_config")(grunt)

  grunt.file.expand('grunt-tasks/*.coffee').forEach (file) ->
    require("./" + file)(grunt, config)

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask 'sample', ["copy:sample", "clean:sample"]
