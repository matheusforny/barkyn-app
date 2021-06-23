import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [arrayOfSelectedProducts, setArrayOfSelectedProducts] = useState([]);
    const [userMailForm, setUserMailForm] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    const handleArrayOfSelectedProducts = (newProduct) => {
        let newArray = arrayOfSelectedProducts;

        newArray.push(newProduct);

        setArrayOfSelectedProducts([...newArray]);
    }

    const removeItemFromSelectedProducts = (index) => {
        let newArray = arrayOfSelectedProducts;

        newArray.splice(index, 1);

        setArrayOfSelectedProducts([...newArray]);
    }

    const handleUserMailForm = (newUserMailForm) => {        
        setUserMailForm({...newUserMailForm})
    }

    const contextProps = {
        products,
        arrayOfSelectedProducts,
        userMailForm,
        isModalOpen,
        setProducts,
        handleArrayOfSelectedProducts,
        removeItemFromSelectedProducts,
        handleUserMailForm,
        setModalOpen
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