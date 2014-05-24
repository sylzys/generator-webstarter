'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var Test2Generator = yeoman.generators.Base.extend({
  askForForlderName: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Test2 generator!'));

    var prompts = [{
      name: 'appName',
      message: 'Hello! What is your folder\'s name ?'
    },
    {
      name: 'needFrontFramework',
      type: 'confirm',
      message: 'Would you like to use a Front-end Framework?',
      default: true
    }, {
      when: function (response) {
        return response.needFrontFramework;
      },
      name: 'frontFramework',
      type: 'list',
      message: 'Which one do you need ?',
      choices: [{
        name: 'Bootstrap',
        value: 'boostrap',
        checked: true
      }, {
        name: 'Foundation',
        value: 'doundation',
        checked: false
      }]
    },
    {
      name: 'needJQuery',
      type: 'confirm',
      message: 'Do you need jQuery ?',
      default: false
    },
    {
      name: 'needTaskRunner',
      type: 'confirm',
      message: 'Would you like to use a task runner ?',
      default: true
    }, {
      when: function (response) {
        return response.needTaskRunner;
      },
      name: 'taskRunner',
      type: 'list',
      message: 'Which one do you need ?',
      choices: [{
        name: 'Gulp',
        value: 'gulp',
        checked: true
      }, {
        name: 'Bower',
        value: 'bower',
        checked: false
      },
      {
        name: 'Grunt',
        value: 'grunt',
        checked: false
      }]
    },
    ];

    this.prompt(prompts, function (props) {
      // this.someOption = props.someOption;
      // this.appName = props.appName;
      // this.needFrontFramework = props.needFrontFramework;
      // this.frontFramework = props.frontFramework;
      for(var k in props) this[k]=props[k];
        console.log("name", props);
      done();
    }.bind(this));
  },
  enforceFolderName: function () {
    if (this.appName !== this._.last(this.destinationRoot().split(path.sep))) {
      this.destinationRoot(this.appName);
    }
  },
  app: function () {
    this.mkdir('dist');
    this.mkdir('dist/css');
    this.mkdir('dist/js');
    this.mkdir('src');
    this.mkdir('src/js');
    this.mkdir('src/sass');
    this.copy('_package.json', 'package.json');
    // this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = Test2Generator;
