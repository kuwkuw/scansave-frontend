import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { OfferCard, Offer } from '@/components/cards/OfferCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePaginatedOffers, useCategories } from '@/hooks/useProducts';
import { useLocalSearchParams, router } from 'expo-router';
import { useOffersFilter } from '../../context/OffersFilterContext';


export default function OffersScreen() {
  const { selectedFilter, setSelectedFilter } = useOffersFilter();
  const { products, total, isInitialLoading, isFetchingMore, error, fetchMore, refreshing, refresh } = usePaginatedOffers({
    limit: 20,
    category: selectedFilter !== 'All' ? selectedFilter : undefined,
  });
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Aggregate unique categories from products (replaced by backend categories)
  const filterCategories = ['All', ...categories];

  // Transform products to Offer-like objects for display
  const offers = products.map((p) => ({
    id: p.id.toString(),
    title: p.name,
    store: p.store,
    validUntil: p.lastUpdated,
    image: p.imageUrl || 'placeholder',
    description: p.category,
    discount: p.oldPrice && p.oldPrice > p.price ? Math.round(100 * (1 - p.price / p.oldPrice)) : 0,
  }));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0F7FA', dark: '#263238' }}
      headerImage={
        <Ionicons
          name="pricetag"
          size={230}
          color="#00BFA5"
          style={styles.headerIcon}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Offers</ThemedText>
        {/* Dynamic filter bar based on product categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {categoriesLoading ? (
            <ActivityIndicator size="small" color="#00BFA5" style={{ marginVertical: 8 }} />
          ) : categoriesError ? (
            <ThemedText style={{ color: 'red' }}>{categoriesError}</ThemedText>
          ) : (
            filterCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedFilter === category && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(category)}
            >
              <ThemedText
                style={[
                  styles.filterButtonText,
                  selectedFilter === category && styles.filterButtonTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {isInitialLoading && products.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
            <ActivityIndicator size="large" color="#00BFA5" />
          </View>
        ) : error ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 48 }}>
            <Ionicons name="alert-circle-outline" size={64} color="#FF7043" style={{ marginBottom: 16 }} />
            <ThemedText style={{ color: '#FF7043', fontSize: 18, textAlign: 'center', marginBottom: 12 }}>
              {error}
            </ThemedText>
            <TouchableOpacity
              style={{ backgroundColor: '#00BFA5', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }}
              onPress={refresh}
            >
              <ThemedText style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Retry</ThemedText>
            </TouchableOpacity>
          </View>
        ) : products.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 48 }}>
            <Ionicons name="pricetag-outline" size={64} color="#B0BEC5" style={{ marginBottom: 16 }} />
            <ThemedText style={{ color: '#888', fontSize: 18, textAlign: 'center' }}>
              No offers found for this filter.
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={offers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OfferCard offer={item} onPress={(id) => router.push(`/product-details/${id}`)} />
            )}
            contentContainerStyle={styles.offersList}
            showsVerticalScrollIndicator={false}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            onRefresh={refresh}
            ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#00BFA5" style={{ marginVertical: 16 }} /> : null}
          />
        )}
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
  filterBar: {
    marginVertical: 16,
    paddingHorizontal: 8,
    flexGrow: 0,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#00BFA5',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  offersList: {
    gap: 16,
  },  offerCard: {
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
