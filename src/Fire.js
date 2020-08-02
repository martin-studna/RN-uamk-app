import firebase from "firebase";
import firebaseConfig from "./config.js";

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  addPostAsync = async ({ difficulty, type, location, text, localUri }) => {
    const remoteUri = localUri ? await this.uploadPhotoAsync(localUri) : null;

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          publisher: this.uid,
          timestamp: this.timestamp,
          difficulty,
          type,
          location,
          text,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  addUserAsync = async ({
    uid,
    username,
    mail,
    password,
  }) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(uid)
        .set({
          fullname: '',
          username,
          mail,
          password,
          image: null,
          points: 0,
          cardId: null,
          cardActivationCode: null,
        })
        .then(ref => {
          this.firestore
            .collection('follow')
            .doc(uid)
            .set({ following: uid})
            .then(() => res(ref))
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  getUserByIdAsync = async (id) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(id)
        .get()
        .then(user => res(user))
        .catch(err => rej(err))
        });
  };

  getFollowingByUserIdAsync = async id => {
    return new Promise((res,rej) => {
      this.firestore
        .collection('follow')
        .doc(this.uid)
        .collection('following')
        .doc(id)
        .get()
        .then(ref => res(ref))
        .catch(err => rej(err))
    })
  }

  followUserByIdAsync = async (id) => {

    const following = this.firestore
      .collection('follow')
      .doc(this.uid)
      .collection('following')
      .doc(id)
      .set({exist: true})


    const followers = this.firestore
      .collection('follow')
      .doc(id)
      .collection('followers')
      .doc(this.uid)
      .set({exist: true})


    return Promise.all([following, followers])
  }

  unfollowUserByIdAsync = async id => {

    const following = this.firestore
    .collection('follow')
    .doc(this.uid)
    .collection('following')
    .doc(id)
    .delete()

    const followers =  this.firestore
    .collection('follow')
    .doc(id)
    .collection('followers')
    .doc(this.uid)
    .delete()

    return Promise.all([following, followers])
  }

  updateUserByIdAsync = async (id, fields) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(id)
        .update(fields)
        .then(ref => res(ref))
        .catch((err) => rej(err));
    });
  };

  uploadPhotoAsync = async (uri) => {
    
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    console.log('UPLOAD PHOTO URI: ', path);

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  getPostsRef = () => {
    return this.firestore.collection("posts");
  }

  getUsersRef = () => {
    return this.firestore.collection("users");
  }

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
