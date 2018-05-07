# react-ts-mobx-app
How to create a React + TypeScript + MobX?<br>
This quick start guide will teach you how to wire up TypeScript with [React](http://facebook.github.io/react/).
By the end, you'll have

* a project with React and TypeScript
* linting with [TSLint](https://github.com/palantir/tslint)
* testing with [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/), and
* state management with [MobX](https://mobx.js.org/)

## Table of Contents

- [Create project with TS](#create-project-with-ts)
  - [install create-react-app](#install-create-react-app)
  - [fix tsconfig.json](#fix-tsconfig.json)
  - [update .gitignore](#update-.gitignore)
  - [yarn build](#yarn-build)
- [Add MobX](#add-mobx)

## Create project with TS

### install create-react-app
```bash
$ npm install -g create-react-app
```

### create a project
```shell
$ create-react-app my-app --scripts-version=react-scripts-ts
$ cd my-app/
```

### fix tsconfig.json
There is a problem with just created project, can't build it with `yarn build` command. Fix of the problem:
```diff
  "compilerOptions": {
+    "baseUrl": "http://localhost",
    "outDir": "build/dist",
```

### update .gitignore
Add some rules for VS Code. Also exclude css files from the repository, it should build authomatically.
```diff
-npm-debug.log*
+# css
+*.css
+
+# yarn
+yarn.lock
+# npm
+package-lock.json
+npm-debug.log*
+
+.vscode/*
+!.vscode/settings.json
+!.vscode/tasks.json
+!.vscode/launch.json
+!.vscode/extensions.json
```

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Add MobX

### add react-app-rewired
```bash
$ yarn add react-app-rewired react-app-rewire-mobx -D
$ yarn add mobx mobx-react mobx-react-router
```

### add config-overrides.js
```
const { injectBabelPlugin } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
  // add a plugin
  config = injectBabelPlugin('babel-plugin-styled-components', config);

  // use the MobX rewire
  config = rewireMobX(config, env);

  return config
}
```

### update package.json
Replace standard commands with react-app-rewired commands.
```diff
  "scripts": {
-   "start": "react-scripts-ts start",
-   "build": "react-scripts-ts build",
+   "start": "BROWSER=none react-app-rewired start --scripts-version react-scripts-ts",
+   "build": "react-app-rewired build --scripts-version react-scripts-ts",
  }
```
