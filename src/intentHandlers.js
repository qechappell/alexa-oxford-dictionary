'use strict'

var constants = require('./config/Constants');
var https = require('https');

var appKey = constants.APP_KEY;
var appId = constants.APP_ID;
var baseUrl = constants.BASE_URL;
var dictUrl = constants.DICT_BASE;
var lemmUrl = constants.LEMMATRON_BASE;
var searchUrl = constants.SEARCH_BASE;
var lang = constants.LANG;

var intentHandlers = {
	'GetDefinition' : function () {
		var word = this.event.request.intent.slots.Word.value;
		var endpoint = dictUrl + lang + '/' + word;
		var options = {
   		    hostname: baseUrl,
    		path: endpoint,
    		method: 'GET',
    		headers: {
    		    accept: 'application/json',
    		    app_key: appKey,
    		    app_id: appId
    		}
		};
		var req = https.request(options, (res) => {
			var body = "";
			res.on('data', (d) => {
				body += d;
  			});
  			res.on('end', () => {
  				var data = JSON.parse(body);
  				tell(this, data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
  			});
		});
		req.setTimeout(10000, function() {
			console.log('timed out');
		});
		req.end();
	},
	'GetSentence' : function () {
		var word = this.event.request.intent.slots.Word.value;
		var endpoint = dictUrl + lang + '/' + word;
		var options = {
   		    hostname: baseUrl,
    		path: endpoint,
    		method: 'GET',
    		headers: {
    		    accept: 'application/json',
    		    app_key: appKey,
    		    app_id: appId
    		}
		};
		var req = https.request(options, (res) => {
			var body = "";
			res.on('data', (d) => {
				body += d;
  			});
  			res.on('end', () => {
  				var data = JSON.parse(body);
  				tell(this, data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
  			});
		});
		req.setTimeout(10000, function() {
			console.log('timed out');
		});
		req.end();
	} 
}

function ask(handler, question) {
	handler.emit(':ask', question);
}

function tell(handler, message) {
	handler.emit(':tell', message);
}

module.exports = intentHandlers;