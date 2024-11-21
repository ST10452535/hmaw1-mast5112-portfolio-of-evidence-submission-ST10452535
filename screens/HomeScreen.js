import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { MenuContext } from '../MenuContext';

const HomeScreen = ({ navigation }) => {
    const { menuItems, selectedItems, selectMenuItem, deselectMenuItem } = useContext(MenuContext);

    const displayedItems = menuItems.filter(item => selectedItems.includes(item.id));

    const toggleSelection = useCallback((itemId) => {
        if (selectedItems.includes(itemId)) {
            deselectMenuItem(itemId);
        } else {
            selectMenuItem(itemId);
        }
    }, [selectedItems, selectMenuItem, deselectMenuItem]);

    const calculateAveragePrice = (course) => {
        const courseItems = displayedItems.filter(item => item.course === course);
        const totalPrice = courseItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        return courseItems.length > 0 ? (totalPrice / courseItems.length).toFixed(2) : '0.00';
    };

    const renderItem = useCallback(({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => toggleSelection(item.id)}
            >
                <Text style={styles.selectButtonText}>
                    {selectedItems.includes(item.id) ? 'Deselect' : 'Select'}
                </Text>
            </TouchableOpacity>
        </View>
    ), [selectedItems, toggleSelection]);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../assets/fab-food-home.png')}
                style={styles.headerImage}
            />
            {displayedItems.length > 0 ? (
                <FlatList
                    data={displayedItems}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.noItemsText}>No dishes selected. Please add or filter dishes.</Text>
            )}
            <Text style={styles.totalDishes}>Total Dishes: {displayedItems.length}</Text>

            {/* Average Prices for each course */}
            <View style={styles.averagePricesContainer}>
                <Text style={styles.averagePriceTitle}>Average Prices by Course:</Text>
                <Text style={styles.averagePrice}>Starter: ${calculateAveragePrice('Starter')}</Text>
                <Text style={styles.averagePrice}>Main: ${calculateAveragePrice('Main')}</Text>
                <Text style={styles.averagePrice}>Dessert: ${calculateAveragePrice('Dessert')}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover', 
        borderRadius: 12, 
        marginBottom: 20,
        overflow: 'hidden', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1, 
        borderColor: '#ddd', 
    },
    itemImage: {
        width: '100%',
        height: 180,
        borderRadius: 12, 
        marginBottom: 12,
        resizeMode: 'cover', 
    },
    itemName: {
        fontSize: 20,
        fontWeight: '600', 
        color: '#333',
        marginBottom: 6,
    },
    itemDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 12,
    },
    itemPrice: {
        fontSize: 18,
        color: '#2f8d46', 
        fontWeight: 'bold',
        marginBottom: 12,
    },
    selectButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'flex-start',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 3,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    totalDishes: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    noItemsText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 40,
    },
    averagePricesContainer: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#f4f4f4',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 3,
    },
    averagePriceTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        color: '#333',
    },
    averagePrice: {
        fontSize: 18,
        color: '#2f8d46',
        fontWeight: 'bold',
        marginVertical: 8,
    },
});

export default HomeScreen;
