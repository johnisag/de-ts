### create folder
```bash
mkdir my-project-ts
cd my-project-ts
```

### init project
```bash
npm init -y
```

### add dependencies
```bash
npm install --D typescript ts-node-dev @types/node @types/express
npm express install
```

### init the ts
```bash
npx tsc --init
```

### setup tsconfig.json
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "target": "es2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "types": ["node"],
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### create src\, dist\, src\index.ts

### update package.json
```json
    ...
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
    ...
```

### build and run
```bash
npx tsc
node dist/app.js
```