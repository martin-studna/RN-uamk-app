import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions'

class Camera {

  choosePhotoFromLibraryAsync = async () => {
    return new Promise( async (res,rej) => {

      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("We need permission to access your camera roll");
        rej('We need permission to access your camera roll')
      }
      else {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
        })
        .then(result => res(result))
        .catch(err => rej(err))
      }

    })
  };

  takePhotoFromCameraAsync = async () => {
    return new Promise( async (res,rej) => {

      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status !== "granted") {
        alert("We need permission to access your camera roll");
        rej('We need permission to access your camera roll')
      }
      else {
        ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
        })
        .then(result => res(result))
        .catch(err => rej(err))
      }

    })
  };
}

Camera.shared = new Camera();
export default Camera;