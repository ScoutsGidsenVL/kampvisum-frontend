#!/bin/sh

set -e

echo "================="
echo "Starting frontend"
echo "================="

npm i &&
exec npm run serve