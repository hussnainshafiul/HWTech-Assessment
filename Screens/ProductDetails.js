import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../cartActions';
import { COLORS } from "../constants";
const Spacing = 10;
const ProductDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params; // Get the product id from the route params
  const [product, setProduct] = useState(null);
   const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems); // Access the cart state

  // Calculate the total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    // Fetch product details based on the "id"
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          style={{ marginLeft: -19 }}
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
        />
       <TouchableOpacity style={styles.check} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.carttxt}>Cart ({totalCartQuantity})</Text> 
        </TouchableOpacity>
      </View>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productTitle}>Category: {product.category}</Text>
      <Text style={styles.productPrice}>Price: ${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity style={styles.cartbtn} onPress={() => handleAddToCart(product)}>
          <Text style={styles.btntxt}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  check: {
    backgroundColor: COLORS.black,
    marginVertical: 0,
    borderRadius: 20,
    width: 77,
    height: 35,
    paddingLeft: 12,
    paddingTop: 5,
    marginBottom: 5,
    marginRight: -20,
  },
  carttxt: {
    fontSize: 16,
    color: "#ffff",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  productImage: {
    width: "70%",
    height: 340,
    alignSelf: "center",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  productPrice: {
    fontSize: 16,
    marginTop: 8,
  },
  productDescription: {
    fontSize: 14,
    marginTop: 16,
  },
  cartbtn: {
    backgroundColor: COLORS.black,
    marginVertical: Spacing + 5,
    borderRadius: 20,
    width: 123,
    height: 46,
  },
  btntxt: {
    color: COLORS.white,
    fontFamily: "new2",
    fontSize: 19,
    textAlign: "center",
    paddingTop: 7,
  },
});

export default ProductDetailsScreen;
