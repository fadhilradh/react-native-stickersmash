import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";

import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";

import AddStickerScreen from "./components/AddStickerScreen";

const placeholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null),
    [showAppOptions, setShowAppOptions] = useState(false),
    [showImagePickerModal, setShowImagePickerModal] = useState(false),
    [pickedEmoji, setPickedEmoji] = useState(false),
    [status, requestPermission] = MediaLibrary.usePermissions(),
    imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  async function pickImageAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You didnt select any image");
    }
  }

  function useDefaultPhoto() {
    setShowAppOptions(true);
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSrc={placeholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <AddStickerScreen
          setShowImagePickerModal={setShowImagePickerModal}
          setShowAppOptions={setShowAppOptions}
          imageRef={imageRef}
        />
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button theme="" label="Use this photo" onPress={useDefaultPhoto} />
        </View>
      )}

      <EmojiPicker
        isVisible={showImagePickerModal}
        onClose={() => setShowImagePickerModal(false)}
      >
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={() => setShowImagePickerModal(false)}
        />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
