# WebAssembly Hello, World!

This is a minimal WebAssembly "Hello, World!" example implemented in C for web browsers.
It needs to be compiled with the [NodeJS WebAssembly package](https://www.npmjs.com/package/webassembly).
A WebAssembly capable browser is needed to run the example, e.g. Firefox 52 or later, Chrome 57 or later,
Edge 16 or later, Safari 11 or later.

## Compile and Start without Docker

Requires NodeJS, tested with 8.11.4.

```sh
git clone https://github.com/puzzle/wasm-hello
cd wasm-hello
npm install
npx gulp
```

Then point your browser at http://localhost:8080.

## Compile and Start with Docker

Requires Docker, tested with 1.13.1.

```sh
git clone https://github.com/puzzle/wasm-hello
cd wasm-hello
docker run --rm -it -p 8080:8080 -v `pwd`:/src node:8 /bin/bash
cd /src
npm install
npx gulp
```

Then point your browser at http://localhost:8080.
