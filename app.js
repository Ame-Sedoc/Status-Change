// Initialize app
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

// Define JSON parsing mode for Events API requests
app.use(bodyParser.json())

// Get environment variables
var api_token = process.env.API_TOKEN;
var channel_id = process.env.CHANNEL_ID;

//
//
// You don't need to make changes to anything above this line
//
//




// Handle Events API events
app.get('/events', function(req, res){

  if(req.body.challenge) {
    // Respond to the challenge
    res.send({"challenge": req.body.challenge});

  } else {
    // Store details about the user
    var evt = req.body.event;
    var user_id = evt.user.id;
    var user_name = evt.user.real_name_normalized;
    var status_text = evt.user.profile.status_text;
    var status_emoji = evt.user.profile.status_emoji;

    // If no full name set, use the username instead
    if(user_name == "") {
      user_name = evt.user.name;
    }

    // Return a 200 to the event request
    res.status(200).end();

    // Build the message payload
    buildMessage(user_id, user_name, status_text, status_emoji);
  }
});


// Build the message payload
function buildMessage(user_id, user_name, status_text, status_emoji) {

  if(status_text.length > 0) {
    // If their status contains some text
    var message = [
      {
        "pretext": user_name + " updated their status:",
        "text": status_emoji + " *" + status_text + "*"
      }
    ];
  } else {
    // If their status is empty
    var message = [
      {
        "pretext": user_name + " cleared their status"
      }
    ];
  }

  postUpdate(message);
}

// Post the actual message to a channel
function postUpdate(attachments) {
  var data = {
    "token": api_token,
    "channel": channel_id,
    "text": JSON.stringify(attachments),
    "pretty": true
  };
  request.post(
    "https://slack.com/api/chat.postmessage",
    {
      form: data
    },
    function(err, resp, body) {
      if(err) {
        // If there's an HTTP error, log the error message
        console.log(err);
      } else{
        // Otherwise, log Slack API responses
        console.log(body);
      }
    }
  );
}

// Listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
