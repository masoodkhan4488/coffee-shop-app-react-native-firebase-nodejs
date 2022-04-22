import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { addToCart, addToWhishList } from "../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";

const coffeeItems = [
  {
    key: 1,
    name: "Cappuccino",
    image: require("../../assets/coffeewithmilk.jpeg"),
    rating: 4.5,
    tagline: "With Oat Milk",
    price: 4,
    quantity: 1,
  },
  {
    key: 2,
    name: "Cappuccino",
    image: require("../../assets/coffeewithchocolate.jpg"),
    rating: 4.2,
    tagline: "With Chocolate",
    price: 3,
    quantity: 1,
  },
  {
    key: 3,
    name: "Cappuccino",
    image: require("../../assets/coffeewithbeans.jpg"),
    rating: 4.3,
    tagline: "With Roasted Beans",
    price: 4,
    quantity: 1,
  },
  {
    key: 4,
    name: "Espresso",
    image: require("../../assets/espresso1.jpg"),
    rating: 4.4,
    tagline: "Americano",
    price: 5,
    quantity: 1,
  },
  {
    key: 5,
    name: "Espresso",
    image: require("../../assets/espresso2.png"),
    rating: 4.5,
    tagline: "Cortado",
    price: 4,
    quantity: 1,
  },
  {
    key: 6,
    name: "Espresso",
    image: require("../../assets/espresso3.jpg"),
    rating: 4.6,
    tagline: "Red Eye",
    price: 5,
    quantity: 1,
  },
  {
    key: 7,
    name: "Latte",
    image: require("../../assets/latte1.jpeg"),
    rating: 4.4,
    tagline: "Chai Latte",
    price: 4,
    quantity: 1,
  },
  {
    key: 8,
    name: "Latte",
    image: require("../../assets/latte2.jpg"),
    rating: 4.8,
    tagline: "Pumpkin Spice",
    price: 5,
    quantity: 1,
  },
  {
    key: 9,
    name: "Latte",
    image: require("../../assets/latte3.jpg"),
    rating: 4.9,
    tagline: "White Chocolate",
    price: 5,
    quantity: 1,
  },
  {
    key: 10,
    name: "Latte",
    image: require("../../assets/latte2.jpg"),
    rating: 4.1,
    tagline: "Gingerbread",
    price: 4,
    quantity: 1,
  },
];

function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const dispatch = useDispatch();
  const [items, setItems] = useState(coffeeItems);
  const state = useSelector((state) => state.addToCart);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => Alert.alert(error.message));
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const showCategory = (category) => {
    const filterItems = coffeeItems.filter((item) => {
      return item.name == category;
    });
    setItems(filterItems);
  };

  const totalCartNumber = () => {
    const CartTotal = state.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return CartTotal;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={styles.menuImage}
            source={require("../../assets/logout.png")}
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
      <Text style={styles.headline}>Find the best coffee for you</Text>
      <View style={styles.coffeeMenu}>
        <TouchableOpacity>
          <Text
            onPress={() => setItems(coffeeItems)}
            style={styles.coffeeMenuItem}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={() => showCategory("Cappuccino")}
            style={styles.coffeeMenuItem}
          >
            Cappuccino
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={() => showCategory("Espresso")}
            style={styles.coffeeMenuItem}
          >
            Espresso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={() => showCategory("Latte")}
            style={styles.coffeeMenuItem}
          >
            Latte
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.coffeeItems}>
        {
          <FlatList
            data={items}
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.coffeeName}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          addToWhishList({
                            key: item.key,
                            rating: item.rating,
                            name: item.name,
                            tagline: item.tagline,
                            price: item.price,
                            image: item.image,
                            quantity: item.quantity,
                          })
                        )
                      }
                    >
                      <Text style={styles.whishListButton}>
                        <Icon name="heart" size={17} color="red" />
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.coffeeTagLine}>{item.tagline}</Text>
                  <View style={styles.priceButtonHolder}>
                    <Text style={styles.coffeePrice}>
                      <Icon name="dollar" size={15} color="black" />
                      {item.price}
                    </Text>
                    <View style={{ width: 40 }}>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(
                            addToCart({
                              key: item.key,
                              rating: item.rating,
                              name: item.name,
                              tagline: item.tagline,
                              price: item.price,
                              image: item.image,
                              quantity: item.quantity,
                            })
                          )
                        }
                      >
                        <Text style={styles.button}>
                          <Icon name="plus" size={15} color="white" />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        }
      </View>
      <View style={{ width: "80%", marginTop: 25 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Roboto-Medium",
            fontSize: 15,
          }}
        >
          "Once you wake up and smell the coffee, it's hard to go back to
          sleep."
        </Text>
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
      <StatusBar style="light" />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "black",
  },
  menuImage: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    width: "80%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  headline: {
    color: "white",
    fontSize: 30,
    width: "80%",
    fontFamily: "Roboto-Black",
  },
  coffeeMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
  },
  coffeeMenuItem: {
    color: "white",
    fontFamily: "Roboto-Medium",
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
  whishListButton: { marginTop: 10, marginRight: 5 },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    position: "absolute",
    bottom: 20,
  },
});
