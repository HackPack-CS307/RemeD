import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container} className="bg-transparent py-10">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default Loading;
