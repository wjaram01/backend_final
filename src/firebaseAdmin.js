import admin from "firebase-admin"

var serviceAccount = require("../vue-app-46df5-firebase-adminsdk-fs2qy-83b937bc1f.json");

export const fire_admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vue-app-46df5-default-rtdb.firebaseio.com"
});