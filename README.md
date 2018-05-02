# testApp

A RESTful node.js and express app that manipulates data from a third party API. 

## Authors

Alicia

## Built with

* node.js
* express
* node package manager (npm)
* jade

more details to come...

## Development Process

* [1. Concept](#1-concept)
* [2. Process](#2-process)
* [3. Challenges and Successes!](#3-challenges-and-successes)
* [4. Future Additions](#4-future-additions)

### 1. Concept

Our first task is to show a list of People records that are available via the SalesLoft API.  Display each Person’s name, email address, and job title. 

### 2. Process


To get setup, I  installed [node.js](https://nodejs.org/en/) and the node package manager better known as npm. Then I installed Express Generator with `npm install -g express-generator`. To create the project `testApp` I type `express testApp`. 
 
 
 Work is still in progress.. Currently, you can go to [http://localhost:3000/people/peoplelist](http://localhost:3000/people/peoplelist) to see several records of people. 
 
### 3. Challenges and successes

- It took a few moments for me to realize that I could not or should not use the API key as a uri query parameter. Thankfully, I used [Postman](https://www.getpostman.com/), an API development environment, to play around with different GET requests before building the app. 

### 4. Future additions

Details coming soon!