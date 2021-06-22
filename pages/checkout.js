import styles from '../styles/Home.module.css'
import { useAppContext } from '../context/state';

const CheckoutPage = ({props}) => {
    const {arrayOfSelectedProducts} = useAppContext();
  
    const calculateTotalPrice = () => {
      let totalValue = 0;
  
      for (let index = 0; index < arrayOfSelectedProducts.length; index++) {
        totalValue += arrayOfSelectedProducts[index].price;
      }
  
      return totalValue;
    }
  
    return (
      <div className={styles.container}>
        <div style={{display: 'inline'}}>
          {arrayOfSelectedProducts.length > 0 && 'Cart Summary:'}
          <div style={{display: 'inline'}}>
            {arrayOfSelectedProducts.map((product) =>
              <p>{product.name}, size {product.sizeSelected}, color {product.colorSelected}</p>
            )}
          </div>
          {arrayOfSelectedProducts.length > 0 && <p>Total Price: {calculateTotalPrice()}</p>} 
        </div>
      </div>
    );
  }

export default CheckoutPage;