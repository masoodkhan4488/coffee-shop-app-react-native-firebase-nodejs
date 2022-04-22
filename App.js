import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/Screens/HomeScreen";
import WhishListScreen from "./components/Screens/WhishListScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import CartScreen from "./components/Screens/CartScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import SignupScreen from "./components/Screens/SignupScreen";
import { StripeProvider } from "@stripe/stripe-react-native";

import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StripeProvider publishableKey="pk_test_51KqJ4DAAUyqQ9D2Qg3e4RhwFrtsK8QtUkg28KOZ5CRFFUa50BBkzjZaulWLvdO58TbrophUGRZtrPjk25Ploh9To00vXLv8YDl">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Welcome To Coffee Shop",
                headerTitleAlign: "center",
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: "Payment", headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Whishlist"
              component={WhishListScreen}
              options={{ title: "My WhishList", headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Shopping Cart", headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Login To Coffee Shop",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                title: "Register To Coffee Shop",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
}

export default App;
