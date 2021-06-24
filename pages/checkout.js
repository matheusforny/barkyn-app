import { useAppContext } from '../context/state';
import UserForm from './components/UserForm';
import { calculateTotalPrice } from '../helper/Helper';
import styles from '../styles/Checkout.module.scss'
import { Button } from '@material-ui/core';

const CheckoutPage = () => {
    const {arrayOfSelectedProducts, removeItemFromSelectedProducts} = useAppContext();

    return (
      <div>
        <div className={styles.pageLayout}>
          <div>
            {arrayOfSelectedProducts.length > 0 ?
              <div className={styles.productsReview}>
                <div>
                  {arrayOfSelectedProducts.map((product, index) =>
                    <div className={styles.productEntry}>
                      <div>A {product.name.toLowerCase()}, size {product.sizeSelected} and color {product.colorSelected.toLowerCase()}
                      &nbsp;
                      <Button color="secondary" onClick={() => removeItemFromSelectedProducts(index)}>X</Button></div>
                    </div>
                  )}
                </div>
                {arrayOfSelectedProducts.length > 0 && <p>Total Price: € {calculateTotalPrice(arrayOfSelectedProducts)}</p>} 
              </div> : 
              <div className={styles.productsReview}>
                You haven't selected anything yet!
              </div>
            }
          </div>
          <UserForm className={styles.userForm}/>
        </div>
      </div>
    );
  }

export default CheckoutPage;