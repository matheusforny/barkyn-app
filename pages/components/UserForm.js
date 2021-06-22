import React, { useState } from 'react';
import { useAppContext } from '../../context/state';

const UserForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAdress] = useState('');
  const [userPostalCode, setUserPostalCode] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userPhone, setUserPhone] = useState('');

  //Since I will look up an external component library to better draw the form, I'm using a barebone approach now 
  return (
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
        <input type="tel"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={userPhone} required onChange={(event) => setUserPhone(event.target.value)}/>
      </label>
      <br/>
      <br/>
      <div style={{display: 'flex', alignContent: 'space-between'}}>
        <button>Save</button>
        &nbsp;
        <button>Submit</button>
      </div>
    </form>
  )
}

export default UserForm;