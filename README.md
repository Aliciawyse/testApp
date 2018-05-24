# testApp

A RESTful node.js and express app that manipulates data from the SalesLoft API. 

## Authors

Alicia

## Built with

* javaScript ES5
* jQuery
* validate.js
* node.js
* express
* node package manager (npm)
* jade
* HTML5/CSS3
* bulma

## Development Process

* [1. Assignment](#1-assignment)
* [2. Process](#2-process)
* [3. Challenges and Successes!](#3-challenges-and-successes)
* [4. Future Additions](#4-future-additions)
* [5. Key concepts covered](#5-key-concepts-covered)

### 1. Assignment

Level 1: Show a list of People records that are available via the API.  Display each Person’s name, email address, and job title.

Level 2: Create a button that, when clicked, displays a frequency count of all the unique characters in all the email addresses of all the People you have access to, sorted by frequency count (the count below).

Level 3:  Create a 2nd button that would show us a list of suggested possible duplicate People.  A human can tell that “benoliv@salesloft.com” and “benolive@salesloft.com” are very likely the same person with just one of the email addresses having a typo.  However we would like you to decide what might constitute a duplicate - up to you.

### 2. Process

To get setup, I  installed [node.js](https://nodejs.org/en/) and node package manager (npm). Then I installed Express Generator with `npm install -g express-generator`. Next, I type `express testApp` to create a skeleton app called testApp. In the `testApp` directory, I type `npm install` to install all of the dependencies in `package.json`. 

A template engine called Jade comes with using express generator. My base template is `views\layout.jade`. In the base template I include: Bulma, my css stylesheet, jQuery and an external script file called `global.js`.
 
 This base template is the most basic template that I extend on every page of my app. For example, I extend `layout.jade` in `views\index.jade` which is where most of the app's look is built.


The file `app.js` is the heart of this skeleton app. This is where express is set up. 

Static files in `/public/javascripts` and  `/public/stylesheets` help provide some interactivity on the website and style. 

 
Side note: You can go to [http://localhost:3000/people/peoplelist](http://localhost:3000/people/peoplelist) to see the JSON output that we'll manipulate.
 
### 3. Challenges and successes

- It took a few moments for me to realize that I could not or should not use the API key as a uri query parameter. Thankfully, I used [Postman](https://www.getpostman.com/), an API development environment, to play around with different GET requests before building the app. 

- At first, in `routes/people.js` I used `res.render` to output JSON to the `people.jade` template. When I moved on to Level Two, I realized that, with my current set up, I would have to make another GET request. That seemed repetitive. Using `res.json` allows me to make one GET request and use its JSON response elsewhere in my app. 

- A major challenge was thinking of an approach to level 3. But, that was until I came across a very helpful example in [Cracking the Coding Interview](http://www.crackingthecodinginterview.com/). The book's One Away example offers a guide for checking if two strings are more than one edit or zero edits away. I figured this was a great starting point for checking for duplicates. 

- Writing code to accomplish the level 1, 2 and 3 tasks is one thing. But the way I have written the code makes it difficult to test.

- Understanding how to reduce pollution of the global namespace

- inability to submit the form programmatically without using a synthetic event.


### 4. Future additions

- refactor to make more modular and avoid polluting global space. 
- separate event handlers from the action it performs so that I can make the logic testable
- add tests 
- avoid repeating code in `global.js`
- use javaScript ES6

### 5. Key concenpts covered

- What is an API? An Application Programming Interface (API) offers a set of pre-defined routines, code snippets, and tools for building software applications. The SalesLoft API parses URL parameters to provide specific JSON

- JSON: stands for Javascript Object Notation and is a lightweight data-interchange format used to correlate keys with values

- jQuery: a JavaScript Library that makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API 

- AJAX: a jquery method to retrieve data that stands for Asynchronous JavaScript And XML.

- What two parameters do we pass into AJAX to retrieve data from online? `url` and `method:GET`

- What is a “server”? A web server takes a client request and gives something back

- What is a web client? Web client lets the user request something on the server and then shows the result (response) of the server.

- What is HTTP? Clients and Servers communicate back and forth using a series of understood communications defined by HTTP / HTTPs. 

- What is NodeJS? An open-source, cross-platform, runtime environment that allows developers to create all kinds of server-side tools

- What is a runtime environment? 

- What is Express? A Node module that used in this project to start a server, respond to requests, set up routes, use a view engine.

- What is Middleware? software that lies between an operating system and the applications running on it. 

- What is full stack web development? the concept of building every aspect of the web application – from the visuals and interactions, to the data transfer and processing. In modern web applications there is a constant back-and-forth communication between the visuals displayed on the user’s browser (frontend) and the data and logic stored on the server (backend).


