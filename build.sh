#!/bin/bash

# ######################
# CLIENT
# ######################

echo "BUILDING CLIENT"

# create build dir
rm -rf "dist/client"
mkdir -p "./dist/client"

# generate page
php index.php > "./dist/client/index.html"

# copy assets
cp -R inc ./dist/client/inc

echo "CLIENT BUILD"

#######################
# SERVER
#######################

echo "BUILDING SERVER"

# create build dir
rm -rf "dist/server"
mkdir -p "./dist/server"

# copy code
cp -R server ./dist

echo "SERVER BUILD"