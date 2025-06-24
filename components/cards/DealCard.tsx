import React from 'react';
import { View, StyleSheet, Image as RNImage } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

import type { Product } from '@/hooks/useProducts';

interface DealCardProps {
  product: Product;
}

export const DealCard: React.FC<DealCardProps> = ({ product }) => {
  const price = product.price;
  const oldPrice = product.oldPrice;

  return (
    <View style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        {product.imageUrl ? (
          <RNImage
            source={{ uri: product.imageUrl }}
            style={styles.dealImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.dealImage} />
        )}
        <View style={styles.dealTag}>
          <ThemedText style={styles.dealTagText}>DEAL!</ThemedText>
        </View>
      </View>
      <View style={styles.dealInfo}>
        <View style={styles.priceContainer}>
          <ThemedText style={styles.currentPrice}>
            {price} грн
          </ThemedText>
          <ThemedText style={styles.oldPrice}>
            {oldPrice !== undefined ? `was ${oldPrice} грн` : ''}
          </ThemedText>
        </View>
        <ThemedText style={styles.storeName}>{product.store}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  dealImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  dealTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#00BFA5',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dealTagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dealInfo: {
    padding: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00BFA5',
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  storeName: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
});
