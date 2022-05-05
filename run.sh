#!/bin/sh 
rm -rf ./dist
mkdir ./dist
cp ./application/manifest.webapp ./dist/
cp ./application/assets/* ./dist/assets/
parcel ./application/index.html --no-source-maps  --no-cache