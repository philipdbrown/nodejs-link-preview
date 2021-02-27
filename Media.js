module.exports = {
	getMedia(pageUrl) {
        if (pageUrl.indexOf('youtube.com') != -1) return this.mediaYoutube(pageUrl);
        if (pageUrl.indexOf('youtu.be') != -1) return this.mediaYoutu(pageUrl);
		if (pageUrl.indexOf('ted.com') != -1) return this.mediaTED(pageUrl);
		if (pageUrl.indexOf('vimeo.com') != -1) return this.mediaVimeo(pageUrl);
		if (pageUrl.indexOf('dailymotion.com') != -1) return this.mediaDailymotion(pageUrl);
		return false;
	},
	mediaYoutube(url) {
		let tokens = url.split('v=')
		if (tokens[1]) {
			return "http://www.youtube.com/embed/" + tokens[1]
		}
		return '';
    },
    mediaYoutu(url) {
        url = url.split('/')
		if (url.length > 0) {
			token = url[url.length - 1];
			if (token.length > 0) {
				return "http://www.youtube.com/embed/" + token;
			}
		}
		return '';

    },
	mediaTED(url) {
		url = url.split('/')
		if (url.length > 0) {
			url = url[url.length - 1];
			url = url.split('?');
			if (url.length > 0) {
				return 'https://embed-ssl.ted.com/talks/' + url[0]
			}
		}
		return '';
	},
	mediaVimeo(url) {
		url = url.replace(/(^\w+:|^)\/\//, '');
		let breakUrl = url.split('/')
		if (breakUrl[1] != "") {
			return 'http://player.vimeo.com/video/' + breakUrl[1];
		}
		return '';
	},
	mediaDailymotion(url) {
		token = url.split('/');
		if (token.length) {
			return 'http://www.dailymotion.com/embed/video/' + token[token.length - 1];
		}
		return '';
    }
}