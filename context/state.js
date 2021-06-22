import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [arrayOfSelectedProducts, setArrayOfSelectedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleArrayOfSelectedProducts = (newProduct) => {
        let newArray = arrayOfSelectedProducts;

        newArray.push(newProduct);

        setArrayOfSelectedProducts([...newArray]);
    }

    const contextProps = {
        products,
        arrayOfSelectedProducts,
        selectedProduct,
        setProducts,
        handleArrayOfSelectedProducts,
        setSelectedProduct
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