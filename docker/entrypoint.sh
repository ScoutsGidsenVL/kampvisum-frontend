#!/bin/sh

set -e

echo "Starting frontend"
npm i && 
npm link ./vue-3-component-library &&
exec npm run serve