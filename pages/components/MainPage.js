import React, { Component } from 'react';

export class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    //Since my background is with react-redux and not with next.js, this is a workaround to avoid losing time implementing all of the reducers and services necessary on react-redux
    componentDidMount(){
        fetch('http://localhost:3000/api/product')
            .then(response=>response.json())
            .then(response=>this.setState({products: response}))
    }

    render() {
        return (
            <div>
                {this.state.products.map(product => <div>{product.name}</div>)}
            </div>
        )
    }
}