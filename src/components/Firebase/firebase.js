import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import API from "../../api";

const moment = require("moment");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.firestore = app.firestore();
    this.storageRef = app.storage().ref();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.provider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((doc) => {
            var data = doc.data();
            // default empty roles
            if (!data.roles) {
              data.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              username: authUser.username,
              email: authUser.email,
              ...data,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.firestore.collection("users").doc(uid);

  users = () => this.firestore.collection("users");

  // *** Summary API ***

  getSummaryByCountry = (country) => {
    var summaryRef = this.firestore.collection("summary").doc(country);

    return summaryRef
      .get()
      .then((doc) => {
        if (doc.exists && moment(doc.data().Date).isSame(moment(), "day")) {
          // document exist and is updated
          return doc.data();
        } else {
          // document does not exist / is outdated -> retrieve it from api.covid19
          return API.getSummary().then((summary) => {
            let data = summary.Countries.filter(
              (item) => item.Slug.localeCompare(country) === 0
            );
            summaryRef.set(data[0]);
            return data[0];
          });
        }
      })
      .catch((error) => {
        throw {
          error: error,
          message: "Failed to retrieve summary data; ",
        };
      });
  };

  // *** News API ***

  storeImage = (imagePath, image) => {
    var imageRef = this.storageRef.child(imagePath);
    return imageRef.put(image).then(function (snapshot) {
      return imageRef.getDownloadURL().then((url) => url);
    });
  };

  removeImage = (imagePath) => {
    console.log(imagePath);
    var imageRef = this.storageRef.child(imagePath);
    return imageRef
      .delete()
      .then(function () {
        return true;
      })
      .catch(function (error) {
        return error;
      });
  };

  addNews = (news) => {
    var newsRef = this.firestore.collection("news");
    return newsRef
      .add(Object.assign({}, news))
      .then(() => {
        return true;
      })
      .catch((err) => err);
  };

  updateNews = (id, news) => {
    console.log(id);
    var newsRef = this.firestore.collection("news").doc(id);
    return newsRef
      .update(Object.assign({}, news))
      .then(() => {
        return true;
      })
      .catch((err) => err);
  };

  deleteNews = (id) => {
    console.log(id);
    var newsRef = this.firestore.collection("news").doc(id);
    return newsRef.get().then((doc) => {
      if (doc.exists) {
        return newsRef.delete().then(() => {
          if(doc.data().imagePath)
            this.removeImage(doc.data().imagePath);
        });
      }
    });
  };

  getNewsByUser = (userid) => {
    var newsRef = this.firestore.collection("news");
    return newsRef
      .where("userid", "==", userid)
      .get()
      .then(function (querySnapshot) {
        var news = [];
        querySnapshot.forEach(function (doc) {
          news.push({ newsid: doc.id, ...doc.data() });
        });
        return news;
      })
      .catch((err) => err);
  };

  getNewsByLocation = (location) => {
    var newsRef = this.firestore.collection("news");
    return newsRef
      .where("location", "==", location)
      .get()
      .then(function (querySnapshot) {
        var news = [];
        querySnapshot.forEach(function (doc) {
          news.push(doc.data());
        });
        return news;
      })
      .catch((err) => err);
  };
}
export default Firebase;
