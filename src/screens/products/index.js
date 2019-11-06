/*
 * className: ProductsScreen
 * Author   : ChengXin
 * Created  : July 8th 2019
 * Updated  : July 9th 2019
*/

import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class ProductsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: '',
            selectedImgID: -1,
            images: [],
            phoneModel: this.props.selectedPhoneModel,
        }
        this.setImage = this.setImage.bind(this);
        this.state.images.push({ title: 'Selected Model', url: this.props.selectedPhoneModel });
    }

    async getProducts(){
        fetch("http://165.22.179.40:81/api/v1/categories/?category_type=catalog", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                'Authorization': 'Bearer ' + this.props.token
            },
        }).then(res => res.json())
          .then(res => {
            res.data.map(element => {
                this.state.images.push({title: element.title, url: element.file_url});
            });
            this.forceUpdate();
          });
        console.log("category123435 ===> ", this.state.images);
    }

    componentDidMount () {
        console.log("product component did mount");
        this.getProducts();
    }

    toDataUrlfromImg = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };
    chooseProduct = () => {
        this.toDataUrlfromImg(this.state.selectedImg, (myBase64) => {
            console.log(myBase64); // myBase64 is the base64 string
            this.props.chooseProduct(myBase64);
        });
    }

    setImage(imageUrl, selectedID) {
        this.setState({
            selectedImg: imageUrl,
            selectedImgID: selectedID
        });
    }

    _renderImage = ( item, index ) => {
        return (
            <Col key={index} md={3} sm={4} onClick={() => this.setImage('http://165.22.179.40:81/media/' + item.url, index)} style={styles.divImgStyle}> 
                <img key={index} src={'http://165.22.179.40:81/media/' + item.url} width="100%" height="300px" style={this.state.selectedImgID !== index? styles.imageStyle: styles.selectedImgStyle}/>
                <p>{ item.title }</p> 
            </Col>
        )
    }
    
    render () {
        if (this.state.phoneModel != this.props.selectedPhoneModel) {
            this.state.images = [];
            this.state.images.push({ title: 'Selected Model', url: this.props.selectedPhoneModel });
            this.getProducts();
            this.state.phoneModel = this.props.selectedPhoneModel;
        }         
        return (
            <div className="galaryStyle">
                <Row className="imageGalaryStyle">
                    {
                        this.state.images.map((image, index) => this._renderImage(image, index))
                    }
                </Row>
                <Row style={{bottom: 0}}>
                    <Col md></Col>
                    <Col md>
                        <Row>
                            <Col md></Col>
                            <Col md>
                                <Button onClick={() => this.chooseProduct()}>Choose Product</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

let styles = {
    divImgStyle: {
        marginBottom: 10,
    },

    imageStyle: {
        borderRadius: 4,
    },

    selectedImgStyle: {
        borderRadius: 4,
        borderColor: 'fuchsia',
        borderWidth: 6,
        borderStyle: 'solid'
    }
}