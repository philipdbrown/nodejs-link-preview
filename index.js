const express = require('express')
var request = require('request');
var cheerio = require('cheerio');
const Regex = require('./Regex.js');
const Media = require('./Media.js');
const Helper = require('./Helper.js');
const app = express();
const port = process.env.PREV_LINK_PORT;

if(port == undefined || port < 3000) {
    console.log('ERROR:  Missing PREV_LINK_PORT environment variable.  This will set the port number.\n');
    process.exit(1);
}

app.get('/preview-link', (req, res) => {

    let url = req.query.url ? req.query.url : '';

    if (Regex.URL_REGEX.test(url)) {
        let returnRes = {
            canonicalUrl: Helper.canonicalPage(url),
            title: '',
            url: url,
            description: '',
            image: '',
            video: '',
        };

        if (Helper.isImage(url)) {
            returnRes.image = url;
            res.send(returnRes);
        } else {
            request(url, function (error, response, body) {
                if (!error) {
                    var $ = cheerio.load(body);

                    returnRes.title = $('title').text();
                    let og_title = $('meta[property="og:title"]').attr('content');
                    if (og_title) {
                        returnRes.title = og_title;
                    }

                    //desc
                    returnRes.description = $('meta[name="description"]').attr('content') || '';
                    let og_description = $('meta[property="og:description"]').attr('content');
                    if (og_description) {
                        returnRes.description = og_description;
                    }

                    //managing images
                    let og_image = $('meta[property="og:image"]').attr('content');
                    if (og_image) {
                        returnRes.image = og_image;
                    }

                    //check for media stuff
                    returnRes.video = Media.getMedia(url);
                } else {
                    returnRes.error = error;
                }
                res.send(returnRes);
            });
        }
    }
})

app.listen(port, () => console.log(`NODEJS-LINK-PREVIEW app listening on port ${port}!`));