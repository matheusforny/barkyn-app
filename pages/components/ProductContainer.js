import React, { useState } from 'react';
import { useAppContext } from '../../context/state';

const sizeOptions = ["P", "M", "G"];

const ProductContainer = ({index, product, isSelected}) => {
  const {setSelectedProduct, handleArrayOfSelectedProducts} = useAppContext();
  const [sizeSelected, setSizeSelected] = useState(null);
  const [colorIndexSelected, setColorIndexSelected] = useState(0);

  const renderSelectedOptions = () => {
    return <div>
      <div>
        {sizeOptions.map((option) =>
          <button
            style={{backgroundColor: sizeSelected === option ? 'gray' : 'white'}}
            onClick={() => setSizeSelected(option)}
            disabled={!product.sizes.includes(option)}>
              {option}
          </button>
        )}
      </div>
      <br/>
      <div>
        {product.colors.map((color, index) =>
          <button
            style={{backgroundColor: colorIndexSelected === index ? 'gray' : 'white'}}
            onClick={() => setColorIndexSelected(index)}>
              {color}
          </button>
        )}
      </div>
      <br/>
      <button disabled={sizeSelected === null} onClick={() => onConfirm()}>Add to Cart?</button>
    </div>
  }
  
  const onConfirm = () => {
    handleArrayOfSelectedProducts({...product, sizeSelected: sizeSelected, colorSelected: product.colors[colorIndexSelected]});
  }

  return (
    <div style={{border: '1px solid black', borderRadius: '5px', minWidth: '17.5%', textAlign: 'center', cursor: isSelected ? 'default' : 'pointer'}} onClick={() => !isSelected ? setSelectedProduct(index) : {}}>
      <div style={{border: '1px solid black', borderRadius: '5px', height: '300px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage:'url(' + product.imageUrl[colorIndexSelected] + ')'}}></div>
      <div>€ {product.price}</div>
      <p style={{fontWeight: 'bolder'}}>{product.name}</p>
        {isSelected && renderSelectedOptions()}
      </div>
  )
}

ProductContainer.getInitialProps = async (ctx) => {
    return { props: {product: {}} }
  }

export default ProductContainer;

//TODO: Properly add the styles
//Add a blur over the screen if the product was selected