'use strict'

var intentHandlers = {
	'GetDefinition' : function (intent, session, response) {
		console.log('request: ' + this.event.request.type);
		var word = this.event.request.intent.slots.Word.value;
		console.log('word: ' + word);
		this.emit(':tell', 'the word was ' + word);
	},
	'Unhandled' : function() {
		response.tell("unhandled");
	}
}

module.exports = intentHandlers;