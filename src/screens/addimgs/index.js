/*
 * className: AddImageScreen
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 18th 2019
*/

import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class AddImageScreen extends Component {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.setImage = this.setImage.bind(this);
    }

    state = {
        selectedImg: '',
        selectedImgID: -1,
        file: '',
        imagePreviewUrl: '',
        images: [
            './images/1.jpg',
            './images/2.jpg',
            './images/3.jpg',
            './images/4.jpg',
            './images/5.jpg',
            './images/6.jpg',
            './images/7.jpg',
            './images/2.jpg',
            './images/3.jpg',
            './images/4.jpg',
            './images/5.jpg',
            // 'file:C:/fakepath/Lu-Zhang-MRS.jpg',
        ],
        fileInputElement: ''
    }
    
    componentDidMount(){
        this.fileSelector = this.buildFileSelector();
    }

    setImage(imageUrl, selectedID) {
        this.setState({
            selectedImg: imageUrl,
            selectedImgID: selectedID
        });
    }

    _renderImage = ( item, index ) => {
        return (
            <Col key={index} md={3} sm={4} onClick={() => this.setImage(item, index)} style={styles.divImgStyle}> 
                <img key={index} src={item} width="100%" height="150px" style={this.state.selectedImgID !== index? styles.imageStyle: styles.selectedImgStyle}/> 
            </Col>
        )
    }

    buildFileSelector = () => {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('accept', 'image/*');
        fileSelector.setAttribute('multiple', 'multiple');
        fileSelector.onchange = this.getPhoto;
        this.setState({fileInputElement: fileSelector});
        return fileSelector;
    }

    handleFileSelect = () => {
        this.fileSelector.click();
    }

    getPhoto = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        if (file) {
            this.addSelectedElement(window.URL.createObjectURL(file));
            // this.props.handleAddImage(window.URL.createObjectURL(file))
        }
        console.log(this.state.fileInputElement.value)
    }

    addSelectedElement = (url, code = '') => {
        this.props.handleAddImage(url, code);
    }
    
    render () {
        return (
            <div className="galaryStyle">
                <Row className="imageGalaryStyle">
                    {this.state.images.map((imageUrl, index) => this._renderImage(imageUrl, index))}
                </Row>
                <Row style={{bottom: 0}}>
                    <Col md></Col>
                    <Col md>
                        <Row>
                            <Col md={3}>
                            </Col>
                            <Col md={9}>
                                <Row>
                                    <Col md>
                                        <Button style={{float: "right"}} onClick={() => this.handleFileSelect()}>Browser...</Button>
                                    </Col>
                                    <Col md>
                                        <Button onClick={() => this.addSelectedElement(this.state.selectedImg)}>Select Image</Button>
                                    </Col>
                                </Row>
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