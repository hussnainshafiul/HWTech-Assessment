import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../cartActions";

import { COLORS, SIZES } from "../constants";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Function to increment the quantity of a product in the cart
  const incrementQuantity = (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    dispatch({ type: 'UPDATE_CART', payload: updatedItems });
  };

  // Function to decrement the quantity of a product in the cart
  const decrementQuantity = (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    const filteredItems = updatedItems.filter((item) => item.quantity > 0);
    dispatch({ type: 'UPDATE_CART', payload: filteredItems });
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    dispatch({ type: 'UPDATE_CART', payload: updatedItems });
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseFloat(item.price) * item.quantity;
    });
    return totalPrice;
  };

  

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.screenTitle}>My Cart</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View style={styles.cartItemContainer} key={index}>
              {/* Render product image */}
             <View style={styles.cartItemImageContainer}>
                 <Image
                source={{ uri: item.image }}
                style={styles.cartItemImage}
              />
             </View>
              {/* Render product details */}
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <Text style={styles.cartItemPrice}>Price: ${item.price}</Text>

                {/* Render quantity controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                  {/* Remove item button */}
                  <TouchableOpacity onPress={() => removeItemFromCart(item.id)}>
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        )}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalPriceText}>
          Total Price:
          <Text style={styles.totalPriceValue}> ${calculateTotalPrice().toFixed(2)}</Text>
        </Text>
        <TouchableOpacity
          onPress={()=>{}}
          style={[
            styles.checkoutButton,
            { backgroundColor: calculateTotalPrice() > 0 ? COLORS.black : COLORS.gray2 },
          ]}
          disabled={calculateTotalPrice() === 0}
        >
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 25,
    fontFamily: 'bold',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    marginBottom: 0,
    color: COLORS.black,
  },
  emptyCartText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
    color: COLORS.black,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 14
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  cartItemPrice: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 26,
    color: COLORS.black,
  },
  quantity: {
    fontSize: 16,
    color: COLORS.red,
  },
  removeButton: {
    fontSize: 14,
    color: COLORS.red,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray2,
    backgroundColor: COLORS.lightWhite,
    marginHorizontal: -10,
  },
  totalWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  totalPriceText: {
    fontSize: SIZES.large,
    fontFamily: "semibold",
  },
  totalPriceValue: {
    fontFamily: 'regular',
    color: COLORS.black,
    fontSize: 16,
  },
  checkoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

export default Cart;
