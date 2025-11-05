### init project
```npm init -y```

### add typescript only for dev
```npm install esbuild typescript --save-dev```

### init typescript project
```npx tsc --init```

### create src folder
```mkdir src```

### update tsconfig.json
```json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "esnext",
    "strict": true,
    "jsx": "preserve",
  },
  "include": ["src"]
}
```

### create src/index.ts
```ts
document.body.innerHTML = '<h1>Hello, TypeScript with esbuild dude!</h1>';
```

### build and bundle
```shell
npx esbuild src/index.ts --bundle --outfile=dist/bundle.js
```

### create dist/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>esbuild TypeScript Example</title>
</head>
<body>
    <script src="bundle.js"></script>
</body>
</html>
```

### run local server
```shell
npx http-server dist
```

### navigate to 
```shell
http://127.0.0.1:8080/index
```

