import React, {useEffect} from "react";
import { Text, BackHandler, TouchableOpacity, StyleSheet, Pressable, View, ScrollView, TouchableHighlight, Dimensions } from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";

const windowHeight = Dimensions.get("window").height;

const DeleteAccount3 = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // Handle the back button press event
    const handleBackPress = () => {
      BackHandler.exitApp(); // Exit the app
      return true; // Prevent default behavior
    };

    // Add the event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Return a cleanup function to remove the event listener
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  return (

    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.login}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeBackText}>GoodBye D:</Text>
          <Text style={styles.loginToContinueText}>There's always an ending, but hey! our account is free to own</Text>
          <Text style={[styles.loginToContinueText]}>You're always welcomed if you change your mind :D </Text>
        </View>

        <View style={styles.redirectSignUp}>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={() => navigation.navigate('InitialPage')}
            underlayColor={Color.sandybrown}
          >
            <Text style={styles.cancelButtonText}>Got it! Goodbye!</Text>
          </TouchableHighlight>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    height: "100%",

  },
  login: {
    flex: 1,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center", // Add justifyContent property
  },
  welcomeContainer: {
    marginLeft: windowHeight * 0.01,
    marginBottom: windowHeight * 0.1,
  },
  welcomeBackText: {
    fontSize: 39,
    letterSpacing: 0.4,
    color: Color.dimgray,
    fontWeight: '900',
    textAlign: "left",
  },
  backButton: {
    position: 'absolute',
    top: 10, // adjust this value as per your needs
    left: 10, // adjust this value as per your needs
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: 20,
    backgroundColor: '#FF9E5C',
    alignItems: "center",
    zIndex: 1, // make sure the button is above other elements
},
backButtonText: {
    paddingTop: windowHeight * 0.004,
    fontSize: 24,
    color: Color.dimgray,
    fontWeight: "700",
},
  loginToContinueText: {
    fontSize: 23,
    letterSpacing: 0.2,
    marginBottom: 30,
    fontWeight: '700',
    textAlign: "left",
  },
  usernameFieldContainer: {
    width: "100%",
  },
  emailLabel: {
    marginLeft: windowHeight * 0.015,
    fontSize: 16,
    marginBottom: 5,
    color: Color.silver,
    fontWeight: "600",
  },
  usernameInput: {
    color: "#c7c7c7",
  },
  cancelButton: {
    borderRadius: 87,
    backgroundColor: Color.sandybrown,
    width: "60%",
    height: windowHeight * 0.09,
    paddingHorizontal: windowHeight * 0.04,
    marginBottom: windowHeight * 0.03, // Add margin bottom
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    borderRadius: 87,
    borderColor: Color.sandybrown,
    borderWidth: 1,
    backgroundColor: 'white',
    width: "60%",
    height: windowHeight * 0.09,
    paddingHorizontal: windowHeight * 0.04,
    marginBottom: windowHeight * 0.03, // Add margin bottom
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: windowHeight * 0.025,
    letterSpacing: 0.3,
    color: Color.sandybrown,
    fontFamily: FontFamily.interExtrabold,
    fontWeight: "800",
    textAlign: 'center',
  },
  cancelButtonText: {
    fontSize: windowHeight * 0.025,
    letterSpacing: 0.3,
    color: Color.white,
    fontFamily: FontFamily.interExtrabold,
    fontWeight: "800",
    textAlign: 'center',
  },
  redirectSignUp: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.02,
    position: "absolute",
    bottom: windowHeight * 0.05,
    width: "100%",
  },
  signUpText: {
    fontSize: windowHeight * 0.018,
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: 0.1,
    color: Color.sandybrown,
    fontFamily: FontFamily.interSemibold,
    fontWeight: "600",
    marginTop: 5,
  },
  dontHaveAnText: {
    fontSize: windowHeight * 0.018,
    letterSpacing: 0.1,
    marginRight: 5,
  },
  dontHaveAnTypo: {
    textAlign: "center",
    color: Color.silver,
    fontFamily: FontFamily.interSemibold,
    fontWeight: "600",
  },
});

export default DeleteAccount3;
