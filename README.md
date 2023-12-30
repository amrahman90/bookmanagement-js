# Book Management app Cleint side & Simple JSON file as server side

A simple html & js app for managing book with Title name, Author name and Date of Publication information

Gradualy the goal is to build an application with Cover images of the books with more features.

## Structure

- html/css for main layout
- js (dhtml) to generate book table dynamically
- static json files for mocking API [api/*.json](api/list.json)

## Running the app

- Go to the project directory folder
- Double click on index.html file
- Add the Book name, Author name and Date of publication data in the form layout
- Click on the Save icon to save the local data on browser 
- After adding successfully the data we can use the search bar in the top navigation bar to search for the books in the list

## Project Development Plan

- 1st Step (simple working prototype)
    We will make a working prototype with HTML5, CSS and JavaScript tech stack with search functionality, CRUD (create, read, update and delete) features, simple API as JSON format files and also find a creative UI/UX layout for final version
- 2nd Step (advanced part with design)
    When we have the prototype done, then we will move to the next part with Angular or React JS framework.
    For "Mobile First" layout, we will use Bootstrap with Angular or React JS or we can use Material Card design layout integrated with Angular or React JS framework. 
    For Backend part, we can use 3rd party API service providers like Google Books API (https://developers.google.com/books) or Good Reads API (https://www.goodreads.com/api)
    For note, these API services need creating an account or paid service with free using usage capacity.
- 3rd Step
    We will make TDD (Test Driven Development) approach here from the 2nd Step.
    The codes are easily transferable from 1st Step to 2nd Step so we will put focus on testing part and also security or encryption (for the API Keys and backend side)