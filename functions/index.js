const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.pushNotification = functions.database.ref('Notifications/{userId}/{messageId}').onWrite(( change,context) => {


  const message = change.after.val()
  const userId  = context.params.userId

  const payload = {
        notification: {
          title: message.title,
          body: message.body,
          icon: message.icon,
          click_action: "http://localhost:4200"
        }
      };


   admin.database()
        .ref(`/fcmTokens/${userId}`)
        .once('value')
        .then(token => token.val() )
        .then(userFcmToken => {
          return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
          console.log("Sent Successfully", res);
          return null
        })
        .catch(err => {
          console.log(err);
        });

});

