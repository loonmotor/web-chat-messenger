# Web Chat Messenger

## System requirements
* MongoDB installed at default port
* Redis installed at default port
* I am using NodeJS version 6.9.2

## To run app
* In terminal, ***cd*** to **web-chat-messenger** folder
* Run ***npm install***
* Run ***npm start***
* In browser, navigate to **http://localhost:3000**

## To run app using custom configuration
* In terminal, ***cd*** to **web-chat-messenger** folder
* Run ***npm install***
* Run ***node server.js --port 3000 --mongoUrl mongodb://127.0.0.1:27017/chat***
* port **3000** and **mongodb://127.0.0.1:27017/chat** are the default values
* Remember to change WebSocket url in [client.js](client.js) (default url is **http://localhost:3000**) to match the port, , then run ***npm run build***
* In browser, navigate to **http://localhost:3000**

## Use cases & Features
#### Sign in screen
* User can sign in via Facebook

#### Users panel
* User can see a list of other signed in users, including himself, categorized by Active and Idle
* User can identify himself with a **(me)** label appended to his name
* Users are arranged alphabetically, in both Active and Idle sections

#### Chats panel

* User can see the history of chat on load
* User can see his own messages (in blue card panels)
* User can see other users' messages (in teal card panels)
* If chats panel is currently scrolled to the bottom, it will scroll down automatically when there are new messages
* If chats panel is not at the bottom, user will be notified of incoming messages by a toast

#### Message input panel

* User can type in a message
* User can hit Enter to send a message
* User can click the Send button to send a message
* Blank message will not be sent

## Code walkthrough
* [server.js](server.js) : contains back-end related code, to setup http and WebSocket servers


* [client.js](client.js) : contains entry code to render root React component


* [handlers/socket-events-handler.js](handlers/socket-events-handler.js) : encapsulates WebSocket's event handlers


* [package.json](package.json) : Contains a list of project's dependencies and build script command


* [webpack.config.js](webpack.config.js) : Contains Webpack configuration


* [.babelrc](.babelrc) : Contains Babel configuration


* [gulpfile.js](gulpfile.js) : contains automation related code, to run SASS compilation


* [react/](react/) : contains all code related to React components and Redux


* [public/](public/) : contains all built static content


* [sass/](sass/) : contains style related files