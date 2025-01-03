#!/bin/bash

# Clean and prepare directories
rm -rf ./dist ./build
mkdir -p ./dist/assets ./build

# Build the application
npm run build

# Copy manifest files to the distribution directory
cp ./application/manifest.webapp ./dist/
cp ./application/manifest.webmanifest ./dist/

# Create default app ZIP
cd ./dist
mv manifest.webmanifest ../
rm -f ../build/flop.zip
zip -r ../build/flop.zip ./*
mv ../manifest.webmanifest ./

# Create KaiOS 3.0 app ZIP
mv manifest.webapp ../
zip -r ../build/flop-kaios3.zip ./*
mv ../manifest.webapp ./

exit

