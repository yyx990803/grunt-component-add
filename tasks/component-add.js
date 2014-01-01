module.exports = function (grunt) {

    var fs = require('fs'),
        path = require('path')
    
    grunt.registerMultiTask('componentadd', 'Add files to component.json', function () {
        var done = this.async(),
            opts = this.options({
                styles: ['css', 'styl', 'sass', 'less'],
                scripts: ['js', 'coffee'],
                templates: ['html', 'jade', 'mustache', 'handlebars'],
                images: ['jpg', 'png', 'gif'],
                files: [],
                indent: 2
            }),
            config = grunt.file.readJSON('component.json'),
            map = makeExtensionMap(opts, config)
        this.files.forEach(function (match) {
            match.src.forEach(function (file) {
                var ext = path.extname(file).slice(1),
                    type = map[ext]
                if (type) {
                    config[type] = config[type] || []
                    config[type].push(file)
                }
            })
        })
        fs.writeFile('component.json', JSON.stringify(config, null, opts.indent), done)
    })

}

function makeExtensionMap (opts, config) {
    var map = {}
    for (var key in opts) {
        if (Array.isArray(opts[key])) {
            delete config[key]
            opts[key].forEach(function (ext) {
                map[ext] = key  
            })
        }
    }
    return map
}