import React from "react";
import { Image, StyleSheet } from "react-native";

const ImageViewer = ({ placeholderImageSrc, selectedImage }) => {
  const imageSrc =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSrc;
  return <Image source={imageSrc} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
