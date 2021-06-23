import styles from '../styles/Home.module.css'
import { useAppContext } from '../context/state';
import UserForm from './components/UserForm';
import { calculateTotalPrice } from '../helper/Helper';

const CheckoutPage = () => {
    const {arrayOfSelectedProducts} = useAppContext();
  
    return (
      <div className={styles.container}>
        <div style={{display: 'inline'}}>
          {arrayOfSelectedProducts.length > 0 && 'Cart Summary:'}
          <div style={{display: 'inline'}}>
            {arrayOfSelectedProducts.map((product) =>
              <p>{product.name}, size {product.sizeSelected}, color {product.colorSelected}</p>
            )}
          </div>
          {arrayOfSelectedProducts.length > 0 && <p>Total Price: {calculateTotalPrice(arrayOfSelectedProducts)}</p>} 
        </div>
        <br/>
        <br/>
        Please, enter your mailing address:
        <br/>
        <br/>
        <UserForm/>
      </div>
    );
  }

export default CheckoutPage;