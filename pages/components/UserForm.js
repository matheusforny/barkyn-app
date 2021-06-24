import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/state';
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import styles from '../../styles/UserForm.module.scss';
import ReactInputMask from 'react-input-mask';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { calculateTotalPrice } from '../../helper/Helper';

const UserForm = () => {
  const router = useRouter();

  const {arrayOfSelectedProducts, setArrayOfSelectedProducts, handleUserMailForm} = useAppContext();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAdress] = useState('');
  const [userPostalCode, setUserPostalCode] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);

  const [invalidComponents, setInvalidComponents] = useState(new Array().fill(true));

  const [localStorageUserMailForm, setLocalStorageUserMailForm] = useLocalStorage('userMailingForm', {});

  useEffect(() => {
    if (typeof localStorageUserMailForm === 'object') {
      setUserName(localStorageUserMailForm.userName);
      setUserEmail(localStorageUserMailForm.userEmail);
      setUserAdress(localStorageUserMailForm.userAddress);
      setUserPostalCode(localStorageUserMailForm.userPostalCode);
      setUserCountry(localStorageUserMailForm.userCountry);
      setUserPhone(localStorageUserMailForm.userPhone);
    }
  }, []);

  // Hook
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };

    return [storedValue, setValue];
  }

  const clearForm = () => {
    setUserName('');
    setUserEmail('');
    setUserAdress('');
    setUserPostalCode('');
    setUserCountry('');
    setUserPhone('');
    
    setInvalidComponents(new Array().fill(true));
  }

  const onSave = () => {
    let arrayOfInvalidComponents = createInvalidComponentsArray();
    let formObject = createFormObject();

    if (arrayOfInvalidComponents.every(value => value === false)) {
      setLocalStorageUserMailForm(formObject);

      handleUserMailForm(formObject);
    } else {
      setInvalidComponents(arrayOfInvalidComponents);
    }
  }

  const onPlaceOrder = () => {
    let arrayOfInvalidComponents = createInvalidComponentsArray();

    if (arrayOfInvalidComponents.every(value => value === false)) {
      setModalOpen(true);
    } else {
      setInvalidComponents(arrayOfInvalidComponents);
    }
  }

  const onSubmit = () => {
    let formObject = createFormObject();
    
    handleUserMailForm(formObject);

    //To simulate the purchase, we are emptying the cart
    setArrayOfSelectedProducts([]);

    router.push('/success');
  }

  const createFormObject = () => {
    return {
      userName: userName,
      userEmail: userEmail,
      userAddress: userAddress,
      userPostalCode: userPostalCode,
      userCountry: userCountry,
      userPhone: userPhone
    };
  }

  const createInvalidComponentsArray = () => {
    let result = [];

    result.push(verifyIfComponentIsInvalid('text', userName));
    result.push(verifyIfComponentIsInvalid('email', userEmail));
    result.push(verifyIfComponentIsInvalid('text', userAddress));
    result.push(verifyIfComponentIsInvalid('zip', userPostalCode));
    result.push(verifyIfComponentIsInvalid('text', userCountry));
    result.push(verifyIfComponentIsInvalid('phone', userPhone));

    return result;
  }

  const verifyIfComponentIsInvalid = (componentType, componentValue) => {
    switch (componentType) {
      case 'text':
        return componentValue === '';
      case 'email':
        return componentValue === '';
      case 'zip':
        return componentValue === '' || componentValue.length !== 9 || componentValue.indexOf(' ') >= 0;
      case 'phone':
        return componentValue === '';
      default:
        return false;
    }
  }

  return (
    <div>
      <p>Mailing Info</p>
      <form className={styles.form}>
        <TextField
          className={styles.inputComponent}
          label="Full Name"
          value={userName}
          error={invalidComponents[0]}
          helperText={invalidComponents[0] ? "Text must not be empty" : ""}
          onChange={(event) => setUserName(event.target.value)}/>
        <br/>
        <br/>
        <TextField
          className={styles.inputComponent}
          label="E-Mail"
          value={userEmail}
          error={invalidComponents[0]}
          helperText={invalidComponents[1] ? "E-mail must be properly entered" : ""}
          onChange={(event) => setUserEmail(event.target.value)}/>
        <br/>
        <br/>
        <TextField
          className={styles.inputComponent}
          label="Adress"
          value={userAddress}
          error={invalidComponents[2]}
          helperText={invalidComponents[2] ? "Text must not be empty" : ""}
          onChange={(event) => setUserAdress(event.target.value)}/>
        <br/>
        <br/>
        <ReactInputMask
          mask="99999-999"
          value={userPostalCode}
          maskChar=""
          onChange={(event) => setUserPostalCode(event.target.value)}>
          {() => <TextField
            className={styles.inputComponent}
            label="Postal Code"
            error={invalidComponents[3]}
            helperText={invalidComponents[3] ? "Zip Code must follow the 99999-999 pattern" : ""}/>
          }
        </ReactInputMask>
        <br/>
        <br/>
        <TextField
          className={styles.inputComponent}
          label="Country"
          value={userCountry}
          error={invalidComponents[4]}
          helperText={invalidComponents[4] ? "Text must not be empty" : ""}
          onChange={(event) => setUserCountry(event.target.value)}/>
        <br/>
        <br/>
        <ReactInputMask
          mask="(99) 99999-9999"
          value={userPhone}
          maskChar=" "
          onChange={(event) => setUserPhone(event.target.value)}>
          {() => <TextField
            className={styles.inputComponent}
            label="Phone Number"
            error={invalidComponents[5]}
            helperText={invalidComponents[5] ? "Text must not be empty" : ""}/>
          }
        </ReactInputMask>
        </form>
      <br/>
      <div className={styles.buttonRow}>
        <Button variant="outlined" color="secondary" onClick={() => clearForm()}>Clear</Button>
        <Button variant="outlined" color="primary" onClick={() => onSave()}>Save</Button>
      </div>
      <br/>
      <br/>
      <Button variant="contained" color="primary" disabled={arrayOfSelectedProducts.length === 0} onClick={() => onPlaceOrder()}>Place Your Order</Button>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}>
        <DialogTitle id="alert-dialog-slide-title">Submit Purchase?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your order is € {calculateTotalPrice(arrayOfSelectedProducts)}. Do you wish to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant="outlined" color="primary" onClick={() => onSubmit()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserForm;

//Todo: Using the new form options, validate the flag with the form values