#!/bin/sh

rm -rf ./dist

./node_modules/.bin/parcel serve \
  --port 8080 \
  --hmr-port 8081 \
  ./src/ui/web/index.html ./src/ui/web/worker.js
