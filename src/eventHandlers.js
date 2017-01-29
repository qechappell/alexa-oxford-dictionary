'use strict'

var eventHandlers = {
	'onSessionStarted' : function(sessionStartedRequest, session) {
		console.log("SESSION STARTED");
	},
	'onLaunch' : function(launchRequest, session, response) {
		response.tell("Welcome");
	}
}

modules.export = eventHandlers;