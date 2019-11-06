/*
 * className: AddBGImageScreen
 * Author   : ChengXin
 * Created  : July 6th 2019
 * Updated  : July 18th 2019
*/

import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
// import download from 'image-downloader';
import fs from 'fs';

export default class AddBGImageScreen extends Component {
    state = {
        selectedImg: '',
        selectedImgID: -1,
        fileInputElement: null,
        bgImages: []
    }

    constructor(props) {
        super(props);
        this.setImage = this.setImage.bind(this);
    }
    async getBGImages() {
        fetch("http://165.22.179.40:81/api/v1/backgrounds/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                'Authorization': 'Bearer ' + this.props.token 
            },
        }).then(res => res.json())
          .then(res => {this.setState({bgImages: res.data});
        });
    }
    componentDidMount() {
        this.fileSelector = this.buildFileSelector();
        this.getBGImages();
    }
    setImage = (imageUrl, selectedID) => {
        this.setState({
            selectedImg: imageUrl,
            selectedImgID: selectedID
        });
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
        let image_width, image_height;
        let file = e.target.files[0];

        if (e.target.files && e.target.files[0]) {
            var img = document.createElement("img");
            this.state.backgroundImageFile = e.target.files[0];
            let handle = this.props.handleAddBGImage;

            img.onload = function () {
                image_width = this.width;
                image_height = this.height;
                
                if (image_width < 300 && image_height < 480) {
                    alert("Woops! This image is small! Please choose bigger image."); 
                    return;
                } else {
                    handle(window.URL.createObjectURL(file))
                }
            };
          
            var reader = new FileReader();
            reader.onloadend = function (ended) {
              img.src = ended.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        // console.log(this.state.fileInputElement.value)
    }
    storeLocal = (uri) => {
        if (uri != "") {
            var elephant = document.createElement("img");
            elephant.addEventListener("load", function () {
                var imgCanvas = document.createElement("canvas"),
                    imgContext = imgCanvas.getContext("2d");
            
                // Make sure canvas is as big as the picture
                imgCanvas.width = elephant.width;
                imgCanvas.height = elephant.height;
            
                // Draw image into canvas element
                imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
            
                // Get canvas contents as a data URL
                var imgAsDataURL = imgCanvas.toDataURL("image/png");
                return imgAsDataURL;
                // Save image into localStorage
                // try {
                //     localStorage.setItem("background", imgAsDataURL);
                // }
                // catch (e) {
                //     console.log("Storage failed: " + e);
                // }
            }, false); 

            elephant.src = uri;
        } else {
            return false;
        }
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
    chooseBGImage = () => {
        // var filePath = this.storeLocal(this.state.selectedImg)
        // console.log(filePath);
        // if (filePath != false)
        //     this.props.handleAddBGImage(filePath);
        // else
        //     alert("failed");
        this.toDataUrlfromImg(this.state.selectedImg, (myBase64) => {
            // console.log(myBase64); // myBase64 is the base64 string
            this.props.handleAddBGImage(myBase64);
        });
    }

    _renderImage = ( item, index ) => {
        return (
            <Col key={index} md={3} sm={4} onClick={() => this.setImage('http://165.22.179.40:81/media/' + item.file_url, index)} style={styles.divImgStyle}> 
                <img key={index} src={'http://165.22.179.40:81/media/' + item.file_url} width="100%" height="150px" style={this.state.selectedImgID != index? styles.imageStyle: styles.selectedImgStyle}/> 
            </Col>
        )
    }
    
    render () {
        // console.log("bg images => ", this.state.bgImages);
        return (
            <div className="galaryStyle">
                <Row className="imageGalaryStyle">
                    {this.state.bgImages.map((image, index) => this._renderImage(image, index))}
                </Row>
                <Row style={{bottom: 0}}>
                    <Col md></Col>
                    <Col md>
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={11}>
                                <Row>
                                    <Col md>
                                        <Button style={{float: "right"}} onClick={() => this.handleFileSelect()}>Browser...</Button>
                                    </Col>
                                    <Col md>
                                        <Button onClick={() => this.chooseBGImage()}>Select Background</Button>
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