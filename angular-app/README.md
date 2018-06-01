# Ion Application

ION Application is the application build for ION Group.
Technologies used in the application:
1. AngularJS (1.7): Framework used to build the application
2. JavaScript (ES6)
3. CSS3
4. HTML
5. ExpressJS: NodeJS Server to build the backend of the application.

## STEPS TO COMPILE THE APPLICATION. ##
```shell
$ npm install
$ npm start
```
Then open http://localhost:3000/#!/ on your browser.

The application currently does not uses any database to get the users, so it
supports only 2 dummy users, as follows:
1. username: user1
   password: user1@123
2. username: user2
   password: user2@123

The application has 2 pages currently:
--Home page
--Dashboard page

Routing between these two pages is done using UI-Router which supports nested
state routing.
