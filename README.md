# react-ts-mobx-app
How to create a React + TypeScript + MobX?
This quick start guide will teach you how to wire up TypeScript with [React](http://facebook.github.io/react/).
By the end, you'll have

* a project with React and TypeScript
* linting with [TSLint](https://github.com/palantir/tslint)
* testing with [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/), and
* state management with [MobX](https://mobx.js.org/)

## initial work

### установить create-react-app
```bash
$ npm install -g create-react-app
```

### создать проект
```shell
$ create-react-app my-app --scripts-version=react-scripts-ts
$ cd my-app/
```

### фиксим tsconfig.json
Как оказалось есть проблема с вновь созданным проектом, запустив `yarn build` он не собирается. Фиксим проблему:
```diff
  "compilerOptions": {
+    "baseUrl": "http://localhost",
    "outDir": "build/dist",
```

### обновляем .gitignore
```diff
-npm-debug.log*
+# css
+*.css
+
+# yarn
+yarn.lock
yarn-debug.log*
yarn-error.log*

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

### добавить пакеты
```
$ yarn add react-app-rewired awesome-typescript-loader babel-core babel-plugin-import babel-preset-react-app -D
```

### добавить config-overrides.js
```
module.exports = function override(config, env) {
  const tsLoader = config.module.rules.find(conf => {
    return conf.loader && conf.loader.includes('ts-loader')
  })
  tsLoader.loader = require.resolve('awesome-typescript-loader')
  tsLoader.query = {
    useBabel: true,
  }

  const tsLintLoader = config.module.rules.find(conf => {
    return conf.loader && conf.loader.includes('tslint-loader')
  })
  tsLintLoader.options = tsLintLoader.options || {}
  // FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
  tsLintLoader.options.typeCheck = true

  const path = require('path')
  // For import with absolute path
  config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules)

  return config
}
```

### изменить package.json
Код подключает враппер react-app-rewired
```diff
  "scripts": {
-   "start": "react-scripts-ts start",
-   "build": "react-scripts-ts build",
+   "start": "BROWSER=none react-app-rewired start --scripts-version react-scripts-ts",
+   "build": "react-app-rewired build --scripts-version react-scripts-ts",
  }
```
