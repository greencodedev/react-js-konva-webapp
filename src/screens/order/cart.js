import React, { Component } from 'react'
import { Button, Row, Col, Container, Image } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io'

export default class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                },
                {
                    name: "Galaxy Note 5 5DM Phone Case",
                    price: 100,
                    imageUrl: ""
                }
            ]
        };
    }
    render() {
        this.totalPrice = 0;
        this.state.carts.map(element => {
            this.totalPrice += element.price;
        })
        return(
            <div className="App">
                <header className="App-header">
                    <p> Mobile Cover Design </p>
                </header>
                <div className="App-content rect-border row no-margin">
                    <Container className="content">
                       <div>
                           <span>Dashboard > Cart</span>
                       </div>
                       <Row className="cart-details">
                            <Col sm={8}>
                                <div className="gray-border">
                                    <div className="cart-header">
                                        <p>Your Cart ( {this.state.carts.length} items )</p>
                                    </div>
                                    <div>
                                        <Row className="gray-background table-header no-margin">
                                            <Col sm={2} md={2}>
                                                <span>Image</span>
                                            </Col>
                                            <Col sm={5} md={5}>
                                                <span>Product Name</span>
                                            </Col>
                                            <Col sm={2} md={2}>
                                                <span>Price</span>
                                            </Col>
                                            <Col sm={3} md={3}>
                                                <span></span>
                                            </Col>
                                        </Row>
                                        <div className="table-content">
                                        {this.state.carts.map(element => (
                                            <Row className="no-margin table-row">
                                                <Col sm={2} md={2}>
                                                    <Image src={element.imageUrl} rounded />
                                                </Col>
                                                <Col sm={5} md={5}>
                                                    {element.name}
                                                </Col>
                                                <Col sm={2} md={2}>
                                                    {element.price}
                                                </Col>
                                                <Col sm={3} md={3}>
                                                    Remove <a><IoIosClose fontSize="24px" /></a>
                                                </Col>
                                            </Row>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="div-btns">
                                    <Button className="left-btn">Add Another Item</Button>
                                    <Button className="right-btn" onClick={() => {window.location.href = "/checkout"}}>Proceed To Checkout</Button>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="gray-border cart-summary">
                                    <p>Cart Summary</p>
                                    <span>Total Amount</span>
                                    <h2>{this.totalPrice}</h2>
                                    <br/>
                                    <Button onClick={() => {window.location.href = "/checkout"}}>Proceed To Checkout</Button>                
                                </div>
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