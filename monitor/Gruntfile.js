module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        path: {
            dev: 'code',
            release: 'dist',
            tmp: 'tmp'
        },
        clean: {
            dist: {
                src: [
                    '<%= path.release %>/*',
                    '<%= path.tmp %>'
                ]
            },
            finished: {
                src: [
                    '<%= path.tmp %>'
                ]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= path.dev %>',
                    dest: '<%= path.release %>',
                    src: '**/*.{php,txt,json,htm,html,png,jpg,jpeg,gif,ico}'
                }]
            }
        },
        useminPrepare: {
            html: ['<%= path.dev %>/*.html'],
            options: {
                root: '<%= path.dev %>',
                dest: '<%= path.release %>'
            }
        },
        concat: {
            release: {
                files: {
                    '<%= path.release %>/css/style.css': ['<%= path.dev %>/**/*.css']
                }
            },
        },
        cssmin:{
            release: {
                files: {
                    '<%= path.release %>/css/style.css': ['<%= path.release %>/css/style.css']
                }
            },
        },
        usemin: {
            html: '<%= path.release %>/*.html',
            css: '<%= path.release %>/css/{,*/}*.css',
            js: '<%= path.release %>/js/{,*/}*.js',
            options: {
                assetsDirs: ['<%= path.release %>', '<%= path.release %>/assets'],
                patterns: {
                    js: [
                        [/["']([^:"']+\.(?:png|gif|jpe?g))["']/img, 'Image replacement in js files']
                    ]
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.dev %>',
                    dest: '<%= path.tmp %>',
                    src: '**/*.js'
                }]
            }
        },
        uglify: {
            release: {
                options: {
                    mangle: true, //混淆变量名
                    comments: 'false' //false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                },
                files: {
                    '<%= path.release %>/js/index.js': ['<%= path.tmp %>/**/*.js']
                }

            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.release %>',
                    src: '*.html',
                    dest: '<%= path.release %>'
                }]
            }
        },
    })


    grunt.registerTask('default', [
        'clean:dist',
        'copy:main',
        'useminPrepare',
        'concat:release',
        'cssmin:release',
        'babel',
        'uglify',
        'usemin',
        'htmlmin',
        'clean:finished',
    ])
}