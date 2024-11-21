import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const addMenuItem = (item) => {
        setMenuItems((prevItems) => [...prevItems, item]);
    };

    const removeMenuItem = (itemId) => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        deselectMenuItem(itemId); 
    };
 
    const deselectMenuItem = (itemId) => {
        setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId));
    };

    const selectMenuItem = (itemId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(itemId) ? prevSelected : [...prevSelected, itemId]
        );
    };

    const getVisibleMenuItems = () => {
        return menuItems.filter((item) => selectedItems.includes(item.id));
    };

    return (
        <MenuContext.Provider
            value={{
                menuItems,
                selectedItems,
                addMenuItem,
                removeMenuItem,
                selectMenuItem,
                deselectMenuItem,
                getVisibleMenuItems,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};