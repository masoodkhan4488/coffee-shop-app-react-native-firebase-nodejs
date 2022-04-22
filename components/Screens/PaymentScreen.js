import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "https://stripegatewayapi.herokuapp.com";

function PaymentScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const state = useSelector((state) => state.addToCart);

  const total = () => {
    const Total = state.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return Total;
  };

  const totalCartNumber = () => {
    const CartTotal = state.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return CartTotal;
  };

  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const totalAmount = total() + 3;
  const totalItemsPurchased = totalCartNumber();

  const body = {
    totalAmount,
    totalItemsPurchased,
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email || totalAmount == 3) {
      Alert.alert("Incomplete Details or Amount Issues!");
      return;
    }
    const billingDetals = {
      email: email,
    };
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) {
        Alert.alert("Unable To Process Payments");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetals: billingDetals,
        });
        if (error) {
          Alert.alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          Alert.alert("Payment Successful!");
        }
      }
    } catch (e) {
      Alert.alert("An Issue While Connecting To Server!");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        textAlign: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Roboto-Medium",
        backgroundColor: "black",
      }}
    >
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.menuImage}
            source={require("../../assets/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={{ color: "white", fontSize: 15, color: "orange" }}>
            {totalCartNumber()}
          </Text>
          <Image
            style={styles.menuImage}
            source={require("../../assets/cart.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholder={"Full Name Optional*"}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholder={"Country Optional*"}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          placeholder={"Postal Code Optional*"}
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.inputStyle}
          placeholder={"E-mail"}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{ number: "4242 4242 4242 4242" }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetals) => {
            setCardDetails(cardDetals);
          }}
        />
        <Button
          onPress={handlePayPress}
          title={totalAmount == 3 ? `Pay US$${0}` : `Pay US$${totalAmount}`}
          disabled={loading}
          color={"orange"}
        />
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" color="orange" size={45} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Icon name="shopping-cart" color="#e232fa" size={45} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Whishlist")}>
          <Icon name="heart" color="red" size={45} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
          <Icon name="paypal" color="yellow" size={45} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  menuImage: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    marginTop: 10,
    paddingBottom: 50,
    width: "80%",
  },

  imageContainer: {
    width: "80%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 2,
    color: "black",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default PaymentScreen;
