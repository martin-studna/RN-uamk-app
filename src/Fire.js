import firebase from "firebase";
import firebaseConfig from "./config.js";

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  addPostAsync = async ({ text, localUri }) => {
    const remoteUri = localUri ? await this.uploadPhotoAsync(localUri) : null;

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
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
    fullname,
    username,
    mail,
    password,
    image,
    points,
    cardId,
    cardActivationCode,
  }) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(uid)
        .set({
          fullname,
          username,
          mail,
          password,
          image,
          points,
          cardId,
          cardActivationCode,
        })
        .then((ref) => {
          res(ref);
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
        .then((user) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  updateUserByIdAsync = async (id, fields) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc(id)
        .update(fields)
        .then((ref) => res(ref))
        .catch((err) => rej(err));
    });
  };

  uploadPhotoAsync = async (uri) => {
    console.log(this.uid);
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    console.log(path);

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
  };

  getUsersRef = () => {
    return this.firestore.collection("users");
  };

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
