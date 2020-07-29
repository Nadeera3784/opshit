const path    = require('path');

const languageHelper = async function () {
    let i18n = new (require('i18n-2'))({
        locales: ['en', 'de', 'es', 'ru'],
        directory: path.join(__dirname, '../../config/languages'),
        devMode : false
    });
    return i18n;
}


module.exports = {
    languageHelper,
};