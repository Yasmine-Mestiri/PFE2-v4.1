importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyC0KVikNY9KxB5vQzI0lDWEgpKQhBUlhLo",
    authDomain: "basetest-5e577.firebaseapp.com",
    databaseURL: "https://basetest-5e577.firebaseio.com",
    projectId: "basetest-5e577",
    storageBucket: "basetest-5e577.appspot.com",
    messagingSenderId: "646943490296"
});

const messaging = firebase.messaging(); 
messaging.setBackgroundMessageHandler(function(payload) {
  const title = payload.data.title;
   const option = {              
     body: payload.data.message 
      
     }  
        return self.registration.showNotification(title,option);
       });