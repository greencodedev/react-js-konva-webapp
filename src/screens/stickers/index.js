/*
 * className: AddSticker
 * Author   : ChengXin
 * Created  : July 6th 2019
 * Updated  : July 15th 2019
*/

import React, { Component } from 'react';
import { Row, Col, ListGroup, Tab, Button } from 'react-bootstrap';

export default class AddSticker extends Component {
    constructor(props) {
        super(props);
        this.setImage = this.setImage.bind(this);
        this.state={
            categories: [],
            stickers: [],
            selectedImg: '',
            selectedImgID: -1,
            images: [
                './images/sticker/1.png',
                './images/sticker/2.png',
                './images/sticker/3.jpg',
                './images/sticker/4.jpg',
                './images/sticker/5.png',
                './images/sticker/6.jpg',
            ]
        }
    }

    componentDidMount() {
        fetch("http://165.22.179.40:81/api/v1/categories/?category_type=sticker", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                'Authorization': 'Bearer ' + this.props.token
            },
        }).then(res => res.json())
        .then(res => {
            this.setState({ categories: res.data });
            // console.log("category ===> ", this.state.categories);
            res.data.map(category => {
                fetch("http://165.22.179.40:81/api/v1/catalogs/?category_id=" + category.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                        'Authorization': 'Bearer ' + this.props.token
                    },
                }).then(res => res.json())
                .then(res => {
                    let stickersForCate = [];
                    res.data.map(element => {
                        stickersForCate.push({id: element.id, url: element.file_url});
                    })
                    // console.log("response data ===> ", stickersForCate)
                    this.setState({ stickers: [...this.state.stickers, {id: category.id, stickers: stickersForCate}]});
                })
            })
            // console.log("stickers ===> ", this.state.stickers);
        })
    }

    setImage(imageUrl, selectedID) {
        this.setState({
            selectedImg: imageUrl,
            selectedImgID: selectedID
        });
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
    chooseSticker = () => {
        this.toDataUrlfromImg(this.state.selectedImg, (myBase64) => {
            // console.log(myBase64); // myBase64 is the base64 string
            this.props.handleAddStickers(myBase64);
        });
    }

    _renderImage = ( item, index ) => {
        return (
            <Col key={index} md={3} sm={4} onClick={() => this.setImage('http://165.22.179.40:81/media/' + item.url, index)} style={styles.divImgStyle}> 
                <img key={index} src={'http://165.22.179.40:81/media/' + item.url} width="100%" height="150px" style={this.state.selectedImgID != index? styles.imageStyle: styles.selectedImgStyle}/> 
            </Col>
        )
    }
    
    render () {
        // console.log("stickers=>", this.state.stickers);
        return (
            <div className="galaryStyle">
                <Row className="imageGalaryStyle">
                    <Tab.Container id="list-group-tabs-sticker" defaultActiveKey={(this.state.categories !== undefined && this.state.categories.length !== 0) ? '#' + this.state.categories[0].id : '#0'}>
                        <Row className="no-margin" style={{ width: '100%' }}>
                            <Col sm={3}>
                                <ListGroup>
                                    {
                                        this.state.categories.map((element, index) => {
                                            return (
                                                <ListGroup.Item action href={"#" + element.id} key={index}>
                                                    <div style={{flexDirection: 'row', width: '100%'}}>
                                                        <p style={{float: 'left', marginBottom: 0}}>{element.title}</p>
                                                        <img key={index} src={'http://165.22.179.40:81/media/' + element.file_url} width="30" height="30" style={{float: 'right'}}/>
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Col>
                            <Col sm={9} className="choose_sticker_section">
                                <Tab.Content 
                                    style={{ overflowY:'hidden', overflowX: 'hidden'}}>
                                    {
                                        this.state.stickers.map((element, index) => {
                                            return (
                                                <Tab.Pane eventKey={"#" + element.id} className="list-scroller" key={index}>
                                                    <Row>
                                                        {element.stickers.map((sticker, index) => this._renderImage(sticker, index))}
                                                    </Row>
                                                </Tab.Pane>
                                            )
                                        })
                                    }
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Row>
                <Row style={{bottom: 0}}>
                    <Col md></Col>
                    <Col md>
                        <Row>
                            <Col md></Col>
                            <Col md>
                                <Button onClick={() => this.chooseSticker()}>Select Sticker</Button>
                                {/* <Button>Upload Image</Button> */}
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
        borderStyle: 'solid',
    }
}