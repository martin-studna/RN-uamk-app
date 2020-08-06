import firebase from "firebase";
import firebaseConfig from "./config.js";
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }


  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      console.log('PERMISSION NOT GRANTED!');
      return null
    }

    return Location.getCurrentPositionAsync(); 
  }

  getPostsByUserIdAsync = async (id) => {
    return new Promise( async(res, rej) => {
      const postsRef = await this.firestore.collection('posts').get()

      if (postsRef.empty) {
        rej('Array is empty')
        return
      }

      let posts = []

      for (let i = 0; i < postsRef.docs.length; i++) {
      
        if (postsRef.docs[i].data().publisher === id) {
          posts.push(postsRef.docs[i].data())
        }
      }

      res(posts)
    })
  }

  getFollowersByUserIdAsync = async (id) => {
    return new Promise((res,rej) => {

      this.firestore
        .collection('follow')
        .doc(id)
        .collection('followers')
        .get()
        .then(result => {
          res(result)
        })
        .catch(err => {
          rej(err)
        })
    })
  }

  getFollowingByUserIdAsync = async (id) => {
    return new Promise((res,rej) => {

      this.firestore
        .collection('follow')
        .doc(id)
        .collection('following')
        .get()
        .then(result => res(result))
        .catch(err => rej(err))
    })
  }

  addPostAsync = async ({ difficulty, type, text, localUri }) => {
    const remoteUri = localUri ? await this.uploadPhotoAsync(localUri) : null;
    const location = await this.getLocationAsync()

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          publisher: this.uid,
          timestamp: this.timestamp,
          difficulty,
          type,
          location: { 
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
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
          points: 10,
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

  addCardAsync = async (uid, activationCode) => {
    return new Promise((res,rej) => {
      this.firestore
      .collection('cards')
      .add({
        uid,
        activationCode,
        active: true
      })
      .then(result => {
        console.log(result.id)
        res(result)
      })
      .catch(err => {
        console.error(err)
        rej(err)
      })
    }) 
  }

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
        .then(ref => {
          console.log(ref)
          res(ref)
        })
        .catch((err) => {
          rej(err)
        });
    });
  };

  uploadPhotoAsync = async (uri) => {
    
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    console.log('LOCAL PHOTO URI: ', path);

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
          console.log('REMOTE PHOTO URI: ', url);
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

  set location(location) {
    this.location = location
  }
}

Fire.shared = new Fire();
export default Fire;
