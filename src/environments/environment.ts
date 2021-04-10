// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: "AIzaSyCcp7Xhk7PSqH4aYYkAZSm-1dqiV-6MoQ8",
  authDomain: "radio-plays.firebaseapp.com",
  databaseURL: "https://radio-plays-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "radio-plays",
  storageBucket: "radio-plays.appspot.com",
  messagingSenderId: "626107947514",
  appId: "1:626107947514:web:c60ee190fa7c05615b2c43"
};

const firebaseSettings = {
  key: "AIzaSyCcp7Xhk7PSqH4aYYkAZSm-1dqiV-6MoQ8",
  url: "https://identitytoolkit.googleapis.com/v1/"
}

export const environment = {
  production: false,
  firebase: firebaseConfig,
  firebaseSettings
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
