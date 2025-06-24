import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image as RNImage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

export type Offer = {
  id: string;
  title: string;
  store: string;
  validUntil: string;
  image: string;
  description: string;
  discount: number;
};

interface OfferCardProps {
  offer: Offer;
  onPress: (id: string) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.offerCard}
      accessibilityLabel={`View ${offer.title} offer details`}
      onPress={() => onPress(offer.id)}
    >
      <View style={styles.offerImageContainer}>
        {offer.image && offer.image !== 'placeholder' ? (
          <RNImage
            source={{ uri: offer.image }}
            style={styles.offerImage}
            resizeMode="cover"
            accessibilityLabel={`${offer.title} image`}
          />
        ) : (
          <View style={[styles.offerImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}> 
            <Ionicons name="image-outline" size={40} color="#ccc" />
          </View>
        )}
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
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => onPress(offer.id)}
        >
          <ThemedText style={styles.viewButtonText}>View Details</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  offerImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#00BFA5',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  offerInfo: {
    padding: 12,
  },
  offerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00BFA5',
  },
  offerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  validityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  validityText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: '#00BFA5',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerIcon: {
    position: 'absolute',
    top: -60,
    left: -30,
    opacity: 0.15,
  },
  filterBar: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#00BFA5',
  },
});
