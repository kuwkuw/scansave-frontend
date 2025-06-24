import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Image, ScrollView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLatestProducts } from '@/hooks/useProducts';

import { Stack } from 'expo-router';

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();
  const { products } = useLatestProducts();
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.notFound}>Product not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Product Details' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          {product.imageUrl ? (
            <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.placeholder]}>
              <Ionicons name="image-outline" size={60} color="#ccc" />
            </View>
          )}
        </View>
        <View style={styles.card}>
          <ThemedText style={styles.title}>{product.name}</ThemedText>
          <View style={styles.priceRow}>
            <ThemedText style={styles.price}>{typeof product.price === 'number' ? product.price.toFixed(2) : product.price} грн</ThemedText>
            {typeof product.oldPrice === 'number' && product.oldPrice > (typeof product.price === 'number' ? product.price : 0) && (
              <ThemedText style={styles.oldPrice}>Was {product.oldPrice.toFixed(2)} грн</ThemedText>
            )}
          </View>
          <ThemedText style={styles.store}>Store: {product.store}</ThemedText>
          <ThemedText style={styles.category}>Category: {product.category}</ThemedText>
          <ThemedText style={styles.description}>{typeof (product as any).description === 'string' && (product as any).description ? (product as any).description : 'No description.'}</ThemedText>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#F5F5F5',
    minHeight: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D0D0D0',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -32,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: '#00BFA5',
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  store: {
    fontSize: 15,
    color: '#666',
    marginBottom: 2,
  },
  category: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
  notFound: {
    fontSize: 18,
    color: 'red',
    marginTop: 40,
    textAlign: 'center',
  },
});
