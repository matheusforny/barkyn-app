import styles from '../styles/Success.module.css'
import { useAppContext } from '../context/state';
import { calculateTotalPrice } from '../helper/Helper';

const CheckoutPage = () => {
    const {arrayOfSelectedProducts, userMailForm} = useAppContext();
  
    return (
      <div className={styles.container}>
        <div style={{display: 'inline'}}>
          Thanks for your product, {userMailForm.userName}!
          <div style={{display: 'inline'}}>
            {arrayOfSelectedProducts.map((product) =>
              <p>{product.name}, size {product.sizeSelected}, color {product.colorSelected}</p>
            )}
          </div>
          {arrayOfSelectedProducts.length > 0 && <p>Total Price: {calculateTotalPrice(arrayOfSelectedProducts)}</p>} 
        </div>
        <br/>
        <br/>
        Your selections will be sent to:
        <br/>
        <br/>
        {userMailForm.userAddress}, {userMailForm.userPostalCode}, {userMailForm.userCountry}
      </div>
    );
  }

export default CheckoutPage;