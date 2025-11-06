# polkadot-api-tutorial

### prerequisite: install [Bun, all-in-one toolkit for developing modern Javascript](https://bun.sh/docs/installation#installing)
```bash
npm install -g bun # the last `npm` command you'll ever need
```

### schaffold empty project
```bash
bun init
```

### To install dependencies:

```bash
bun install
```

### To run:

```bash
bun run index.ts
```

### install PAPI
```bash
bun install polkadot-api
```

### update package.json
```json
{
  ...,
  "scripts": {
    "postinstall": "papi"
  },
  ...
}
```

### Adding Polkadot chain (meta)
```bash
bunx papi add dot -n polkadot
```

### Adding people and collectives parachains
```bash
bunx papi add people -n polkadot_people
bunx papi add collectives -n polkadot_collectives
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
