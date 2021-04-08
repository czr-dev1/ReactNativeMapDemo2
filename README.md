# the arqive Mobile Application
## Install Expo CLI
Requirements: 

`Node.js, Git, Expo` 

To install Expo:

`npm install --global expo-cli`

## Run Development Server: 
First enter `expo install` to get install all of the required dependancies
* `npm install` works as well, 
* however installing it through expo would be the better option, `npm` can install the incompatible versions where as `expo` will install the better versions.

Then `expo start`
* `npm run android` will attempt to run it on a connected Android device immediatly
* You need to have the Expo app installed for it to run on your phone

## Other Info
`app` folder contains important files

`package.json` includes React Native dependencies needed for app

`expo build` starts compiling the app for production 
 * `expo build:android` compiles specifically for Android
 * Note that compiling takes around 30ish minutes

Expo is like a compatibility layer that makes it easier to develop React Native Apps.
It is not a replacement or something entirely  different, it is in addition you could say.
