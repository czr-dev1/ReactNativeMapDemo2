# the arqive Mobile Application
## Install Expo CLI
Requirements: 

Node.js, Git, Expo

To install Expo:

```sh
npm install --global expo-cli
```

Alternatively, expo has already been installed as a dev dependency for this project, so `node node_modules/expo-cli/bin/expo.js` can be used in place of `expo` in commands after running `npm ci`.

## Run Development Server: 
First enter `npm ci` to get install all of the required dependancies
* `expo install` works as well, however it modifies package.json and package-lock.json and could potentially cause merge conflicts. Use `expo install` for new dependencies

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
It is not a replacement or something entirely different, it is in addition you could say.
