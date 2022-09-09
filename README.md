# Ark Server Discord Bot
This bot displays if the server is online or offline and how many people are currently playing. The \'!\<server name\>\' command 
displays an embedded message in discord chat with more server information.


![bot showing number of people playing](https://user-images.githubusercontent.com/41929486/181074728-ac696aa0-4a47-4c86-a847-c1784685167d.png)

![embedded message with server information](https://user-images.githubusercontent.com/41929486/181074758-5cc1686d-dbbc-42bd-a84c-3f3d726e94da.png)

## Install:
-Clone the repo 
-Run npm install to install dependancies
-In index.js change the ipAddress and port variables to match your server.
-Run npm start to start the bot

## How It's Made:

**Tech used:** Javascript, Node.js, Gamedig API, Discord API

The specified Ark server is queried using the Gamedig API every three seconds. The response is sent to the Discord API using the method bot.user.setActivity(${state.players.length} of ${state.maxplayers}), which will display on the Discord side panel. If the bot doesn't receive a response, it shows that the server is offline. The bot waits for a user to input the string '!<server name>'. The '!<server name>' command will trigger another query for the server status, number of players, names of players, server ping, map name, and IP address and post an embedded message in the chat with the response.
## Optimizations
At this point, every time this bot is used for a new server, a new bot has to be created and deployed. To fix this, I will

	- Create a command that lets the discord server admin set a new map name and IP address for their Ark server.
	- Create a database to store Ark server IP with discord guild ID So that a new bot doesn't need to be deployed every time a new Ark server is added.
