# WalAuth

WalAuth is a simple authentication app built with Node.js and Express. It asks the user to register or log in by entering their email and password.
Scroll down to "Set Up" for instructions on how to get this application on your local machine.

## Endpoints
- `/` routes to the homepage
- `/dashboard` is a protected route that routes to the dashboard only after a user is logged in
- `/users/login` routes to a login page
- `/users/register` routes to a register page
- '`users/logout` logs the user out and redirects to the login page

## Features
- Form validation
- Styling with Bootswatch

## Libraries used
- mongoose
- passport
- ejs
- bcryptjs
- connect-flash
- express-ejs-layouts
- express-session

## Set up
1. Clone this respository to your local machine `git clone https://github.com/christineyoo/walauth.git`
2. `cd` into the cloned repository
3. Install the node dependencies with `npm install`
4. Start the application `npm start`
