# RegisterExample
Ionic 4 Firebase Authentication Example#1: Registration

須修改src/environments/environment.ts檔內容。在Firebase平台建立專案，將專案內建立網頁應用程式的參數值取代下列firbaseConfig參數值：

<pre><code>
  export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    authDomain: '專案id.firebaseapp.com',
    databaseURL: 'https://專案id.firebaseio.com',
    projectId: '專案id',
    storageBucket: '專案id.appspot.com',
    messagingSenderId: 'XXXXXXXXXXXX'
  }
};
 </code></pre>
