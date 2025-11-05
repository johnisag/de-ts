### init project
```shell
npm init -y
```

### add dependecies
```shell
npm i -D typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin fork-ts-checker-webpack-plugin
```

### init typescript project
```shell
npx tsc --init
```

### create src folder
```shell
mkdir src
```

### create index.html
```shell
touch index.html
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack TypeScript Setup</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### create index.ts
```shell
touch index.ts
```

```ts
document.getElementById('app')!.textContent = 'Hello, TypeScript with Webpack!';
```

### update package.json
```json
...
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  },
...
```

### create webpack.config.js
```shell
touch webpack.config.ts
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: { open: true, port: 3000 },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};

```

### create webpack.config.js
```shell
npm run start
```