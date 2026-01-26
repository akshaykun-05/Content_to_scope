# 🔥 Firebase Setup for ContentScope

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it: `contentoscope-app-2024`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Click **Google** provider
5. **Enable** Google sign-in
6. Set **Project support email** to your email
7. Add **Authorized domains**:
   - `localhost` (for development)
   - `d3cjsi1eug3qxk.cloudfront.net` (your production domain)
8. Click **Save**

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** → **Project settings**
2. Scroll down to **Your apps**
3. Click **Web app** icon (`</>`)
4. Register app name: `ContentScope`
5. **Copy the firebaseConfig object**

## Step 4: Update Frontend Configuration

Replace the content in `frontend/src/config/firebase.ts` with:

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your Firebase configuration (replace with actual values from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "contentoscope-app-2024.firebaseapp.com",
  projectId: "contentoscope-app-2024",
  storageBucket: "contentoscope-app-2024.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export default app
```

## Step 5: Rebuild and Deploy

After updating the Firebase config:

```bash
cd frontend
npm run build
cd ../infrastructure
npx cdk deploy --require-approval never
```

## Current Status (Temporary)

For now, the app uses a **development authentication system** that:
- ✅ Works with any Google account
- ✅ Creates unique user IDs for each user
- ✅ Tracks individual user progress
- ✅ Shows empty dashboard until content is analyzed
- ✅ Provides real user experience

**Each user gets their own:**
- Unique user ID
- Personal progress tracking
- Individual streak counters
- Separate analysis history
- Personal achievement progress

## What Works Right Now

🌐 **Visit**: https://d3cjsi1eug3qxk.cloudfront.net

✅ **Authentication**: Click "Continue with Google" (works with any Google account)
✅ **Empty Dashboard**: Shows "No Analysis Yet" until you analyze content
✅ **User Tracking**: Each user gets individual progress tracking
✅ **Learning Insights**: Shows welcome screen for new users
✅ **Content Analysis**: Full analysis with user progress updates

The app is fully functional for testing all features!