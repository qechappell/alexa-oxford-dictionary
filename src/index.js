'use strict';

var Alexa = require('alexa-sdk');

exports.handler = (event, context) => {
	var alex = Alexa.handler(event, context);
	alexa.registerHandlers();
	alexa.execute();
}

