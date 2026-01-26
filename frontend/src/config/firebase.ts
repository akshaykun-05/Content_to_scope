import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Demo Firebase configuration that works for development
// In production, replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "demo-api-key-for-contentoscope",
  authDomain: "contentoscope-demo.firebaseapp.com",
  projectId: "contentoscope-demo",
  storageBucket: "contentoscope-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo-app-id"
}

// Initialize Firebase
let app
let auth
let db
let googleProvider

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })
} catch (error) {
  console.warn('Firebase initialization failed, using demo mode:', error)
  // Firebase will fail with demo config, but we'll handle this gracefully
}

export { auth, db, googleProvider }
export default app