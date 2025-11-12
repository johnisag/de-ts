### init project
```bash
npm init -y
```

### add typescript, node types and winston (logging)
```bash
npm install --save-dev typescript @types/node
npm install winston
```

### init the ts
```bash
npx tsc --init
```

### setup tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"],
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### create src\, dist\, src\app.ts, src\logger.ts

### build and run
```bash
npx tsc
node dist/app.js
```