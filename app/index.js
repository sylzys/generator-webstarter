'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var WebstarterGenerator = yeoman.generators.Base.extend({
  askForForlderName: function () {
    var done = this.async();
    this.log('                            ____    __    ____  _______ .______   ');
    this.log('                            \\   \\  /  \\  /   / |   ____||   _  \\  ');
    this.log('                             \\   \\/    \\/   /  |  |__   |  |_)  | ');
    this.log('                              \\            /   |   __|  |   _  <  ');
    this.log('                               \\    /\\    /    |  |____ |  |_)  | ');
    this.log('                                \\__/  \\__/     |_______||______/  ');
    this.log('                                                                  ');
    this.log('     _______.___________.    ___      .______     .___________. _______ .______          __  ');
    this.log('    /       |           |   /   \\     |   _  \\    |           ||   ____||   _  \\        |  | ');
    this.log('   |   (----`---|  |----`  /  ^  \\    |  |_)  |   `---|  |----`|  |__   |  |_)  |       |  | ');
    this.log('    \\   \\       |  |      /  /_\\  \\   |      /        |  |     |   __|  |      /        |  | ');
    this.log('(----)   |      |  |     /  _____  \\  |  |\\  \\----.   |  |     |  |____ |  |\\  \\----.   |__| ');
    this.log('|_______/       |__|    /__/     \\__\\ | _| `._____|   |__|     |_______|| _| `._____|   (__) ');
    this.log(" ");
    var prompts = [{
      name: 'appName',
      message: 'Hello! What\'s your folder\'s name ?'
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
        value: 'bootstrap',
        checked: true
      }, {
        name: 'Foundation',
        value: 'bower-foundation',
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
      message: 'Do you want to select tasks in addition to default tasks ?',
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
        name: 'Image optimization',
        value: 'imagemin',
        checked: false
      },
      {
        name: 'JS linting',
        value: 'jshint',
        checked: false
      },
      {
        name: 'File concatenation',
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
        this.taskNames = [];
        for(var k in extraProps.customConfig){
          this.taskNames.push(extraProps.customConfig[k]);
          var prefix = (this.taskRunner == "gulp") ? "gulp-" : "grunt-contrib-";
          extraProps.customConfig[k] = prefix+extraProps.customConfig[k];
        }
        this.customConfig = extraProps.customConfig;
        done();
      }.bind(this));
     }
     else
        done();
   }.bind(this));
  },
  enforceFolderName: function () {
    if (this.appName !== this._.last(this.destinationRoot().split(path.sep))) {
      this.destinationRoot(this.appName);
    }
  },
  app: function () {
    this.mkdir('build');
    this.mkdir('build/css');
    this.mkdir('build/js');
    this.mkdir('build/img');
    this.mkdir('src');
    this.mkdir('src/js');
    var cssPath = (this.needTaskRunner && this.taskNames.indexOf("sass") != -1) ? 'sass' : 'css'
    this.mkdir('src/'+cssPath);
    this.mkdir('src/img');
    this.copy('_index.html', 'index.html');
    this.copy('_main.js', 'src/js/main.js');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this._processDirectory(this.taskRunner);
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },
  installDeps: function() {
  this.installDependencies();
  }
});


WebstarterGenerator.prototype._processDirectory = function(taskRunner) {
  if ('gulp' === taskRunner){
    this.mkdir('gulp');
    this.mkdir('gulp/tasks');
    this.directory('gulp/util', 'gulp/util');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('gulp/_index.js', 'gulp/index.js');
    this.copy('gulp/tasks/_default.js', 'gulp/tasks/default.js');
    this.copy('gulp/tasks/_build.js', 'gulp/tasks/build.js');
    this.copy('gulp/tasks/_watch.js', 'gulp/tasks/watch.js');
    for (var i in this.taskNames){
      console.log("task", this.taskNames[i]);
      this.copy('gulp/tasks/_'+this.taskNames[i]+'.js', 'gulp/tasks/'+this.taskNames[i]+'.js');
    }
  }
    else if ('grunt' === taskRunner){
      this.copy('_Gruntfile.js', 'Gruntfile.js');
    }
};
module.exports = WebstarterGenerator;
