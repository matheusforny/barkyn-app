import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [arrayOfSelectedProducts, setArrayOfSelectedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userForm, setUserForm] = useState({});

    const handleArrayOfSelectedProducts = (newProduct) => {
        let newArray = arrayOfSelectedProducts;

        newArray.push(newProduct);

        setArrayOfSelectedProducts([...newArray]);
    }

    const contextProps = {
        products,
        arrayOfSelectedProducts,
        selectedProduct,
        userForm,
        setProducts,
        handleArrayOfSelectedProducts,
        setSelectedProduct,
        setUserForm
    }

    return (
        <AppContext.Provider value={contextProps}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return useContext(AppContext);
}