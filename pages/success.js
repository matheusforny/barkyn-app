import styles from '../styles/Success.module.scss'
import { useAppContext } from '../context/state';

const CheckoutPage = () => {
    const {userMailForm} = useAppContext();
  
    return (
      <div className={styles.textArea}>
        <div>
          <p className={styles.orderPlacedText}>Your order has been placed, {userMailForm.userName}!</p>
        </div>
        <br/>
        <p className={styles.mailingText}>Your selections will be sent to: {userMailForm.userAddress}, {userMailForm.userPostalCode}, {userMailForm.userCountry}</p>
        <br/>
        <p className={styles.thanksText}>Thanks for buying with us!</p>
      </div>
    );
  }

export default CheckoutPage;