### init project
```npm init -y```

### add typescript only for dev
```npm install typescript --save-dev```

### init typescript project
```npx tsc --init```

### update package.json
```json
{
  ...
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "start": "node dist/main.js"
  },
  ...
}
```

### update tsconfig.json
```json
{
  "compilerOptions": {
    "outDir": "./dist",
  ...
  }
}
```

### create greet.ts, math.ts, main.ts

### build
```shell
npx tsc
```

### run
```shell
npm start
```
