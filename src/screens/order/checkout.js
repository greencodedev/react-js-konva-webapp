import React, { Component } from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap';

export default class CheckoutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'Customer',
        };
    }
    handleOptionChange(changeEvent) {
        this.setState({
            type: changeEvent.target.value
        });
        console.log(this.state.type);
    }
    render() {
        console.log(this.state.type);
        return(
            <div className="App">
                <header className="App-header">
                    <p> Mobile Cover Design </p>
                </header>
                <div className="App-content rect-border row no-margin">
                    <Container className="content">
                        <div>
                           <span>Dashboard > Checkout</span>
                        </div>
                        <Row className="gray-border cart-header no-margin">
                            <Col md={7} sm={7}>
                                <div className="info-block" style={{ flexDirection: 'row', marginBottom: 10, marginTop: 5 }}>
                                    <span style={{ marginRight: 10 }}>Delivery To : </span> 
                                    <input type="radio" name="store" value="Customer" checked={true} onChange={() => {this.setState({type: 'Customer'})}}/> Customer
                                    <input type="radio" name="store" value="Store" style={{ marginLeft: 10 }} onChange={() => {this.setState({type: 'Customer'})}}/> Store
                                </div>
                                <div className="info-block" style={{ backgroundColor: '#d3d3d3', padding: 10}}>
                                    <p>Shipping Address</p>
                                </div>
                                <div className="info-block" >
                                    <div>
                                        <p>{this.state.type} Name</p>
                                        <input type="text" id="name" placeholder='name' className="infosStyle" />
                                    </div>
                                    <div>
                                        <p>{this.state.type} Number</p>
                                        <input type="text" id="phone" placeholder='phone number' className="infosStyle" />
                                    </div>
                                    <div>
                                        <p>{this.state.type} Address</p>
                                        <textarea type="text" id="address" placeholder='address' className="infosStyle" ></textarea>
                                    </div>
                                    <div>
                                        <p>Pin Code</p>
                                        <input type="text" id="pincode" placeholder='pincode' className="infosStyle" />
                                    </div>
                                    <div>
                                        <p>Return Policy</p>
                                    </div>
                                    <div>
                                        <Button style={{width: "50%"}} onClick={() => {window.location.href = "/detail"}}>Proceed Order</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5} sm={5}>
                                <div></div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <footer className="App-footer">
                    <p> @created by chengxin</p>
                </footer>
            </div>
        )
    }
}