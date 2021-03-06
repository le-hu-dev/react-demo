import app from "firebase/app"
import "firebase/auth"
import "firebase/database"

const config = {
  apiKey: "AIzaSyAtFXxXgbJpQhZuDYXF85PIPD5KDJ1Lbr8",
  authDomain: "reactfirebase-d2187.firebaseapp.com",
  databaseURL: "https://reactfirebase-d2187.firebaseio.com",
  projectId: "reactfirebase-d2187",
  storageBucket: "reactfirebase-d2187.appspot.com",
  messagingSenderId: "776649235894"
}

// Alternative for BitBucket or GitHub
// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
// };

class Firebase {
  constructor() {
    app.initializeApp(config)

    // Helper
    this.serverValue = app.database.ServerValue
    this.emailAuthProvider = app.auth.EmailAuthProvider

    // Firebase APIs
    this.auth = app.auth()
    this.db = app.database()

    // Social Sign In Method Provider
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.twitterProvider = new app.auth.TwitterAuthProvider()
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      // url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
      url: "https://98j5qwp3p.codesandbox.io"
    })

  // Merge Auth and DB User API
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val()

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = []
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            }

            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // User API
  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref("users")

  // Message API
  message = uid => this.db.ref(`messages/${uid}`)

  messages = () => this.db.ref("messages")

  // Todo API
  todo = uid => this.db.ref(`todos/${uid}`)

  todos = () => this.db.ref("todos")
}

export default Firebase
