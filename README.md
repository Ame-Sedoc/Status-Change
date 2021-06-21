# Status-Change
# Developer Support - Troubleshooting Exercise

Put yourself in the shoes of a Slack developer. You're building an app but it's not working as expected and now you need to debug your code.


## End goal

The app that you're building makes use of Slack's Events API. It listens for a user's Status Changes in the `user_change` event, and then posts a message containing their custom status to the #statuses channel in their Slack workspace.

The final design should look like this:

![final result](Final Result.png)


## Files

There are a handful of small coding errors in the provided `app.js` file. You should only need to edit the contents of `app.js` to get the app working.


## Setup

You will need to host your node.js application somewhere. You can do this on a platform such as [Heroku](https://devcenter.heroku.com/categories/nodejs-support) with a free account, on any other node.js hosting platform you are familiar with (e.g. [Glitch](https://glitch.com/)), or you can host the app locally using [ngrok](https://ngrok.com/download).


### Dependencies

This application was developed using the following modules:

* **express** - v4.16.3
* **request** - v2.85.0
* **body-parser** - v1.18.2
* **dotenv** - v5.0.1

You can run `npm install` to install these modules, and you shouldn't need to update any of them to complete the exercise.


### Monitoring network requests

If you decide to use ngrok to host the project locally, download and unzip ngrok. In the command line window pointing to the unzipped contents, type:

```
./ngrok http 12345
```

This starts an app called _ngrok_, which will allow Slack to connect to your local node app, which you will be running on **port 12345**. You will get back a unique ngrok URL, which you will use when configuring your Slack app.

Once ngrok is running, you will see inbound requests appearing in this command line window, and you can also view more detailed network logs at http://127.0.0.1:4040.


### Configuring the Slack App

1. Duplicate the provided `.env-sample` file and name it `.env`.
2. Create a new Slack workspace for testing: https://slack.com/create
3. In that workspace, create a new public channel.
4. Right-click on the channel's name in the sidebar and copy the channel link. Paste the ID from that link (which looks like `C0123ABC`) into the `.env` file next to the `CHANNEL_ID` variable.
5. Create a new Slack app and assign it to your newly created workspace: https://api.slack.com/apps
6. Go to the app's **OAuth & Permissions** page and add the `chat:write:bot` and `users:read` scopes. Save your changes.
7. At the top of that page, press the green **Install App to Workspace** button to install it on your new workspace.
8. After authorizing the app, you'll see an **OAuth Access Token** that starts with `xoxp`. Copy that token and paste it into the `.env` file next to the `API_TOKEN` variable.
9. Save the changes to your `.env` file.
10. Start running your app by typing this in your command line:
```
npm start
```
11. Go to the app's **Event Subscriptions** page and enable the feature.
12. Copy your app's server or ngrok URL and add `/events` to the end of it. Paste that full URL as the **Request URL**.
13. Subscribe to the `user_change` event and save the settings.


## Testing your Changes

Whenever you make changes to the code, you will need to restart the app.

### Running/restarting the app

To start and restart your app, type the following into the command line window that points to your working directory:

```
npm start
```

### Triggering the `user_change` events

As long as your app is running, change your Slack status to something new in order for a `user_change` event to be triggered.
