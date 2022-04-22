import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";

import { emptyCartTotal } from "../../actions/action";

function CartScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const state = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const emptyCart = () => {
    dispatch(emptyCartTotal());
  };

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

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { height: 60 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={{ color: "white", fontSize: 15, color: "orange" }}>
            {totalCartNumber()}
          </Text>
          <Image
            style={styles.menuImage}
            source={require("../../assets/cart.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => emptyCart()}>
          <Icon style={{ marginTop: 20 }} name="trash" color="red" size={35} />
        </TouchableOpacity>
      </View>

      <Text style={styles.headingcart}>Here's Your Shopping Cart.</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.tagline}>Go Back To Add More Items</Text>
      </TouchableOpacity>

      <View style={styles.coffeeItems}>
        <FlatList
          data={state}
          horizontal
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View style={styles.coffeeItem}>
                <Text style={styles.rating}>
                  <Icon name="star" size={15} color="yellow" />
                  {item.rating}
                </Text>
                <Image style={styles.coffeeItemImage} source={item.image} />
                <Text style={styles.coffeeName}>{item.name}</Text>
                <Text style={styles.coffeeTagLine}>{item.tagline}</Text>
                <View style={styles.priceButtonHolder}>
                  <Text style={styles.coffeePrice}>
                    <Icon name="dollar" size={15} color="black" />
                    {item.price}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.price1field}>
        <Text style={styles.price1text}>Sub Total</Text>
        <Text style={styles.price1text}>${total()}</Text>
      </View>

      <View style={styles.price2field}>
        <Text style={styles.price1text}>Tax</Text>
        <Text style={styles.price1text}>$3</Text>
      </View>

      <View style={styles.price3field}>
        <Text style={styles.totalprice}>Total</Text>
        <Text style={styles.totalprice}>
          ${total() == 0 ? total() : total() + 3}
        </Text>
      </View>

      <TouchableOpacity
        disabled={total() == 0}
        style={{
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text
          style={[
            styles.checkoutbutton,
            { backgroundColor: total() == 0 ? "grey" : "orange" },
          ]}
        >
          Proceed To Checkout
        </Text>
      </TouchableOpacity>

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

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "black",
  },
  coffeeItems: {
    marginTop: 20,
    width: "80%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  coffeeItem: {
    borderRadius: 15,
    backgroundColor: "white",
    margin: 10,
    width: 130,
    padding: 10,
  },
  coffeeItemImage: {
    borderRadius: 15,
    width: 110,
    height: 100,
    position: "relative",
  },
  coffeeName: { color: "black", fontSize: 15, marginTop: 8 },
  coffeePrice: {
    color: "black",
    fontSize: 15,
  },
  coffeeTagLine: { color: "black", fontSize: 10 },
  rating: {
    color: "white",
    fontSize: 15,
    position: "absolute",
    top: 12,
    right: 20,
    zIndex: 100,
  },
  priceButtonHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    textAlign: "center",
    backgroundColor: "black",
    borderRadius: 10,
    height: 30,
    paddingTop: 8,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    position: "absolute",
    bottom: 20,
  },
  headingcart: {
    marginTop: 20,
    fontFamily: "Roboto-Black",
    width: "80%",
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  tagline: {
    marginTop: 5,
    color: "yellow",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },
  price1field: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "78%",
  },
  price2field: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "78%",
  },
  price3field: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "78%",
  },
  price1text: {
    color: "white",
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
  totalprice: {
    color: "white",
    fontFamily: "Roboto-Medium",
    fontSize: 25,
  },
  checkoutbutton: {
    color: "white",
    fontFamily: "Roboto",
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 10,
  },
  quote: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  imageContainer: {
    width: "80%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  menuImage: {
    width: 50,
    height: 50,
  },
});
