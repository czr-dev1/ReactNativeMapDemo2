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
