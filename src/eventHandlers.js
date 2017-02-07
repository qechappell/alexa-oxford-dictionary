'use strict'

var eventHandlers = {
	'newSession' : function(NewSession, session) {
		console.log("New session");
	},
	'onSessionStarted' : function(sessionStartedRequest, session) {
		console.log("SESSION STARTED");
	},
	'onLaunch' : function(launchRequest, session, response) {
		response.tell("Welcome");
	},
	'onIntent' : function(intentRequest, session) {
		console.log("new intent");
	}
}

module.exports = eventHandlers;