import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [arrayOfSelectedProducts, setArrayOfSelectedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userMailForm, setUserMailForm] = useState({});

    const handleArrayOfSelectedProducts = (newProduct) => {
        let newArray = arrayOfSelectedProducts;

        newArray.push(newProduct);

        setArrayOfSelectedProducts([...newArray]);
    }

    const handleUserMailForm = (newUserMailForm) => {        
        setUserMailForm({...newUserMailForm})
    }

    const contextProps = {
        products,
        arrayOfSelectedProducts,
        selectedProduct,
        userMailForm,
        setProducts,
        handleArrayOfSelectedProducts,
        setSelectedProduct,
        handleUserMailForm
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