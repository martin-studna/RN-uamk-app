import * as ImagePicker from "expo-image-picker";

class Camera {

  choosePhotoFromLibraryAsync = async () => {
    return new Promise((res,rej) => {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      })
      .then(result => res(result))
      .catch(err => rej(err))
    })
  };

  takePhotoFromCameraAsync = async () => {
    return new Promise((res,rej) => {
      ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      })
      .then(result => res(result))
      .catch(err => rej(err))
    })
  };
}

Camera.shared = new Camera();
export default Camera;