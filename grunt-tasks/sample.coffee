path = require "path"

module.exports = (grunt, config)->

  copySample =
    files: [
      {
        expand: true
        src: "grunt-tasks/*.*"
        dest: "tmp/"
      }
    ]

  cleanSample = ["tmp/"]

  grunt.config "copy.sample", copySample
  grunt.config "clean.sample", cleanSample
