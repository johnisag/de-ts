### init project
```npm init -y```

### add typescript only for dev
```npm install --save-dev typescript```

### init typescript project
```npx tsc --init```

### create src folder
```mkdir src```

### create dist folder
```mkdir dist```

### uncomment accordingly in tsconfig.js

### compile code
```npx tsc```

### run compiled code
```node dist/index.js```

### add to package.json
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc --watch"
  }
```

### run code with updated commands
```npm start```

### compile and run ts file
```npx ts-node src/classes.ts```