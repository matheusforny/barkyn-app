import React, {useEffect} from 'react';
import { useAppContext } from '../context/state';
import styles from '../styles/Home.module.css'
import ProductContainer from './components/ProductContainer';
import Link from 'next/link';

const MainPage = ({props}) => {
  const {products, arrayOfSelectedProducts, selectedProduct, setProducts} = useAppContext();
  const {productsData} = props;

  useEffect(() => {
    if (typeof productsData === 'object' && productsData.length > 0) {
      setProducts(productsData);
    }
  }, []);

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
        <div style={{display: 'flex', justifyContent: 'space-between', width: '1200px'}}>
          {products.map((product, index) =>
            <ProductContainer
              index={index}
              product={product}
              isSelected={index === selectedProduct}/>
          )}
        </div>
        <br/>
        {arrayOfSelectedProducts.length > 0 && 'Selected Products:'}
        <div style={{display: 'inline'}}>
          {arrayOfSelectedProducts.map((product) =>
            <p>{product.name}, size {product.sizeSelected}, color {product.colorSelected}</p>
          )}
        </div>
        <p>Total Price: {calculateTotalPrice()}</p>
        {arrayOfSelectedProducts.length > 0 && <Link href="/checkout">Proceed to Checkout</Link>}
      </div>
    </div>
  );
}

MainPage.getInitialProps = async (props) => {
  const res = await fetch('http://localhost:3000/api/product');
  const data = await res.json();

  return {
    props: {
      productsData: data
    }
  }
}

export default MainPage;
