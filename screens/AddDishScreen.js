import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { MenuContext } from '../MenuContext';
import { launchImageLibrary } from 'react-native-image-picker';

const AddDishScreen = () => {
    const [dish, setDish] = useState('');
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [price, setPrice] = useState('');
    const { menuItems, addMenuItem, removeMenuItem, selectMenuItem, deselectMenuItem, selectedItems } = useContext(MenuContext);


    const addDish = () => {
        if (!dishName || !description || !selectedCourse || !price) {
            alert('Please fill out all fields');
            return;
        }
        const newDish = {
            id: Math.random().toString(),
            image: dish,
            name: dishName,
            description,
            course: selectedCourse,
            price,
        };

        addMenuItem(newDish);
        setDish('');
        setDishName('');
        setDescription('');
        setSelectedCourse('');
        setPrice('');
    };

    const selectImage = () => {
        const options = { mediaType: 'photo', maxWidth: 300, maxHeight: 300, quality: 1 };

        launchImageLibrary(options, (response) => {
            if (!response.didCancel && response.assets) {
                const uri = response.assets[0].uri;
                setDish(uri);
            } else {
                console.log('User cancelled image picker');
            }
        });
    };

    const toggleSelection = (itemId) => {
        if (selectedItems.includes(itemId)) {
            deselectMenuItem(itemId);
        } else {
            selectMenuItem(itemId);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Image</Text>
            <Button title="Select Image" onPress={selectImage} />
            {dish ? (
                <Image source={{ uri: dish }} style={styles.imagePreview} />
            ) : (
                <Text style={styles.label}>No Image Selected</Text>
            )}

            <Text style={styles.label}>Dish Name</Text>
            <TextInput style={styles.input} placeholder="Dish Name" value={dishName} onChangeText={setDishName} />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.radioGroup}>
                {['Starter', 'Main', 'Dessert'].map((course) => (
                    <TouchableOpacity
                        key={course}
                        style={[
                            styles.radioOption,
                            selectedCourse === course && styles.radioSelected,
                        ]}
                        onPress={() => setSelectedCourse(course)}
                    >
                        <Text
                            style={[
                                styles.radioText,
                                selectedCourse === course && styles.radioTextSelected,
                            ]}
                        >
                            {course}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            
            <Button title="Add Dish" onPress={addDish} color="#007bff" />
            
            <Text style={styles.label}>Existing Menu Items</Text>
            {menuItems.length > 0 ? (
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.menuItem}>
                            <Image source={{ uri: item.image }} style={styles.imagePreview} />
                            <Text style={styles.menuText}>{item.name}</Text>
                            <Switch
                                value={selectedItems.includes(item.id)}
                                onValueChange={() => toggleSelection(item.id)}
                            />
                            <Button title="Remove" onPress={() => removeMenuItem(item.id)} />
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noItemsText}>No menu items available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#fff' 
    },
    label: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginVertical: 8, 
        color: '#333' 
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 12, 
        borderRadius: 10, 
        marginBottom: 16 
    },
    imagePreview: { 
        width: 100, 
        height: 100, 
        marginVertical: 8, 
        borderRadius: 8 
    },
    radioGroup: { 
        flexDirection: 'row', 
        marginVertical: 16, 
        justifyContent: 'space-around' 
    },
    radioOption: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#007bff',
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    radioSelected: {
        backgroundColor: '#007bff',
        borderColor: '#0056b3',
    },
    radioText: {
        fontSize: 16,
        color: '#007bff',
    },
    radioTextSelected: {
        color: '#fff',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    menuText: { 
        marginHorizontal: 8, 
        flex: 1, 
        fontWeight: 'bold' 
    },
    noItemsText: { 
        fontSize: 16, 
        color: '#666', 
        textAlign: 'center', 
        marginVertical: 16 
    },
});

export default AddDishScreen;
