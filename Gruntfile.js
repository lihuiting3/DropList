// Generated on 2015-02-03 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var generator = require('./apigen');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    publish: 'publish',
    modulename: 'index',
    commonjsname: '../common/scripts/milkt.common.js',
    commoncssname: '../common/styles/milkt.common.css',
    headerjsname: '../header/scripts/milkt.common.header.js',
    oss: 'h5-index-oss',
    statics: 'h5-index-static',
    timestamp: Date.now()
  };

  var OSS_HOST = 'http://imgcms.yit.com/h5';

  var cut = function(dest) {
    var map = ['order/', 'main/', 'center/', 'detail/'];
    for (var i in map) {
      if (startsWith(dest, map[i])) {
        dest = dest.slice(0, map[i].length - 1);
      }
    }

    return dest;
  }

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      publish: {
        files: [{
          dot: true,
          src: [
            '<%= config.publish %>/*'
          ]
        }]
      },
      oss: {
        files: [{
          dot: true,
          src: [
            '<%= config.oss %>/*'
          ]
        }]
      },
      statics: {
        files: [{
          dot: true,
          src: [
            '<%= config.statics %>/*'
          ]
        }]
      },
      extra: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/index.html'
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 10 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/*.html',
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/img',
          '<%= config.dist %>/scripts',
          '<%= config.dist %>/styles'
        ],
        blockReplacements: {
          js: function(block) {

            if (!config.hybrid && (block.dest == '../cordova.js' || block.dest == '/../cordova.js')) {
              return '';
            }

            if (config.hybrid && block.dest == '/scripts/sf.h5.base.js') {
              return ''
            } else if (!config.hybrid && block.dest == '/scripts/sf.h5.hybrid.base.js') {
              return '';
            }

            if (!config.hybrid && block.dest == '../cordova.js') {
              return '';
            }

            if (config.hybrid) {
              if (block.dest[0] == '/') {
                return '<script src="' + '.' + block.dest + '"></script>';
              } else if (block.dest[0] != './') {
                return '<script src="' + './' + block.dest + '"></script>';
              } else {
                return '<script src="' + block.dest + '"></script>';
              }

              block.dest = cut(dest);
            }

            if (config.version) {
              if (block.dest[0] != '/') {
                return '<script src="' + OSS_HOST + '/' + config.version + '/' + block.dest + '"></script>';
              } else {
                return '<script src="' + OSS_HOST + '/' + config.version + block.dest + '"></script>';
              }
            } else {
              if (block.dest[0] != '/') {
                return '<script src="' + '/' + config.modulename + '/' + block.dest + '"></script>';
              } else {
                return '<script src="' + '/' + config.modulename + block.dest + '"></script>';
              }
            }
          },

          commonjs: function(block) {
            if (config.version) {
              return '<script src="' + block.dest + '"></script>';
            } else {
              return '<script src="' + config.commonjsname + '"></script>';
            }
          },
          headerjs: function(block) {
            if (config.version) {
              return '<script src="' + block.dest + '"></script>';
            } else {
              return '<script src="' + config.headerjsname + '"></script>';
            }
          },

          commoncss: function(block) {
            if (config.version) {
              return '<link rel="stylesheet" href="' + block + '">';
            } else {
              return '<link rel="stylesheet" href="' + config.commoncssname + '">';
            }
          },

          css: function(block) {
            if (config.hybrid) {
              if (block.dest[0] == '/') {
                return '<link rel="stylesheet" href="' + '.' + block.dest + '">';
              } else if (block.dest[0] != './') {
                return '<link rel="stylesheet" href="' + './' + block.dest + '">';
              } else {
                return '<link rel="stylesheet" href="' + block.dest + '">';
              }

              block.dest = cut(dest);
            }

            if (config.version) {
              if (block.dest[0] != '/') {
                return '<link rel="stylesheet" href="' + OSS_HOST + '/' + config.version + '/' + block.dest + '">';
              } else {
                return '<link rel="stylesheet" href="' + OSS_HOST + '/' + config.version + block.dest + '">';
              }
            } else {
              if (block.dest[0] != '/') {
                return '<link rel="stylesheet" href="' + '/' + config.modulename + '/' + block.dest + '">';
              } else {
                return '<link rel="stylesheet" href="' + '/' + config.modulename + block.dest + '">';
              }
            }
          }
        }
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          timestamp: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',

            // 不需要static中的html
            // '{,*/}*.html',

            'json/{,*/}*.json',
            // 'templates/{,*/}*.mustache',
            // '*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },

      html: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
        src: [
          '*.html',
          'header/*.html',
          'footer/*.html'
        ],
        options: {
          process: function(content, srcpath) {
            if (config.version) {
              content = content.replace(/\{version\}/g, config.timestamp);
              content = content.replace(/img\/qrcode.png/g, OSS_HOST + '/' + config.version + '/img/qrcode.png');
            }
            return content;
          }
        }
      },

      image: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>/static',
        dest: '<%= config.dist %>',
        src: [
          'img/{,*/}*.*',
          'img/*/{,*/}*.*',
          'img/*/*/{,*/}*.*',
          'img/*/*/*/{,*/}*.*',
        ]
      },

      icon: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>/static',
        dest: '<%= config.dist %>',
        src: [
          'img/icon.png',
          'img/coupon.png',
          'img/coupons.png',
          'img/coupons-c1.png',
          'img/coupons2.png',
          'img/sharepocket.jpg'
        ]
      },

      // @todo需要修改，自动笔变化图片
      templates: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
        src: [
          'templates/{,*/}*.mustache'
        ],
        options: {
          process: function(content, srcpath) {
            if (config.version) {
              return content.replace(/img\/recommend.jpg/g, OSS_HOST + '/' + config.version + '/img/recommend.jpg')
            } else {
              return content;
            }
          }
        }
      },

      styles: {
        expand: true,
        dot: true,
        cwd: '.tmp/concat/styles',
        dest: '<%= config.dist %>/styles/',
        src: '{,*/}*.css'
      }
    },

    compress: {
      oss: {
        options: {
          archive: '<%=config.oss%>/target/<%=config.oss%>.zip',
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['scripts/**', 'styles/**', 'img/**'],
          dest: '<%= config.oss %>/<%=config.version%>'
        }]
      },
      statics: {
        options: {
          archive: '<%=config.statics%>/target/<%=config.statics%>.zip',
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['templates/**', '*.html', 'header/*.html', 'footer/*.html', 'json/**', '*.ico'],
          dest: 'ROOT/<%=config.modulename%>'
        }]
      },
      testv2: {
        options: {
          archive: '<%=config.statics%>/target/<%=config.statics%>.zip',
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['templates/**', '*.html', 'header/*.html', 'footer/*.html', 'json/**', 'scripts/**', 'styles/**', 'img/**'],
          dest: 'ROOT/<%=config.modulename%>'
        }]
      },
      test: {
        options: {
          archive: '<%=config.publish%>/statics.<%=config.target%>.<%=config.timestamp%>.tar'
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['templates/**', '*.html', 'img/**', 'json/**', 'scripts/**', 'styles/**', 'header/*.html', 'footer/*.html', 'json/**'],
          dest: '<%= config.modulename %>'
        }]
      },
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // @todo 需要修改，自动找到并配置requirejs
    requirejs: {
      designersList: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.designerList.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.designerList"],
          insertRequire: ['yit.module.designerList']
        }
      },

      valentin: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.valentine.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.valentine"],
          insertRequire: ['yit.module.valentine']
        }
      },

      valentin: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.common.api.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.common.api"],
          insertRequire: ['yit.module.common.api']
        }
      },
      
      searchbar: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.searchbar.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.searchbar"],
          insertRequire: ['yit.module.searchbar']
        }
      },

      coupon: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.coupon.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.coupon"],
          insertRequire: ['yit.module.coupon']
        }
      },

      index: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.index.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.index"],
          insertRequire: ['yit.module.index']
        }
      },

      threeCategory: {
        options: {
          optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.tmp %>/concat/scripts/yit.module.ThirdCategoryByFirst.js',
          mainConfigFile: "./<%= config.app %>/scripts/sf.b2c.mall.require.config.js",
          paths: {
            // 'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: ["yit.module.ThirdCategoryByFirst"],
          insertRequire: ['yit.module.ThirdCategoryByFirst']
        }
      },
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('create', function() {
    var done = this.async();
    generator.autogen(grunt, done);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('hybrid', function(module, version) {
    var map = {
      all: ['compress:hybrid_detail', 'compress:hybrid_order', 'compress:hybrid_center'],
      detail: ['compress:hybrid_detail'],
      order: ['compress:hybrid_order'],
      center: ['compress:hybrid_center']
    }

    config.version = version;
    config.hybrid = true;
    config.target = 'hybrid';

    var base = [
      'clean:dist',
      // 'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'requirejs',
      'cssmin',
      'uglify',
      'copy:dist',
      'copy:html',
      // 'copy:image',
      'copy:icon',
      'copy:templates',
      // 'copy:scripts',
      'usemin',
      // 'htmlmin',
      // 'copy:styles',
      'clean:publish'
    ]

    var array = base.concat(map[module] || []);
    grunt.task.run(array);
  });


  grunt.registerTask('build', function(target) {
    config.target = target;

    if (config.target) {
      grunt.task.run([
        'clean:dist',
        // 'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs',
        // 'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        // 'htmlmin',
        'copy:styles',
        'clean:extra',
        'clean:publish',
        'compress:test'
      ]);
    } else {
      grunt.fail.fatal('缺少环境参数!');
    }
  });

  grunt.registerTask('test', function() {
    config.target = 'prd';

    grunt.task.run([
      'clean:dist',
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      // 'autoprefixer',
      'concat',
      'requirejs',
      // 'cssmin',
      'uglify',
      'copy:dist',
      'copy:html',
      'copy:image',
      'copy:templates',
      'usemin',
      // 'htmlmin',
      'copy:styles',
      'clean:extra',
      'clean:publish',
      'clean:oss',
      'clean:statics',
      'compress:testv2'
      // 'compress:oss',
      // 'compress:statics'
    ]);
  })

  grunt.registerTask('release', function(version) {
    config.version = version;

    if (config.version) {
      config.target = 'prd';

      grunt.task.run([
        'clean:dist',
        // 'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs',
        // 'cssmin',
        'uglify',
        'copy:dist',
        'copy:html',
        'copy:image',
        'copy:templates',
        'usemin',
        // 'htmlmin',
        'copy:styles',
        'clean:extra',
        'clean:publish',
        'clean:oss',
        'clean:statics',
        'compress:oss',
        'compress:statics'
      ]);
    } else {
      grunt.fail.fatal('缺少版本号!');
    }
  })

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};