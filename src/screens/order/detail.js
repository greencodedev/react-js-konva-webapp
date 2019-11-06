import React, { Component } from 'react'
import { Button, Image, Row, Col, Container } from 'react-bootstrap';

export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'Customer',
            user: {
                name: "Triveni Bail",
                phone: "+91 9023568988",
                address: "B-109/124, Ansa Indl Estate, Saki Vihar Road, Sakinaka, Andheri(west), Mumbai, Maharashtra. 400072",
                order_id: "#22434",
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
                    }
                ]
            }
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
        let carts = this.state.user.carts;
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
                                    <p>Ship To</p>
                                </div>
                                <Row className="info-block no-margin">
                                    <Col sm={4} md={4}>
                                        <div>
                                            <p>{this.state.type} Name</p>
                                            <span>{this.state.user.name}</span>
                                        </div>
                                        <div>
                                            <p>{this.state.type} Number</p>
                                            <span>{this.state.user.phone}</span>
                                        </div>
                                    </Col>
                                    <Col sm={8} md={8}>
                                        <div>
                                            <p>{this.state.type} Address</p>
                                            <span>{this.state.user.address}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="info-block" style={{ backgroundColor: '#d3d3d3', padding: 10}}>
                                    <p>Your Order Summary</p>
                                </div>
                                <div className="info-block">
                                    <p>Order id: {this.state.user.order_id}</p>
                                </div>
                                <div>
                                    {carts.map(element => (
                                        <div className="gray-border cart-summary cart-item">
                                            <Row className="no-margin">
                                                <Col sm={4} md={4}>
                                                    <Image src={element.imageUrl} rounded />
                                                </Col>
                                                <Col sm={8} md={8}>
                                                    <p>{element.name}</p>
                                                    <p>{element.price}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col md={5} sm={5} className="payment-info">
                                <div className="info-block border-bottom">
                                    <p>Coupon Code / Offer</p>
                                    <div >
                                        <input type="text" placeholder=" Apply Coupon here" id="coupon_code" style={{width: '70%'}}/>
                                        <input type="button" value="Apply" style={{width: "30%", justifyContent: 'center'}}/>
                                    </div>
                                </div>
                                <div className="info-block border-bottom">
                                    <p>Price Details</p>
                                    <div style={{flexDirection: 'row'}}>
                                        <span>Total Amount</span>
                                        <span class="price">300</span>
                                    </div>
                                    <div style={{flexDirection: 'row'}}>
                                        <span>Discount Amount</span>
                                        <span class="price">10</span>
                                    </div>
                                    <div style={{flexDirection: 'row'}}>
                                        <span>Delivery Charges</span>
                                        <span class="price">75</span>
                                    </div>
                                    <div style={{flexDirection: 'row'}}>
                                        <span>Total Amount</span>
                                        <span class="price">300</span>
                                    </div>
                                </div>
                                <div className="info-block">
                                    <div>
                                        <span><b>Payment Method</b></span>
                                        <span class="price"> > </span>
                                    </div>
                                    <div>
                                        <input type="checkbox" checked />
                                        <span>Use Wallet Amount</span>
                                        <span class="price">300</span>
                                    </div>
                                    <div>
                                        <span>Paytm</span>
                                        <span class="price">85</span>
                                    </div>
                                    <div>
                                        <Button style={{width: "100%"}}>Pay By Paytm</Button>
                                    </div>
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