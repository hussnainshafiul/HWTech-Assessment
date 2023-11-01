import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
const Spacing = 10;
const Home = ({navigation}) => {
  
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    new: require("../assets/fonts/ArefRuqaa-Bold.ttf"),
    new2: require("../assets/fonts/ArefRuqaa-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/output-onlinegiftools.gif")}
          style={styles.image}
          resizeMode="contain" // Adjust this to your preference
        />
      </View>

      <View style={styles.tech}>
        <Text style={styles.Hello}>Hello Team HWTECH</Text>
        <Image
          style={styles.Hwtech}
          source={require("../assets/HWtech-removebg-preview.png")}
        />
      </View>

      <View style={styles.Jobcontainer}>
        <Text style={styles.text}>
          Welcome to HWTECH Job Assessment. My solution for the Assessment is
          just a tap away! Click on the below button to see my Solution
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.check} onPress={()=> navigation.navigate("ProductScreen")}>
          <Text style={styles.btnText}>Check</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 320,
    marginBottom: 25,
  },

  tech: {
    flexDirection: "row",
    marginLeft: 67,
  },
  Hello: {
    fontFamily: "new",
    paddingTop: 8,
    fontSize: 19,
  },
  Hwtech: {
    width: 40,
    height: 40,
  },
  Jobcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20,
  },
  text: {
    textAlign: "center",
    fontFamily: "new2",
    fontSize: 15,
  },
  check: {
    backgroundColor: "#3d7bb8",
    marginVertical: Spacing + 10,
    borderRadius: 20,
    width: 90,
    height: 40,
    marginLeft: 245,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: "new2",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 4,
  },
});
