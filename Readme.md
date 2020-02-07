# Hospitality Message Generator

## Description
_Duration: 6-hour sprint_

Hospitality Message Generator is a web application that allows the user to choose from a list of guests, companies and message types to generate a message template ideal for guest service.

## Prerequisites

Before you get started with this on your local computer, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- and IDE like Notepad ++ or VS code

## Steps
1. Git Clone
2. NPM Install
3. Run NPM start in the code directory on the command line.
4. Open your browser to localhost:3000 local server

OR

- visit the deployed version [here](https://hospitality-message-generator.herokuapp.com/).

## Making the application
- I chose to use Javascript mostly because it is the language that I have worked with the most. I am currently working my way through a course on Java, but in trying to work my way through this project, I got caught up on a few things, like how to parse JSON files or typecasting the parsed values to allow me to manipulate them more easily. A week or two from now I think I would be able to do this challenge in Java. 

For the front end I chose to use jQuery. Although I am more comfortable in React, it is hefty for this situation of a single page app, so I chose to use jQuery for a more lightweight approach.

Considering that OOP is a large focus of this project, I tried to stress principles of OOP. For example my variables were only called in local scope of my functions unless global was necessary (Encapsulation). I also try to write functions that are reusable under different circumstances, like the appendInfo function in client.js to avoid redundancy. 

I decided to add two more JSON files, one called Greetings.json, which is a set of objects each with different greetings, as well as unique start and end times, which are used to choose a greeting based on the time of day. When the Ajax request is made to retrieve the information for DOM display from the server, I get the current timestamp and extract the current hour from that. I also account for the different timezones of the hotels, then choose a greeting based on the local time of the hotel.

When the browser loads the application, there are separate GET requests made for all guests, hotels, and message types. This allows the user to choose any combination of message for the displaying, although in a real situation, the hotel would be autofilled based on the client. Once all three options are chosen, the Ajax call to retrieve the relevant information from the server is made and displayed.

## Testing
- Since my project was was connected to the front-end I made use of a mix of using Postman for server side requests to test their functionality, debugging in the browser/ in my IDE (VS code), and making use of console logs to test what my responses were. 

## Built With
- _node.js_
- _Express.js_
- _jQuery_

## Where to go from here
- I would like to create a POST route to allow users to create new templates that post to the templates.json file, allowing users to expand the use cases of the application.
- 

---