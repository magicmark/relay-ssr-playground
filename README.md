# relay-ssr-playground

A demo for doing React SSR + Relay GraphQL.

This repo contains:

- a frontend react application
- an express web server to serve the application and do (partial) SSR

We also do two webpack builds:

- to bundle the react app for the browser
- to bundle the react app for node, so it can be read in express and do SSR

### Trying it out

```
git clone https://github.com/magicmark/relay-ssr-playground.git
cd relay-ssr-playground
yarn
yarn relay
yarn start
```

Then go to localhost:3010