'use strict';

var Alexa = require('alexa-sdk');
var eventHandlers = require('./eventHandlers');
var intentHandlers = require('./intentHandlers');

exports.handler = (event, context, callback) => {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(eventHandlers,
		intentHandlers);
	alexa.execute();
};

