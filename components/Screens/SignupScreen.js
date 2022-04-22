import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { auth } from "../../firebase";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("Login");
      })
      .catch((error) =>
        alert("Invalid Credentials OR The Email Has Already Been Taken!")
      );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoStyle}
          source={require("../../assets/logo.png")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter Your Email </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"abc@gmail.com"}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your name </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"Masood Khan"}
          value={name}
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your Password </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={"********"}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {/* checkbox  */}

      <View style={styles.wrapper}>
        <Checkbox
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "orange" : undefined}
        />
        <Text style={styles.wrapperText}>
          I have read and agreed with the TC
        </Text>
      </View>

      {/* submit button  */}

      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: agree ? "orange" : "grey",
          },
        ]}
        disabled={!agree}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}> Register </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        disabled={!agree}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    backgroundColor: "black",
  },
  logoContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoStyle: {
    width: 65,
    height: 65,
  },
  inputContainer: {
    marginTop: 15,
  },
  labels: {
    fontWeight: "bold",
    // fontSize: 15,
    color: "#fff",
    paddingBottom: 5,
    lineHeight: 25,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
    color: "black",
  },
  multiineStyle: {
    paddingVertical: 4,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: {
    color: "#eee",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  wrapperText: {
    marginLeft: 10,
    color: "#fff",
  },
  loginBtn: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    marginTop: -20,
  },
});

export default SignupScreen;
