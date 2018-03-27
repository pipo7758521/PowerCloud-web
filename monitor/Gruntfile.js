module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        path: {
            dev: 'code',
            release: 'dist'
        },
        clean: {
            dist: {
                src: [
                    '<%= path.release %>/*'
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
        filerev: {
            files: {
                src: [
                    '<%= path.release %>/assets/.{png,jpg,jpeg,gif}',
                    '<%= path.release %>/js/{,*/}*.js',
                    '<%= path.release %>/css/{,*/}*.css'
                ]
            }
        },
        useminPrepare: {
            html: ['<%= path.dev %>/*.html'],
            options: {
                root: '<%= path.dev %>',
                dest: '<%= path.release %>'
            }
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
                    dest: '.tmp/concat',
                    src: '**/*.js'
                }]
            }
        },
        uglify: {
            options: {
             mangle: true, //混淆变量名
             comments: 'false' //false（删除全部注释），some（保留@preserve @license @cc_on等注释）
            },
            my_target: {
                 files: [{
                   expand:true,
                   cwd: '<%= path.release %>',
                   dest: '<%= path.release %>',
                   src: '<%= path.release %>*.js'
                 }]
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
        'babel',
        'concat',
        'cssmin',

        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ])
}