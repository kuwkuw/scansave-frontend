import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
  store?: string;
  image?: string;
  bestPrice?: number;
};

export default function ShoppingListScreen() {
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: '1',
      name: 'Milk 2.5%, 1L',
      quantity: 1,
      completed: false,
      store: 'SuperMart',
      bestPrice: 49.90,
      image: 'placeholder',
    },
    {
      id: '2',
      name: 'Whole Grain Bread',
      quantity: 2,
      completed: false,
      bestPrice: 29.99,
    },
    {
      id: '3',
      name: 'Free Range Eggs',
      quantity: 1,
      completed: true,
      store: 'FreshCo',
      bestPrice: 69.99,
      image: 'placeholder',
    },
  ]);
  const [newItemName, setNewItemName] = useState('');

  const addItem = () => {
    if (newItemName.trim()) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: newItemName.trim(),
          quantity: 1,
          completed: false,
        },
      ]);
      setNewItemName('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.bestPrice || 0) * item.quantity, 0);
  };

  const adjustQuantity = (id: string, increment: boolean) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1)) }
        : item
    ));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E3F2FD', dark: '#0D47A1' }}
      headerImage={
        <Ionicons
          name="cart"
          size={310}
          color={Platform.select({ ios: '#2196F3', android: '#42A5F5' })}
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Shopping List</ThemedText>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newItemName}
            onChangeText={setNewItemName}
            placeholder="Add new item..."
            placeholderTextColor="#666"
            onSubmitEditing={addItem}
            accessibilityLabel="New item input"
          />
          <TouchableOpacity
            onPress={addItem}
            style={styles.addButton}
            accessibilityLabel="Add item button"
          >
            <Ionicons name="add-circle" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {items.map((item) => (
          <ThemedView key={item.id} style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => toggleItem(item.id)}
              style={styles.itemRow}
              accessibilityLabel={`Toggle ${item.name}`}
            >
              <Ionicons
                name={item.completed ? 'checkbox' : 'square-outline'}
                size={24}
                color={item.completed ? '#4CAF50' : '#666'}
              />
              
              {item.image ? (
                <View style={styles.imageContainer}>
                  <View style={styles.imagePlaceholder} />
                </View>
              ) : null}
              
              <View style={styles.itemDetails}>
                <ThemedText
                  style={[
                    styles.itemName,
                    item.completed && styles.completedItem,
                  ]}>
                  {item.name}
                </ThemedText>
                
                <View style={styles.itemMetadata}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() => adjustQuantity(item.id, false)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="remove" size={16} color="#666" />
                    </TouchableOpacity>
                    <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
                    <TouchableOpacity
                      onPress={() => adjustQuantity(item.id, true)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="add" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  {item.bestPrice && (
                    <ThemedText style={styles.price}>
                      {(item.bestPrice * item.quantity).toFixed(2)} грн
                    </ThemedText>
                  )}
                </View>
                
                {item.store && (
                  <ThemedText style={styles.storeText}>{item.store}</ThemedText>
                )}
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  accessibilityLabel={`Edit ${item.name}`}
                >
                  <Ionicons name="pencil-outline" size={20} color="#2196F3" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  accessibilityLabel={`Remove ${item.name}`}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ThemedView>
        ))}

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <ThemedText style={styles.totalLabel}>Total:</ThemedText>
            <ThemedText style={styles.totalAmount}>
              {calculateTotal().toFixed(2)} грн
            </ThemedText>
          </View>
          
          <TouchableOpacity
            style={styles.optimizeButton}
            accessibilityLabel="Optimize shopping trip"
          >
            <Ionicons name="analytics-outline" size={24} color="#FFFFFF" />
            <ThemedText style={styles.optimizeButtonText}>
              Optimize Trip
            </ThemedText>
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  addButton: {
    padding: 8,
  },
  itemContainer: {
    backgroundColor: Platform.select({ ios: '#FFFFFF99', android: '#FFFFFF', web: '#FFFFFF' }),
    borderRadius: 8,
    marginBottom: 8,
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
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    backgroundColor: '#E0E0E0',
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    gap: 4,
  },
  itemMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 4,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BFA5',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    padding: 4,
  },
  footer: {
    marginTop: 24,
    gap: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00BFA5',
  },
  optimizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BFA5',
    borderRadius: 24,
    paddingVertical: 12,
    gap: 8,
  },
  optimizeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  itemName: {
    fontSize: 16,
    color: '#333333',
  },
  completedItem: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  storeText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
});
