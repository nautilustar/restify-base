#!/bin/bash

# docker start mongodb
# MONGODB_HOST=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' mongodb)

PATH=$(pwd)/node_modules/.bin:$PATH \
NODE_ENV=${NODE_ENV:development} \
MONGODB_URL="mongodb://localhost:27017/" \
nodemon --watch src
