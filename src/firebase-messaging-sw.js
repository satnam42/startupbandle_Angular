importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyAIakfchuhqr1IwRLtJkB7ykusBdWxwspc",
    authDomain: "startupbundle-ce267.firebaseapp.com",
    projectId: "startupbundle-ce267",
    storageBucket: "startupbundle-ce267.appspot.com",
    messagingSenderId: "556355096127",
    appId: "1:556355096127:web:9d08384a7e00bb2bf6f28a"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(); 