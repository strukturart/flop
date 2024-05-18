#!/bin/sh 


rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets


rm -rf ./build
mkdir ./build



npm run build


cp ./application/manifest.webapp ./dist/
cp ./application/manifest.webmanifest ./dist/
cp -r ./application/assets/ ./dist/


#create default app zip
cd dist/
mv manifest.webmanifest ../
rm ../build/flop.zip
zip -r ../build/flop.zip ./*
mv  ../manifest.webmanifest ./



#create bHaCkers zip
rm ../build/flop-omnisd.zip
zip -r ../build/application.zip ./*
cd ../build/
mkdir -p flop-omnisd
touch ./flop-omnisd/metadata.json
echo '{ "version": 1, "manifestURL": "app://flop/manifest.webapp" }'  > ./flop-omnisd/metadata.json

cp application.zip flop-omnisd/
cd flop-omnisd/
zip -r ../flop-omnisd.zip ./*
rm -fr ../flop-omnisd
rm ../application.zip

#create KaiOS3 zip
cd ../../
cd dist/
mv manifest.webapp ../
zip -r ../build/flop-kaios3.zip ./*
mv  ../manifest.webapp ./

#create public web version
cd ../



cp ./application/manifest.webapp ./webpage/
cp ./application/manifest.webmanifest ./webpage/
cp -r ./application/assets/ ./webpage/assets/
#todo
exit







