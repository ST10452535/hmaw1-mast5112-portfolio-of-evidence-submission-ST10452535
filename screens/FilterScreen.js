import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Image, Text, TouchableOpacity, Keyboard, ScrollView, SafeAreaView } from 'react-native';
import { MenuContext } from '../MenuContext';

const FilterScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { menuItems } = useContext(MenuContext);
  const [filteredItems, setFilteredItems] = useState([]);

  const filterDishes = () => {
    Keyboard.dismiss();
    if (search.trim() === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => {
        const matchesName = item.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCourse = item.course?. toLowerCase().includes(search.toLowerCase());; 
        return matchesName || matchesCourse; 
      });
      setFilteredItems(filtered);
    }
  };

  const selectDish = (item) => {
    navigation.navigate('DishDetail', { dish: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Search by name or course"
          value={search}
          onChangeText={setSearch}
        />
        <Button title="Filter" onPress={filterDishes} />
        {filteredItems.length === 0 ? (
          <Text style={styles.noItemsText}>No items match your search</Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString() || Math.random().toString()} // Ensure item.id is a string
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.selectButton} onPress={() => selectDish(item)}>
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 12, 
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, 
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777', 
    fontWeight: '600', 
  },
  itemContainer: {
    backgroundColor: '#fff', 
    padding: 20,
    marginVertical: 10,
    borderRadius: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6, 
  },
  itemImage: {
    width: '100%',
    height: 180,
    borderRadius: 12, 
    marginBottom: 12,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333', 
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  itemPrice: {
    fontSize: 18,
    color: '#007bff', 
    fontWeight: '600', 
    marginBottom: 12,
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterScreen;