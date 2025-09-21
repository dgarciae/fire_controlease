import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(config);

const getFirebaseFunctions = (region?: string) =>
  region ? getFunctions(app, region) : getFunctions(app);

export const firebaseAuth = getAuth(app);

export const firebaseFunctions = getFirebaseFunctions(
  import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION
);

if (import.meta.env.VITE_DEV) {
  void (async () => {
    try {
      const [
        { connectAuthEmulator },
        { connectFunctionsEmulator },
        { connectFirestoreEmulator, getFirestore },
      ] = await Promise.all([
        import("firebase/auth"),
        import("firebase/functions"),
        import("firebase/firestore"),
      ]);

      connectAuthEmulator(firebaseAuth, "http://localhost:9099");
      connectFunctionsEmulator(getFunctions(app), "localhost", 5001);

      const db = getFirestore(app);
      connectFirestoreEmulator(db, "localhost", 8080);
    } catch (err) {
      console.warn("Error conectando emuladores Firebase:", err);
    }
  })();
}
