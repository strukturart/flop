#!/bin/sh 
rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets
cp ./application/manifest.webapp ./dist/
cp -r ./application/assets/ ./dist/
parcel build --no-source-maps  --no-cache --public-url ./ application/index.html 

#!/bin/bash
#create default app zip
cd dist/
rm ../build/watermelon.zip
zip -r ../build/watermelon.zip ./*


#create bHaCkers zip
rm ../build/watermelon-omnisd.zip
zip -r ../build/application.zip ./*
cd ../build/
mkdir -p watermelon-omnisd
touch ./watermelon-omnisd/metadata.json
echo '{ "version": 1, "manifestURL": "app://watermelon/manifest.webapp" }'  > ./watermelon-omnisd/metadata.json

cp application.zip watermelon-omnisd/
cd watermelon-omnisd/
zip -r ../watermelon-omnisd.zip ./*
rm -fr ../watermelon-omnisd
rm ../application.zip


#github page
cd ../..
rm -fr ./docs
mkdir docs
cp -r ./dist/* ./docs/
exit






