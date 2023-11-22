import { StyleSheet } from "react-native";
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import ellipse from "../assets/Settings/ellipse.png";
import darkEllipse from "../assets/Settings/dark_ellipse.png";

import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../AuthContext";

export default function SettingsScreen() {
  const [mode, setMode] = useState("light");
  const textColor = mode === "dark" ? "#fff" : "#000";

  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error("No context value");
  }

  const { setLoggedOut } = contextValue;

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: mode === "dark" ? "#1c1c1c" : "#fff",
      alignItems: "center",
    },
    header: {
      fontSize: 30,
      fontWeight: "bold",
      color: textColor,
    },
    boldFont: {
      fontWeight: "500",
      color: textColor,
    },
    header2_c: {
      fontSize: 20,
      fontWeight: "bold",
      color: textColor,
    },
    header2: {
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
      color: textColor,
    },
    a1: { fontSize: 10, alignSelf: "flex-end", color: textColor },
    a2: { fontSize: 20, alignSelf: "flex-end", bottom: -4, color: textColor },
    a3: { fontSize: 30, alignSelf: "flex-end", bottom: -6, color: textColor },
    a4: { fontSize: 40, alignSelf: "flex-end", bottom: -9, color: textColor },
    p1: {
      fontSize: 10,
      color: textColor,
    },
    linebreak: {
      height: 1,
      width: "90%",
      borderBottomWidth: 3,
      borderColor: textColor,
    },
  });

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("user");
    setLoggedOut()
  }

  return (
    <ImageBackground
      source={mode === "dark" ? darkEllipse : ellipse}
      style={dynamicStyles.container}
    >
      {/* Heading Spacer */}
      <View style={styles.headerContainer} />

      {/* Accessibility Options Title */}
      <View style={styles.title}>
        <Text style={dynamicStyles.header}>Accessibilty Options</Text>
        <View style={{ height: 20 }}></View>
      </View>
      {/* Linebreak */}
      <View style={dynamicStyles.linebreak} />
      {/* Space */}
      <View style={{ height: 20 }}></View>

      {/* Light Mode / Dark Mode  */}
      <View style={styles.darkLightContainer}>
        <View style={styles.modeContainer}>
          <TouchableOpacity
            onPress={() => {
              setMode("light");
            }}
          >
            <Feather
              name="sun"
              size={125}
              color={mode === "dark" ? "white" : "#28B67E"}
            />
          </TouchableOpacity>
          <Text style={dynamicStyles.boldFont}>Light Mode</Text>
        </View>
        <View
          style={{
            borderLeftWidth: 1.5,
            borderRightWidth: 1.5,
            borderColor: textColor,
          }}
        ></View>
        <View style={styles.modeContainer}>
          <TouchableOpacity onPress={() => setMode("dark")}>
            <Fontisto
              name="night-clear"
              size={125}
              color={mode === "dark" ? "#28B67E" : "black"}
            />
          </TouchableOpacity>
          <Text style={dynamicStyles.boldFont}>Dark Mode</Text>
        </View>
      </View>
      {/* Space */}
      <View style={{ height: 20 }}></View>
      {/* Linebreak */}
      <View style={dynamicStyles.linebreak} />

      {/* Font Size */}
      <View style={{ height: 10 }}></View>
      <View style={styles.fontSizeContainer}>
        <View>
          <Text style={dynamicStyles.header2_c}>Font Size</Text>
        </View>
        <View style={styles.aSizes}>
          <Text style={dynamicStyles.a1}>A</Text>
          <Text style={dynamicStyles.a2}>A</Text>
          <Text style={dynamicStyles.a3}>A</Text>
          <Text style={dynamicStyles.a4}>A</Text>
        </View>
      </View>
      {/* Space */}
      <View style={{ height: 10 }}></View>
      {/* Linebreak */}
      <View style={dynamicStyles.linebreak} />

      {/* Text Reader */}
      <View style={{ height: 10 }}></View>
      <View style={styles.textReaderContainer}>
        <Text style={dynamicStyles.header2}>Text Reader</Text>
        <Switch />
      </View>
      <View style={{ height: 10 }}></View>

      {/* Linebreak */}
      <View style={dynamicStyles.linebreak} />
      {/* Space */}
      <View style={{ height: 10 }}></View>

      {/* Colour Blindness Mode */}
      <View style={styles.colorBlindContainer}>
        <Text style={dynamicStyles.header2_c}>Color Blind Mode</Text>
        <View style={{ height: 10 }}></View>

        <View style={styles.colorBlindColorsContainer}>
          <View style={styles.colorBlind}>
            <View
              style={{
                height: 50,
                width: 50,
                borderWidth: 3,
                borderRadius: 50,
                borderColor: textColor,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: textColor,
                }}
              />
            </View>
            <Text style={dynamicStyles.p1}>None</Text>
          </View>

          <View style={styles.colorBlind}>
            <View
              style={{
                height: 50,
                width: 50,
                borderWidth: 3,
                borderRadius: 50,
                backgroundColor: "#B07BB9",
                borderColor: textColor,
              }}
            ></View>
            <Text style={dynamicStyles.p1}>Protanopia</Text>
          </View>

          <View style={styles.colorBlind}>
            <View
              style={{
                height: 50,
                width: 50,
                borderWidth: 3,
                borderRadius: 50,
                backgroundColor: "#BE01C1",
                borderColor: textColor,
              }}
            ></View>
            <Text style={dynamicStyles.p1}>Deuteranopia</Text>
          </View>

          <View style={styles.colorBlind}>
            <View
              style={{
                height: 50,
                width: 50,
                borderWidth: 3,
                borderRadius: 50,
                backgroundColor: "#419B3F",
                borderColor: textColor,
              }}
            ></View>
            <Text style={dynamicStyles.p1}>Tritanopia</Text>
          </View>

          <View style={styles.colorBlind}>
            <View
              style={{
                height: 50,
                width: 50,
                borderWidth: 3,
                borderRadius: 50,
                backgroundColor: "#2BFFF2",
                borderColor: textColor,
              }}
            ></View>
            <Text style={dynamicStyles.p1}>Achromatopsia</Text>
          </View>
        </View>
      </View>
      {/* Linebreak */}
      <View style={{ height: 20 }}></View>
      <View style={dynamicStyles.linebreak} />
      {/* Space */}
      <View style={{ height: 20 }}></View>

      {/* Log Out */}
      <Button title="LOG OUT" onPress={handleLogOut}></Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
  },
  title: {
    top: 0,
  },
  darkLightContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  modeContainer: {
    height: 170,
    alignItems: "center",
    justifyContent: "space-between",
  },

  fontSizeContainer: {
    width: "90%",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  aSizes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: -10,
  },

  textReaderContainer: {
    width: "90%",
    alignContent: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorBlindContainer: {
    width: "90%",
    alignContent: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  colorBlindColorsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  colorBlind: {
    alignItems: "center",
    width: 90,
  },
});
