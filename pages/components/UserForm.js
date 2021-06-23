import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/state';
import { useRouter } from 'next/router'

const UserForm = () => {
  const router = useRouter();

  const {handleUserMailForm} = useAppContext();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAdress] = useState('');
  const [userPostalCode, setUserPostalCode] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userPhone, setUserPhone] = useState('');

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

  const clearForm = () => {
    setUserName('');
    setUserEmail('');
    setUserAdress('');
    setUserPostalCode('');
    setUserCountry('');
    setUserPhone('');
  }

  const onSave = () => {
    let formObject = createFormObject();

    setLocalStorageUserMailForm(formObject);

    handleUserMailForm(formObject);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let formObject = createFormObject();
    handleUserMailForm(formObject);

    router.push("/success")
  }

  const validateForm = () => {
    //TODO: Validate the form, not only the empty values
    return userName !== '' && userEmail !== '' && userAddress !== '' && userPostalCode !== '' && userCountry !== '' && userPhone !== '';
  }

  //Since I will look up an external component library to better draw the form, I'm using a barebone approach now 
  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" value={userName} required onChange={(event) => setUserName(event.target.value)}/>
        </label>
        <br/>
        <br/>
        <label>
          E-Mail:
          <input type="email" value={userEmail} required onChange={(event) => setUserEmail(event.target.value)}/>
        </label>
        <br/>
        <br/>
        <label>
          Adress:
          <input type="text" value={userAddress} required onChange={(event) => setUserAdress(event.target.value)}/>
        </label>
        <br/>
        <br/>
        <label>
          Postal Code:
          <input type="zip" value={userPostalCode} required onChange={(event) => setUserPostalCode(event.target.value)}/>
        </label>
        <br/>
        <br/>
        <label>
          Country:
          <input type="text" value={userCountry} required onChange={(event) => setUserCountry(event.target.value)}/>
        </label>
        <br/>
        <br/>
        <label>
          Phone:
          <input type="tel"  pattern="[0-9]{5}-[0-9]{4}" value={userPhone} required onChange={(event) => setUserPhone(event.target.value)}/>
        </label>
        <br/>
        <br/>
        </form>
      <br/>
      <div style={{display: 'flex', alignContent: 'space-between'}}>
          <button onClick={() => onSave()}>Save</button>
        </div>
      <button onClick={() => clearForm()}>Clear</button>
      <br/>
      <br/>
      {validateForm() &&  <a href={"/success"} onClick={handleSubmit}>Submit</a>}
    </div>
  )
}

export default UserForm;

//Todo: Using the new form options, validate the flag with the form values