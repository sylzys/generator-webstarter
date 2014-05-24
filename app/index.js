'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var Test2Generator = yeoman.generators.Base.extend({
  askForForlderName: function () {
    var done = this.async();

    // this.log(yosay('Welcome to the marvelous Test2 generator!'));
    this.log("   _____ ______ ___     ____  ______   __");
    this.log("  / ___//_  __//   |   / __ \\/_  __/  / /");
    this.log("  \\__ \\  / /  / /| |  / /_/ / / /    / /");
    this.log(" ___/ / / /  / ___ | / _, _/ / /    /_/");
    this.log("/____/ /_/  /_/  |_|/_/ |_| /_/    (_)");
    this.log(" ");
    var prompts = [{
      name: 'appName',
      message: 'Hello! What is your folder\'s name ?'
    },
    {
      name: 'needJquery',
      type: 'confirm',
      message: 'Do you want to include jQuery ?'
    }];

    this.prompt(prompts, function (props) {
      for(var k in props){
        this[k]=props[k];
      }
      done();
    }.bind(this));
  },

  askForFrameworkNeeds: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    var prompts = [{
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
        value: 'foundation',
        checked: false
      }]
    }];

    this.prompt(prompts, function (props) {
      for(var k in props){
        this[k]=props[k];
      }
      done();
    }.bind(this));
  },
  askForTaskRunnerNeeds: function () {
    var done = this.async();
    var prompts = [{
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
    }];
    var extraPrompts = [{
      name: 'needCustomConfig',
      type: 'confirm',
      message: 'Do you want to select tasks instead of grabbing default tasks ?',
      default: true
    }, {
      when: function (response) {
        return response.needCustomConfig;
      },
      name: 'customConfig',
      type: 'checkbox',
      message: 'What do you need ?',
      choices: [{
        name: 'SASS support',
        value: 'sass',
        checked: false
      },
      {
        name: 'CSS minification',
        value: 'cssmin',
        checked: false
      }, {
        name: 'Javascript minification',
        value: 'uglify',
        checked: false
      },
      {
        name: 'HTML minification',
        value: 'htmlmin',
        checked: false
      },
      {
        name: 'JS linting',
        value: 'jshint',
        checked: false
      },
      {
        name: 'Files concatenation',
        value: 'concat',
        checked: false
      }
      ]
    }];
    this.prompt(prompts, function (props) {
      for(var k in props){
        this[k]=props[k];
      }
       if (props.needTaskRunner){
         this.prompt(extraPrompts, function (extraProps) {
          for(var k in extraProps.customConfig){
            // this.log(extraProps.customConfig[k]+"\\n");
            var prefix = (this.taskRunner == "gulp") ? "gulp-" : "grunt-contrib-";
            extraProps.customConfig[k] = prefix+extraProps.customConfig[k];
          }
          this.customConfig = extraProps.customConfig;
          done();
         }.bind(this));
       }
     // done();
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
