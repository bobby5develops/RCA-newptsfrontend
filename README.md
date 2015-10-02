# Content Delivery: newPTSfrontend

TODO!

## Dependencies

- cd-node-utils - shared npm package picked up from internal NPM repository.

## Project Setup

After cloning the repo:

1. Run `npm install` to install node package dependencies
2. Run `bower install` to install UI application dependencies
3. Run `gulp build` to ensure that .tsd files are properly installed.
4. Run `gulp serve` to start the UI.

## Testing

- Run `gulp test` to run all unit tests
- If using a Jet Brains IDE install https://plugins.jetbrains.com/plugin/7287?pr= Karma Plugin.
    - Using the Plugin will not autoWatch the TS files without stopping and starting Karma
- There is no coverage fail at this moment but one will likely be added later.

## Noteworthy Technologies

App/Runtime:

- AngularJS
- TypeScript
- Bootstrap

Env/Build:

- npm
- gulp
- browserify
- Karma
