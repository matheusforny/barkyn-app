import React, { Component } from 'react';

const sizeOptions = ["P", "M", "G"];

export class ProductContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorSelected: 0,
            sizeSelected: ''
        }
    }

    renderSelectedOptions = () => {
        return <div>
            <div>
                {sizeOptions.map((option, index) =>
                    <button
                        style={{backgroundColor: this.state.sizeSelected === option ? 'gray' : 'white'}}
                        onClick={() => this.setState({sizeSelected: option})}
                        disabled={!this.props.product.sizes.includes(option)}>
                            {option}
                    </button>
                )}
            </div>
            <br/>
            <div>
                {this.props.product.colors.map((color, index) =>
                    <button
                        style={{backgroundColor: this.state.colorSelected === index ? 'gray' : 'white'}}
                        onClick={() => this.setState({colorSelected: index})}>
                            {color}
                    </button>
                )}
            </div>
            <br/>
            <button disabled={this.state.sizeSelected === ''} onClick={() => this.onConfirm()}>Confirm?</button>
        </div>
    }

    onConfirm = () => {
        this.props.onConfirm({...this.props.product, sizeSelected: this.state.sizeSelected, colorSelected: this.props.product.colors[this.state.colorSelected]});
    }

    render() {
        return (
            <div style={{border: '1px solid black', borderRadius: '5px', minWidth: '17.5%', textAlign: 'center', cursor: this.state.isSelected ? 'default' : 'pointer'}} onClick={() => !this.state.isSelected ? this.props.onSelect(this.props.index) : {}}>
                <div style={{border: '1px solid black', borderRadius: '5px', height: '300px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage:'url(' + this.props.product.imageUrl[this.state.colorSelected] + ')'}}></div>
                <div>€ {this.props.product.price}</div>
                <p style={{fontWeight: 'bolder'}}>{this.props.product.name}</p>
                {this.props.isSelected && this.renderSelectedOptions()}
            </div>
        )
    }
}

//TODO: Properly add the styles
//Add a blur over the screen if the product was selected