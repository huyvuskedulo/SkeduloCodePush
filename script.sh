yarn react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

tar -czvf archive.tar.gz -C ios ./main.jsbundle ./assets

curl \
  -F "upload=@archive.tar.gz" \
  https://codepush-be.herokuapp.com/