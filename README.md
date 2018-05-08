# testApp

A RESTful node.js and express app that manipulates data from the SalesLoft API. 

## Authors

Alicia

## Built with

* javaScript ES5
* jQuery
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

### 1. Assignment

Level 1: Show a list of People records that are available via the API.  Display each Person’s name, email address, and job title.

Level 2: Create a button that, when clicked, displays a frequency count of all the unique characters in all the email addresses of all the People you have access to, sorted by frequency count (the count below).

Level 3:  Create a 2nd button that would show us a list of suggested possible duplicate People.  A human can tell that “benoliv@salesloft.com” and “benolive@salesloft.com” are very likely the same person with just one of the email addresses having a typo.  However we would like you to decide what might constitute a duplicate - up to you.

### 2. Process

To get setup, I  installed [node.js](https://nodejs.org/en/) and node package manager (npm). Then I installed Express Generator with `npm install -g express-generator`. Next, I type `express testApp` to create a skeleton app. In the `testApp` directory, I type `npm install` to install all of the dependencies in `package.json`. 

The file `app.js` is the heart of this skeleton app. This is where express is set up. 

Express supports a template engine called Jade. My base template is `views\layout.jade`. A base template is the most basic template that I extend on every page of my website. Taking advantage of my base template, I extend it and create `views\index.jade`. 

Static files in `/public/javascripts` and  `/public/stylesheets` help provide some interactivity on the website and style. 
 
Side note: You can go to [http://localhost:3000/people/peoplelist](http://localhost:3000/people/peoplelist) to see the JSON output that we'll manipulate.
 
### 3. Challenges and successes

- It took a few moments for me to realize that I could not or should not use the API key as a uri query parameter. Thankfully, I used [Postman](https://www.getpostman.com/), an API development environment, to play around with different GET requests before building the app. 

- At first, in `routes/people.js` I used `res.render` to output JSON to the `people.jade` template. When I moved on to Level Two, I realized that, with my current set up, I would have to make another GET request. That seemed repetitive. Using `res.json` allows me to make one GET request and use its JSON response elsewhere in my app. 

- A major challenge was thinking of an approach to level 3. But, that was until I came across a very helpful example in [Cracking the Coding Interview](http://www.crackingthecodinginterview.com/). The book's One Away example offers a guide for checking if two strings are more than one edit or zero edits away. I figured this was a great starting point for checking for duplicates. 


### 4. Future additions

- Improve the way results display
- Add tests 
- Improve code in `global.js` to avoid repeating code
- Use javaScript ES6