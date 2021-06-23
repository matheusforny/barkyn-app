import React, {useEffect} from 'react';
import { useAppContext } from '../context/state';
import styles from '../styles/Home.module.scss'
import ProductContainer from './components/ProductContainer';

const MainPage = ({props}) => {
  const {products, setProducts} = useAppContext();
  const {productsData} = props;

  useEffect(() => {
    if (typeof productsData === 'object' && productsData.length > 0) {
      setProducts(productsData);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {products.map((product, index) =>
          <ProductContainer
            key={index}
            product={product}/>
        )}
      </div>
      <br/>
    </div>
  );
}

MainPage.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/product');
  const data = await res.json();

  return {
    props: {
      productsData: data
    }
  }
}

export default MainPage;