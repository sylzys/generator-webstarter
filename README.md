Yeoman Web Starter generator
===============

A [Yeoman](http://www.yeoman.io) generator that allows you to customize your boilerplate.

---

- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Installation](#installation)
	- [Alternative installation methods](#alternative-installation-methods)
		- [From github](#from-github)
- [Usage](#usage)
	- [Correction](#correction)
- [TODO](#todo)

Dependencies
-----------

This generator relies on :
- [Node.js](http://nodejs.org)
- [Node Package Manager](https://www.npmjs.org/)
- Yo : npm install yo

Introduction
------------

No more need to copy-paste folders from an old project, no more need to go on Boostrap or jQuery to fetch the sources...

This generator allows you to customize your web project boilerplate. Choose what you need, and let it prepare your files.

Installation
------------

Until it is avaible on npm, please follow the [alternative installation method](#alternative-installation-methods)

### Alternative installation method

Clone this repository:

    git clone git://github.com/sylzys/generator-webstarter.git

or download it manually

[Download](https://github.com/sylzys/generator-webstarter/archive/master.zip) as a zip, then unzip it.

Then go into the generator directory, and link it with npm

``` js
cd generator-webstarter
npm link
```

After that, you can use the generator by typing
``` js
yo webstarter
```

Usage
-----

### Generation

Just type
``` js
yo webstarter
```
and answer questions.

You can choose a front-end framework among :
- [Twitter Boostrap](http://getbootstrap.com/getting-started/)
- [Zurb Foundation](http://foundation.zurb.com/docs/)

The files will be fetched automatically by Bower, in YOUR_FOLDER/bower_components.
Don't forget to include these files (CSS, JS) in the corresponding YOUR_FOLDER/src directory, or to adjust the task runner's files accordingly.

You can also choose to use a task runner:
- [Gulp](http://gulpjs.com)
- [Grunt](http://gruntjs.com)

*Optional*: If you choose to use a task runner, you have the option to select several tasks, in addtition to default tasks (build, watch) :
- Javascript linting
- Javascript minification
- Javascript concatenation
- SASS Conversion to CSS
- CSS minification
- Image optimization
- more to come...

Once you selected everything you need, let the genrator fetch all dependencies for you, then **ENJOY CODING**

Todo
-----
- Add test tasks (mocha...)
- Add livereload task
- Add serve/open tasks