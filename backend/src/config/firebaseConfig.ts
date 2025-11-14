import firebaseAdmin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON!);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default firebaseAdmin;
