import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProductList = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity   onPress={() => navigation.navigate("ProductDetails", { id: item.id })}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="add-circle" size={32} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      // Display two items in each row
      const item1 = products[index];
      const item2 = products[index + 1];
      return (
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            {item1 && renderProduct({ item: item1 })}
          </View>
          <View style={styles.rowItem}>
            {item2 && renderProduct({ item: item2 })}
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxLarge,
    marginHorizontal: SIZES.medium,
  },
  flatListContainer: {
    paddingHorizontal: SIZES.medium - 13,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowItem: {
    flex: 1,
    margin: 5, // Add margin for spacing between product cards
  },
  productContainer: {
    flex: 1,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 170, // Adjust the height as needed
    borderRadius: 30,
  },
  details: {
    padding: SIZES.small-5,
  },
  title: {
   
    fontSize: SIZES.large - 2,
    marginBottom: 0,
  },
  price: {
  
    fontSize: SIZES.medium,
    paddingTop: 5,
  },
  btn: {
    position: "absolute",
    bottom: SIZES.xSmall -10,
    right: SIZES.xSmall-7,
  },
});

export default ProductList;
