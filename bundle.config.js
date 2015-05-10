module.exports = {
    bundle: {
        main: {
            scripts: [
                './src/app/app.js',
                './src/**/*.module.js',
                './src/app/**/*.js'
            ],
            options: {
                uglify: true
            },
            styles: './src/**/*.css'
        },
        vendor: {
            scripts: [
                { src: './bower_components/angular/angular.js', minSrc: './bower_components/angular/angular.min.js' }
            ],
            options: {
                useMin: true, // {(boolean|string|Array)} pre-minified files from bower
                uglify: false
            }
        }
    },
    copy: './src/**/*.{png,svg}'
};