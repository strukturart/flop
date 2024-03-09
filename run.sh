#!/bin/sh 
rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets
cp ./application/manifest.webapp ./dist/
cp -r ./application/assets/ ./dist/
parcel 
exit
