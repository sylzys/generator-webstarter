module.exports = function(grunt){
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // htmlhint: {
        //     build: {
        //         options: {
        //             'tag-pair': true,
        //             'tagname-lowercase': true,
        //             'attr-lowercase': true,
        //             'attr-value-double-quotes': true,
        //             'doctype-first': true,
        //             'spec-char-escape': true,
        //             'id-unique': true,
        //             'head-script-disabled': true,
        //             'style-disabled': true
        //         },
        //         src: ['www/index.html']
        //     }
        // },
        watch: {
            // html: {
            //     files: ['www/index.html'],
            //     tasks: ['htmlhint']
            // },
            js: {
                files: ['src/js/*.js'],
                tasks: ['buildjs']
            },
            css: {
                files: ['src/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        },
        jshint: {
            options: {
              curly: true,
              eqeqeq: false,
              eqnull: true,
              esnext: true,
              browser: true,
              trailing: true,
              undef: false,
              devel: true,
              jquery: true,
              globals: {
                devel: true,
            },
        },
        all: ['src/js/base.js']
    },
    uglify: {
        build: {
            files: {
                'build/js/built.min.js': ['build/js/built.js'],
            }
        }
    },
  //   removelogging: {
  //       dist: {
  //           src: "www/dist/js/built.min.js"
  //     }
  // },
  concat: {
    options: {
      separator: ';',
  },
  dist: {
      src: ['src/js/main.js'],
      dest: 'built/js/main.js',
  },
},
sass: {
    build: {
        files: {
            'build/css/style.css': 'src/sass/style.scss'
        }
    }
},
cssc: {
    build: {
        options: {
            consolidateViaDeclarations: true,
            consolidateViaSelectors:    true,
            consolidateMediaQueries:    true
        },
        files: {
            'build/css/style.css': 'build/css/style.css'
        }
    }
},
cssmin: {
    build: {
        src: 'build/css/style.css',
        dest: 'build/css/style.min.css'
    }
},
concat_css: {
    options: {},
    all: {
        src: ["build/css/reset.css", "build/css/style.css"],
        dest: "build/css/style.css"
    },
}

});

grunt.registerTask('default', []);
grunt.registerTask('buildcss',  ['sass', 'cssmin']);
grunt.registerTask('buildjs',  ['jshint', 'concat', 'uglify']);

};
