<img src="https://opentable.github.io/spur/logos/Spur-MockServer.png?rand=1" width="100%" alt="Spur: Mock Server" />

A [Node.js](http://nodejs.org/) library with tools to allow for the creation of mock web servers for testing with mocks and real web servers.

[![NPM version](https://badge.fury.io/js/spur-mockserver.png)](http://badge.fury.io/js/spur-mockserver)
[![Build Status](https://travis-ci.org/opentable/spur-mockserver.png?branch=master)](https://travis-ci.org/opentable/spur-mockserver)

# About the Spur Framework

The Spur Framework is a collection of commonly used Node.JS libraries used to create common application types with shared libraries.

[Visit NPMJS.org for a full list of Spur Framework libraries](https://www.npmjs.com/browse/keyword/spur-framework) >>

# Topics

- [Quick start](#quick-start)
    - [Usage](#usage)
      - [Standalone usage example](#standalone-usage-example)
      - [Mixed web app usage example](#mixed-web-app-usage-example)
      - [Controlling fixtures from a browser client](#controlling-fixtures-from-a-browser-client)
- [Contributing](#contributing)
- [License](#license)


# Quick start

## Installing

`Dependencies:`
```bash
$ npm install --save coffee-script
$ npm install --save spur-ioc spur-config spur-common spur-web
```

`Module:`
```bash
$ npm install spur-mockserver --save
```

## Usage

### Standalone usage example

This example will only show the files that show unique configurations to a mock server. For a fully detailed example, [please view the example here](https://github.com/opentable/spur-examples/tree/master/spur-mockserver).

#### `src/injector.coffee`

```coffeescript
path           = require "path"
spur           = require "spur-ioc"
spurCommon     = require "spur-common"
spurWeb        = require "spur-web"
spurMockserver = require "spur-mockserver"
spurConfig     = require "spur-config"
registerConfig = require "spur-common/registerConfig"

module.exports = ()->

  ioc = spur.create("spur-mockserver-example")

  registerConfig(ioc, path.join(__dirname, "./config"))

  ioc.merge(spurCommon())
  ioc.merge(spurWeb())
  ioc.merge(spurMockserver())

  ioc.registerFolders __dirname, [
    "mocks"
    "runtime"
  ]

  ioc
```

#### `src/runtime/WebServer.coffee`

```coffeescript
module.exports = (MockWebServer)->

  new class WebServer extends MockWebServer
```

#### `src/mocks/UserMockEndpoint.coffee`

By creating files with the ending name of `*MockEndPoint.coffee`, it will self register as a mock controller. You can have multiple MockEndpoint files, as long as they don't share the same endpoint urls.

You can also have multiple request handlers in the same MockEndpoint and change which loads dynamically.

```coffeescript
module.exports = (MockEndpoint) ->

  new class UserMockEndpoint extends MockEndpoint

    method: -> MockEndpoint.METHODS.GET
    url: -> "/user/:id"

    default:(req, res, next) ->
      userId = parseInt(req.params.id)
      user = {
        id: userId
        name: "User Name"
        statusCode: 200
      }

      res.status(user.statusCode).json(user)
```

#### `start.coffee`

```coffeescript
injector = require("./src/injector")

injector().inject (WebServer) ->

  # Starts the web server by loading all the default methods in the MockEndPoints
  WebServer.startWithDefaults()
```

### Mixed web app usage example

While you can have a standalone mock server, sometimes it's needed to use mock endpoints in an actual application. This scenario could be due to the need to be able to work on parts of the REST API that are defined and mock out parts that are not completely defined.

The following examples show how you mix them by adding a few calls to your web server app based on [BaseWebServer](https://github.com/opentable/spur-web/blob/master/src/webserver/BaseWebServer.coffee) defined in [Spur-Web](https://www.npmjs.com/package/spur-web). For it's full configuration, take a look at the documentation in Spur-Web, but the following are a highlight of the dependency configuration needed to make it work.

#### `src/injector.coffee`

```coffeescript
path           = require "path"
spur           = require "spur-ioc"
spurCommon     = require "spur-common"
spurWeb        = require "spur-web"
spurMockserver = require "spur-mockserver"
spurConfig     = require "spur-config"
registerConfig = require "spur-common/registerConfig"

module.exports = ()->

  ioc = spur.create("spur-mockserver-example")

  # ... other dependencies

  ioc.merge(spurMockserver())

  ioc.registerFolders __dirname, [
    "mocks"
    "runtime"
  ]

  ioc
```

#### `src/runtime/WebServer.coffee`

```coffeescript
module.exports = (BaseWebServer, config)->

  new class MockWebServer extends BaseWebServer

    constructor:->
      super
      @useDefaults = config.useMockDefaults

    registerMiddleware:->
      super
      @registerMockEndpoints()

    registerMockEndpoints:->
      Logger.log "Attempting to register mock-endpoints - Use Defaults (#{@useDefaults})"
      MockEndpointRegistration.register(@app, @, @useDefaults)

    setUseDefaults:(@useDefaults = false)->

    startWithDefaults:->
      @setUseDefaults(true)
      @start()
```

### Controlling fixtures from a browser client

The `/v3/fixtures` middleware handler enables the customization of fixtures returned by mock endpoints from web browser clients, e.g. with `XMLHttpRequest` or `fetch`, addressing use cases of web UI developers and manual QA.

#### Method

```javascript
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost/v3/fixtures");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({
  fixtures: [{
    endpoint: "MyMockEndpoint",
    method: "myMethod"
  }]
}));
```

If the mock server is running on `localhost` and the mock endpoint `MyMockEndpoint` is registered and has a method `myMethod`, the `POST` request succeeds and successive requests that are handled by `MyMockEndpoint` will run `myMethod` to generate its response.

#### JSON

```javascript
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost/v3/fixtures");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({
  fixtures: [{
    endpoint: "MyMockEndpoint",
    json: {"example":[1, 2, 3]}
  }]
}));
```

If the mock server is running on `localhost` and the mock endpoint `MyMockEndpoint` is registered, the `POST` request succeeds and successive requests that are handled by `MyMockEndpoint` will respond with an HTTP status of `200` and the JSON  `{"example":[1, 2, 3]}`.

# Contributing

## We accept pull requests

Please send in pull requests and they will be reviewed in a timely manner. Please review this [generic guide to submitting a good pull requests](https://github.com/blog/1943-how-to-write-the-perfect-pull-request). The only things we ask in addition are the following:

 * Please submit small pull requests
 * Provide a good description of the changes
 * Code changes must include tests
 * Be nice to each other in comments. :innocent:

## Style guide

The majority of the settings are controlled using an [EditorConfig](.editorconfig) configuration file. To use it [please download a plugin](http://editorconfig.org/#download) for your editor of choice.

## All tests should pass

To run the test suite, first install the dependancies, then run `npm test`

```bash
$ npm install
$ npm test
```

# License

[MIT](LICENSE)
