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
  				var senses = data.results[0].lexicalEntries[0].entries[0].senses;
  				console.log("senses: " + senses.length);
  				var definitions = new Array();
  				for (var i = 0; i < senses.length; i++) {
  					console.log("senses.length = " + senses.length);
  					definitions = definitions.concat(senses[i].definitions);
  				}
  				var definitionCount = definitions.length;
  				console.log(definitions);
  				console.log('Definition count: ' + definitionCount);
  				if (definitionCount > 1) {
	  				var definitionIdx = 1;
  					var outputSpeech = "I have found " + definitionCount +" definitions of the word " + word + " , here they are: ";
  					for (var i = 0; i < definitionCount; i++) {
  						outputSpeech += " definition " + definitionIdx + ": " + definitions[i];
  						definitionIdx++;
  				    }
  				}
  				else {
  					var outputSpeech = "The definition of the word " + word + " is: " + definitions[0];
  				}

  				tell(this, outputSpeech);
  			});
		});
		req.setTimeout(10000, function() {
			console.log('timed out');
		});
		req.end();
	},
	'GetSentence' : function () {
		var word = this.event.request.intent.slots.Word.value;
		var endpoint = dictUrl + lang + '/' + word + "/sentences";
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
  				console.log(body);
  				var data = JSON.parse(body);
  				var sentences = data.results[0].lexicalEntries[0].sentences;
  				console.log(sentences);
  				for (var i = 0; i < sentences.length; i++) {
  					if (sentences[i].regions == ['North American']) {
  						var outputSpeech = "here is a sentence using the word " + word + ". " + sentence[i].text;
  						break;
  					}
  					else {
  						var outputSpeech = "Sorry, I could not find a sentence containing the word, " + word;
  					}
  				}

  				var outputSpeech = sentences[0].text;
  				tell(this, outputSpeech);
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