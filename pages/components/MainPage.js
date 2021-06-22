import React, { Component } from 'react';
import {ProductContainer} from './ProductContainer';
import Link from 'next/link';

export class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productSelected: null,
            arrayOfSelectedProducts: []
        }

        this.onSelectProduct = this.onSelectProduct.bind(this);
        this.onConfirmProduct = this.onConfirmProduct.bind(this);
    }

    onSelectProduct = (index) => {
        this.setState({productSelected: index});
    }

    onConfirmProduct = (product) => {
        this.setState(prevState => {
            let prevStatearrayOfSelectedProducts = prevState.arrayOfSelectedProducts;
            
            prevStatearrayOfSelectedProducts.push(product);
                
            return {productSelected: null, arrayOfSelectedProducts: prevStatearrayOfSelectedProducts}
        });
    }

    //Since my background is with react-redux and not with next.js, this is a workaround to avoid losing time implementing all of the reducers and services necessary on react-redux
    componentDidMount(){
        fetch('http://localhost:3000/api/product')
            .then(response=>response.json())
            .then(response=>this.setState({products: response}))
    }

    render() {
        return (
            <div style={{display: 'inline'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '1200px'}}>
                    {this.state.products.map((product, index) =>
                        <ProductContainer
                            index={index}
                            product={product}
                            isSelected={index === this.state.productSelected}
                            onSelect={this.onSelectProduct}
                            onConfirm={this.onConfirmProduct}/>
                    )}
                </div>
                <br/>
                {this.state.arrayOfSelectedProducts.length > 0 && 'Selected Products:'}
                <div style={{display: 'inline'}}>
                    {this.state.arrayOfSelectedProducts.map((product) =>
                        <p>{product.name}, size {product.sizeSelected}, color {product.colorSelected}</p>
                    )}
                </div>
                <br/>
                {this.state.arrayOfSelectedProducts.length > 0 && <Link href="/checkout">Proceed to Checkout</Link>}
            </div>
        )
    }
}

//TODO: Fix the div placement and css
//TODO: Mobile friendly