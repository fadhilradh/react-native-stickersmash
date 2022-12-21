import React, { useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";
import IconButton from "./IconButton";
import CircleButton from "./CircleButton";
import * as MediaLibrary from "expo-media-library";

const AddStickerScreen = ({
  setShowImagePickerModal,
  setShowAppOptions,
  imageRef,
}) => {
  async function onSaveImageAsync() {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Photo saved to device");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      domtoimage
        .toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })
        .then((dataUrl) => {
          let link = document.createElement("a");
          link.download = "sticker-smash.jpeg";
          link.href = dataUrl;
          link.click();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsRow}>
        <IconButton
          icon="refresh"
          label="Reset"
          onPress={() => setShowAppOptions(false)}
        />
        <CircleButton onPress={() => setShowImagePickerModal(true)} />
        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default AddStickerScreen;
