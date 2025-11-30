import firebaseAdmin from "firebase-admin";
import serviceAccount from "../constant/librarymanagement.json"; // tsconfig.json must allow "resolveJsonModule": true

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount as firebaseAdmin.ServiceAccount),
});

export default firebaseAdmin;