import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type HotDeal = {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  oldPrice: number;
  store: string;
  discount: number;
};

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type Category = {
  id: string;
  name: string;
  icon: IconName;
};

const dummyDeals: HotDeal[] = [
  {
    id: '1',
    title: 'Fresh Milk 2.5%',
    image: 'placeholder',
    currentPrice: 49.99,
    oldPrice: 59.99,
    store: 'Silpo',
    discount: 20,
  },
  {
    id: '2',
    title: 'Whole Grain Bread',
    image: 'placeholder',
    currentPrice: 29.99,
    oldPrice: 39.99,
    store: 'ATB',
    discount: 25,
  },
  {
    id: '3',
    title: 'Free Range Eggs',
    image: 'placeholder',
    currentPrice: 69.99,
    oldPrice: 89.99,
    store: 'Novus',
    discount: 15,
  },
];

const categories: Category[] = [
  { id: '1', name: 'Dairy', icon: 'nutrition-outline' },
  { id: '2', name: 'Meat', icon: 'restaurant-outline' },
  { id: '3', name: 'Produce', icon: 'leaf-outline' },
  { id: '4', name: 'Bakery', icon: 'pizza-outline' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const DealCard = ({ deal }: { deal: HotDeal }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <View style={styles.dealImage} />
        <View style={styles.dealTag}>
          <ThemedText style={styles.dealTagText}>DEAL!</ThemedText>
        </View>
      </View>
      <View style={styles.dealInfo}>
        <View style={styles.priceContainer}>
          <ThemedText style={styles.currentPrice}>
            {deal.currentPrice.toFixed(2)} грн
          </ThemedText>
          <ThemedText style={styles.oldPrice}>
            was {deal.oldPrice.toFixed(2)} грн
          </ThemedText>
        </View>
        <ThemedText style={styles.storeName}>{deal.store}</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Location Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={24} color="#00BFA5" />
          <ThemedText style={styles.locationText}>Kyiv, Obolon</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products or deals..."
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchActionButton}>
          <MaterialCommunityIcons name="barcode-scan" size={24} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchActionButton}>
          <Ionicons name="mic-outline" size={24} color="#666666" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hot Deals Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>🔥 Hot Deals Near You!</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsScroll}
          >
            {dummyDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Browse Categories</ThemedText>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryButton}
                accessibilityLabel={`Browse ${category.name} category`}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon} size={28} color="#00BFA5" />
                </View>
                <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#333333',
  },  searchContainer: {
    height: 48,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333333',
  },
  searchActionButton: {
    padding: 8,
    marginLeft: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  dealsScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },  dealCard: {
    width: 200,
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
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
  },
  dealImageContainer: {
    height: '70%',
    width: '100%',
    position: 'relative',
  },
  dealImage: {
    backgroundColor: '#D0D0D0',
    height: '100%',
    width: '100%',
  },
  dealTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dealTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dealInfo: {
    padding: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00BFA5',
  },
  oldPrice: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  storeName: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  categoryButton: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
  },
});
