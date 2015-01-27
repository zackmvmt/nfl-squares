# Simple Node Boilerplate - ZSTIX
A barebones setup used to quickly get ideas up and running.

## Setup
  1. Clone the repository.
  2. Update the `package.json` file to reflect the name of your project.
  3. Delete the original remote. Create a repository if needed.

## Launching to Heroku
  1. Create a new app: `heroku apps:create nameofyourapp`.
  2. Just in case, make sure there is at least one dyno: `heroku ps:scale web=1`.
  3. Push it up to Heroku: `git push heroku master`.
  4. Check it out!

## Working with Files / Local Development
  1. Run `gulp` in the directory.
  2. Thats it!
    - Gulp will convert, concat, and minify all SCSS and JS.
    - The server will restart with any changes to back-end JS.
    - Front-end JS will be linted and any errors are reported in the console.

## TODO
  - Create an example / documentation for DB calls (if needed).
  - Add in a testing platform.
  - Create a _very_ basic stylesheet for prototypes.