import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Product = {
  id: string;
  name: string;
  image: string;
  bestPrice: number;
  bestStore: string;
  storeCount: number;
};

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Zlagoda Milk 2.5%, 1L',
    image: 'placeholder',
    bestPrice: 49.9,
    bestStore: 'ATB',
    storeCount: 3,
  },
  {
    id: '2',
    name: 'Prostokvashino Milk 2.5%, 870ml',
    image: 'placeholder',
    bestPrice: 52.5,
    bestStore: 'Silpo',
    storeCount: 4,
  },
  {
    id: '3',
    name: 'Ferma Milk 2.5%, 900ml',
    image: 'placeholder',
    bestPrice: 51.9,
    bestStore: 'Novus',
    storeCount: 2,
  },
];

export default function SearchScreen() {
  const [sortBy, setSortBy] = useState('price_asc');

  const ProductCard = ({ product }: { product: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImage} />
      <View style={styles.productInfo}>
        <ThemedText style={styles.productName}>{product.name}</ThemedText>
        <View style={styles.priceRow}>
          <ThemedText style={styles.bestPrice}>
            {product.bestPrice.toFixed(2)} грн
          </ThemedText>
          <ThemedText style={styles.bestStore}> at {product.bestStore}</ThemedText>
        </View>        <TouchableOpacity>
          <ThemedText style={styles.compareLink}>
            Compare {product.storeCount} stores
          </ThemedText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        accessibilityLabel={`Add ${product.name} to list`}
      >
        <Ionicons name="add-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back-outline" size={24} color="#333333" />
        </TouchableOpacity>
        <View style={styles.searchInput}>
          <Ionicons name="search-outline" size={20} color="#666666" />
          <TextInput
            style={styles.input}
            placeholder="Milk"
            placeholderTextColor="#999999"
            editable={false}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          accessibilityLabel="Filter results"
        >
          <Ionicons name="filter-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Sort Bar */}
      <View style={styles.sortBar}>
        <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
        <TouchableOpacity style={styles.sortButton}>
          <ThemedText style={styles.sortValue}>Price (Low to High)</ThemedText>
          <Ionicons name="chevron-down-outline" size={16} color="#00BFA5" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={dummyProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  backButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  filterButton: {
    padding: 8,
  },
  sortBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sortLabel: {
    fontSize: 14,
    color: '#666666',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortValue: {
    fontSize: 14,
    color: '#00BFA5',
    textDecorationLine: 'underline',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  productCard: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    gap: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: '#D0D0D0',
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bestPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00BFA5',
  },
  bestStore: {
    fontSize: 16,
    color: '#333333',
  },
  compareLink: {
    fontSize: 14,
    color: '#00BFA5',
    textDecorationLine: 'underline',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00BFA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
