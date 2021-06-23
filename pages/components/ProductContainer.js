import React, { useState } from 'react';
import { useAppContext } from '../../context/state';
import { Button, Container } from '@material-ui/core';
import styles from '../../styles/ProductContainer.module.scss'

const ProductContainer = ({product}) => {
  const {handleArrayOfSelectedProducts, setModalOpen} = useAppContext();
  const [sizeSelected, setSizeSelected] = useState(null);
  const [colorIndexSelected, setColorIndexSelected] = useState(0);

  const renderSelectedOptions = () => {
    return <div>
      <div>
        {product.sizes.map((option, index) =>
          <Button
            key={index}
            style={{backgroundColor: sizeSelected === option ? 'gray' : '#f0eded'}}
            onClick={() => setSizeSelected(option)}
            disabled={!product.sizes.includes(option)}>
              {option}
          </Button>
        )}
      </div>
      <br/>
      <div>
        {product.colors.map((color, index) =>
          <Button
            key={index}
            className={styles.colorButton}
            style={{backgroundColor: color, color: color.toLowerCase() === 'black' ? 'white' : 'black'}}
            onClick={() => setColorIndexSelected(index)}>
            {colorIndexSelected === index ? '●' : ''}
          </Button>
        )}
      </div>
      <br/>
      <Button variant="contained" disabled={sizeSelected === null} onClick={() => onConfirm()}>Add to Cart?</Button>
      <br/>
      <br/>
    </div>
  }
  
  const onConfirm = () => {
    handleArrayOfSelectedProducts({...product, sizeSelected: sizeSelected, colorSelected: product.colors[colorIndexSelected]});

    setModalOpen(true);
  }

  return (
    <Container className={styles.informationItem}>
      <div className={styles.imageDisplayer} style={{backgroundImage:'url(' + product.imageUrl[colorIndexSelected] + ')'}}></div>
      <br/>
      <div>€ {product.price}</div>
      <p className={styles.priceText}>{product.name}</p>
      {renderSelectedOptions()}
    </Container>
  )
}

ProductContainer.getInitialProps = async (ctx) => {
    return { props: {product: {}} }
  }

export default ProductContainer;