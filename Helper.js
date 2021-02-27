const Regex = require('./Regex.js');

module.exports = {
    isImage(url) {
        return Regex.IMAGE_PREFIX_REGEX.test(url)
    },
    canonicalPage(url) {
        canonical = "";

        //  Remove http(s)://
        url = url.replace(/(^\w+:|^)\/\//, '');
        
        for (i = 0; i < url.length; i++) {
            if (url[i] != "/")
                canonical += url[i];
            else
                break;
        }
        return canonical;
    }
}