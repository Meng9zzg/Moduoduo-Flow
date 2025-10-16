const { src, dest, series, parallel } = require('gulp')

function copyIcons() {
    return src(['nodes/**/*.{jpg,png,svg}']).pipe(dest('dist/nodes'))
}

function copyLocales() {
    return src(['locales/**/*.json']).pipe(dest('dist/locales'))
}

exports.default = parallel(copyIcons, copyLocales)
