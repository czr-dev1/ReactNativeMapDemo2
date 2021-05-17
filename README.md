# The arqive Mobile Application
## Install Expo CLI
### Requirements: 

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

### Deploying to Google Play Store
* Compile Application
  * `expo build:android`
  * Select the `apk` option
  * It will give you a link to track the progress, download the APK from there when it is done running
* Submit to Google Play Store 
  * Several ways of Submitting
  * Open, Closed, Internal, Production, all under the `Releases` menu in the developers console
  * All of the options have a similar format
  1. Select `Create new release` on the top right corner for the specific release format
  2. Upload the APK that you downloaded earlier (You also have the option of selecting an APK you had previously uploaded)
  3. Write your release notes/name
  4. Click `Save` on the bottom right hand side
  5. Now you should be in the `Review and release` part
  6. Here you can start rolling out the application
* Rolling out to testing can be really quick, a matter of minutes to hours
* Rolling out into production can take longer, there is no real set time for either however
* [I found this video to be super helpful](https://youtu.be/2Y-8XVdhuCA?t=709)
* VERY IMPORTANT NOTE in app.json there is a version code in `expo.android.versionCode` make sure you BUMP it up a number otherwise the Play Store WILL complain and you'll have to recompile, the `expo.version` code isn't really all that useful in the case for android

### Deploying to Apple App Store
* Compile Application
  * In Terminal, make sure you are in the root directory of the project
  * Run `expo build:ios`
  * (Note: For first time build, you will be prompted to log into an Expo account.)
  * Select the `archive` option 
  * You will then be prompted to log into the Apple Developer account
  * It will give you a link to track the progress, download the file from there when it is done building
* Submit to Apple App Store 
  * Download `Transporter` app and log in using Apple Developer account
  * Drag/Upload `.ipa` file to Transporter, then deliver
  * Once you are logged into App Store Connect
  1. Click on My Apps -> The arqive -> TestFlight
  2. Find the correct version and current build number
  3. Manage Compliance and select no
  4. Go back to App Store, scroll down to `Build` section, remove old version and select newest build
  5. It is required to fill in the `What's New in This Version` section
  6. Save and it should be ready to `Submit for Review`
* Note: you can test the beta version of the app in TestFlight before submitting to the App Store
* Rolling out into production can take longer, there is no real set time for either however
* VERY IMPORTANT NOTE in app.json there is a version code in `expo.ios.buildNumber` make sure you BUMP it up a number otherwise the App Store WILL complain and you'll have to recompile, the `expo.version` code isn't really all that useful in the case for android
