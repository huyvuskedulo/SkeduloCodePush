yarn react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

cd ios
rm main.zip
zip main.zip ./main.jsbundle ./assets

curl \
  -F "upload=@main.zip" \
  https://codepush-be.herokuapp.com/