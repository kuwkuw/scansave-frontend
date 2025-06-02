import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Offer = {
  id: string;
  title: string;
  store: string;
  validUntil: string;
  image: string;
  description: string;
  discount: number;
};

const dummyOffers: Offer[] = [
  {
    id: '1',
    title: 'Weekend Sale on Fresh Produce',
    store: 'Silpo',
    validUntil: '2025-06-09',
    image: 'placeholder',
    description: 'Up to 30% off on fresh fruits and vegetables',
    discount: 30,
  },
  {
    id: '2',
    title: 'Dairy Products Special',
    store: 'ATB',
    validUntil: '2025-06-07',
    image: 'placeholder',
    description: 'Buy 2 Get 1 Free on all dairy products',
    discount: 33,
  },
  {
    id: '3',
    title: 'Meat & Poultry Discount',
    store: 'Novus',
    validUntil: '2025-06-05',
    image: 'placeholder',
    description: '25% off on selected meat products',
    discount: 25,
  },
];

const filterCategories = [
  'All',
  'Groceries',
  'Fresh Produce',
  'Meat & Poultry',
  'Dairy',
  'Bakery',
];

export default function OffersScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const OfferCard = ({ offer }: { offer: Offer }) => (
    <TouchableOpacity style={styles.offerCard} accessibilityLabel={`View ${offer.title} offer details`}>
      <View style={styles.offerImageContainer}>
        <View style={styles.offerImage} />
        <View style={styles.discountTag}>
          <ThemedText style={styles.discountText}>{offer.discount}% OFF</ThemedText>
        </View>
      </View>
      <View style={styles.offerInfo}>
        <ThemedText style={styles.offerTitle}>{offer.title}</ThemedText>
        <View style={styles.offerMeta}>
          <View style={styles.storeInfo}>
            <Ionicons name="business-outline" size={16} color="#666666" />
            <ThemedText style={styles.storeText}>{offer.store}</ThemedText>
          </View>
          <View style={styles.validityInfo}>
            <Ionicons name="time-outline" size={16} color="#666666" />
            <ThemedText style={styles.validityText}>
              Until {new Date(offer.validUntil).toLocaleDateString()}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.description} numberOfLines={2}>
          {offer.description}
        </ThemedText>
        <TouchableOpacity style={styles.viewButton}>
          <ThemedText style={styles.viewButtonText}>View Details</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F5E9', dark: '#1B5E20' }}
      headerImage={
        <Ionicons
          name="pricetag"
          size={310}
          color="#00BFA5"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Special Offers</ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {filterCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterPill,
                selectedFilter === category && styles.filterPillActive,
              ]}
              onPress={() => setSelectedFilter(category)}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  selectedFilter === category && styles.filterTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={dummyOffers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OfferCard offer={item} />}
          contentContainerStyle={styles.offersList}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerIcon: {
    bottom: -90,
    left: -35,
    position: 'absolute',
    opacity: 0.7,
  },
  filterScroll: {
    marginVertical: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterPillActive: {
    backgroundColor: '#00BFA5',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  offersList: {
    gap: 16,
  },
  offerCard: {
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
    }),
  },
  offerImageContainer: {
    height: 200,
    backgroundColor: '#F0F0F0',
    position: 'relative',
  },
  offerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D0D0D0',
  },
  discountTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  offerInfo: {
    padding: 16,
    gap: 12,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  offerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeText: {
    fontSize: 14,
    color: '#666666',
  },
  validityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  validityText: {
    fontSize: 14,
    color: '#666666',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  viewButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
