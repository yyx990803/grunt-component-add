# grunt-component-add
> Automatically add files to component.json.

## Install

``` bash
$ npm install grunt-component-add --save-dev
```

## Usage

Example config that modifies `component.json` when you change files in `src/`:

``` js
module.exports = function (grunt) {
    grunt.initConfig({
        componentadd: {
            add: {
                src: 'src/**/*'
            }
        },
        watch: {
            add: {
                files: 'src/**/*',
                tasks: ['componentadd'],
                options: {
                    nospawn: true,
                    event: ['added', 'deleted'],
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-component-add')
}
```

## Options

Each option, except `indent`, is an array of file extensions that belong to that type. This plugin checks every matched file for the type it belongs and add it to the corresponding array in `component.json`. The following are the default values:

``` js
{
    styles: ['css', 'styl', 'sass', 'less'],
    scripts: ['js', 'coffee'],
    templates: ['html', 'jade', 'mustache', 'handlebars'],
    images: ['jpg', 'png', 'gif'],
    files: [],
    indent: 2 // indent spaces in component.json
}
```