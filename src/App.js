import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Button, Tabs, Modal, Row, Col, Container, ListGroup, Tab } from 'react-bootstrap';
import Jimp from 'jimp';

import Transformer from './components/transformer';
import AddedImage from './components/addedImage';
import AddedBGImage from './components/addedBGImage';
import URLImage from './components/urlImage';

import AddText from './screens/addtext/index';
import AddImage from './screens/addimgs/index';
import AddBGImage from './screens/addbgimgs/index';
import AddSticker from './screens/stickers/index';
import ModelListofType from './screens/models/index';
import AddColor from './screens/colors/index';
import Products from './screens/products/index';
import store from './store/index';
import { addElement } from './actions/index';
import './App.css';
// import { throwStatement } from '@babel/types';

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: [],
      modellists: [],
      selectedModel: ''
    };
  }

  componentDidMount() {
    this.getModelList();
  }

  async getModelList() {
    // let token = this.props.token;
    fetch("http://165.22.179.40:81/api/v1/makes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
        'Authorization': 'Bearer ' + this.props.token
      }
    }).then(res => res.json()).then(res => {
      if (res.data !== undefined) {
        this.setState({ makes: res.data });
        res.data.map(element => {
          fetch("http://165.22.179.40:81/api/v1/models/?parent=" + element.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
              'Authorization': 'Bearer ' + this.props.token
            }
          }).then(res => res.json().then(res => {
            this.setState({ modellists: [...this.state.modellists, { id: element.id, data: res.data }] })
          }))
        })
      }
    });
  }

  onSelectModel = (imageUrl) => {
    this.setState({ selectedModel: imageUrl });
  }

  render() {
    // console.log("asdfasdf");
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose Model
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div>
              <Row className="tab-title">
                <Col sm={4}>
                  <p>Choose Mobile Type</p>
                </Col>
                <Col sm={8} className="choose-model-section">
                  <p>Choose your model</p>
                </Col>
              </Row>
              <Tab.Container id="list-group-tabs-cover-model" defaultActiveKey={(this.state.makes !== undefined && this.state.makes.length !== 0) ? '#' + this.state.makes[0].id : '#0'}>
                <Row>
                  <Col sm={4}>
                    <ListGroup>
                      {this.state.makes.map((element, index) => {
                        return (
                          <ListGroup.Item action href={'#' + element.id} key={index}>
                            {element.title}
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm={8} className="choose-model-section">
                    <ModelListofType models={this.state.modellists} selectModel={this.onSelectModel} />
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { this.props.onHide(); this.props.selected(this.state.selectedModel) }}>Select</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class TextModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
       makes: [],
       modellists: [],
       selectedModel: '',
       code: this.props.code,
    };
  }

  onSelectModel = (imageUrl) => {
    this.setState({selectedModel: imageUrl});
  }
  
  render () {
    this.state.code = this.props.code;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Text
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {this.state.code}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => {this.props.onHide(); this.props.selected(this.state.selectedModel)}}>Edit</Button> */}
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>  
    )
  }
}

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      toastShow: false,
      selectedModel: false,
      selectedShapeName: '',
      addedImgs: [],
      addedTexts: [],
      backgroundImg: '',
      backgroundColor: '',
      showModal: false,
      selectedCover: '',
      key: '',
      code: '',
      access_token: '4863mr9kFRaCZ6QVUjIJ3cdeH7OSBs',
    };
  }

  handleExportClick = async () => {
    this.setState({ selectedShapeName: '' });
    const dataURL = await this.state.stageRef.getStage().toDataURL();
    console.log("image url ==> ", dataURL);
    // var Jimp = require('jimp');    
    // // open a file called "lenna.png"
    // Jimp.read('dataURL', (err, lenna) => {
    //   if (err) throw err;
    //   lenna
    //     .resize(780, 1920) // resize
    //     .quality(60) // set JPEG quality
    //     .greyscale() // set greyscale
    //     .write('lena-small-bw.jpg'); // save
    //   console.log("success");
    // });
    // change size of photo to 780x1920

    // this.downloadURI(dataURL, "cover.png");
    var blob = await this.dataURItoBlob(dataURL);

    var formData = new FormData();
    console.log('---blob-----', blob);
    // formData.append("image", blob, "cover-complete.png");
    // await formData.append('image', {
    //   uri: dataURL,
    //   type: 'image/*',
    //   name: 'cover.png'
    // });
    const postData = {
      "image": dataURL,
    };
    console.log(formData.get('image'));

    // window.location.href = "/cart";
    fetch("http://165.22.179.40:81/api/v1/files-convert/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
        'Authorization': 'Bearer ' + this.state.access_token
      },
      body: JSON.stringify(postData),
    }).then(res => res.json())
      .then(res => {
        console.log("uploaded data ==> ", res);
      });
  }

  dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var b64toBlob = require('b64-to-blob');
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // var blob = b64toBlob(dataURI.split(',')[1], mimeString);
    // return blob;
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
  downloadURI = (uri, name) => {
    const link = window.document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  handleStageMouseDown = e => {
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ''
      });
      return;
    }
    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    if (name === `image${e.target.index}`) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ''
      });
    }
    // let elements = store.getState().imageEle;
    // if (elements[e.target.index] === undefined) 
    //   return;
    // if (elements[e.target.index].code !== '') {
    //   this.setState({ key: 'addtext', code: elements[e.target.index].code });
    // }
  };

  handleStageMouseUp = e => {
    let elements = store.getState().imageEle;
    if (elements[e.target.index] === undefined)
      return;
    if (elements[e.target.index].code !== '') {
      console.log("props code ==> ", elements[e.target.index].code);
      this.setState({ key: 'addtext', code: elements[e.target.index].code, showTextModal: true });
    }
  };

  handleAddElement = (imageUrl, code = '') => {
    if (this.state.selectedCover === '') {
      alert("Woops! You have to select model of your cover.");
      return;
    }
    store.dispatch(addElement(imageUrl, code));
    this.forceUpdate();
  }

  handleAddBGImage = (imageUrl) => {
    if (this.state.selectedCover === '') {
      alert("Woops! You have to select model of your cover.");
      return;
    }
    this.setState({
      backgroundImg: imageUrl
    })
  }

  handleSelectColor = (color) => {
    if (this.state.selectedCover === '') {
      alert("Woops! You have to select model of your cover.");
      return;
    }
    this.setState({
      backgroundColor: color
    })
  }

  chooseCoverProduct = (coverUrl) => {
    this.setState({
      selectedCover: coverUrl,
      backgroundColor: '',
      selectedShapeName: '',
      addedImgs: [],
      addedStickers: [],
      backgroundImg: ''
    })
  }

  setSelectedModelFlag = (imageUrl) => {
    if (imageUrl === "") return;
    this.setState({
      selectedModel: true,
      selectedModelUrl: imageUrl,
      key: 'chooseProd'
    });
  }

  componentDidUpdate = () => {
    this.state.addedImgs = store.getState().imageEle;
  }

  render() {
    let modalClose = () => this.setState({ showModal: false });
    let textModalClose = () => this.setState({ showTextModal: false });
    let elements = store.getState().imageEle;
    return (
      <div className="App">
        <header className="App-header">
          <p> Mobile Cover Design </p>
        </header>
        <div className="App-content rect-border row no-margin">
          <div className="cover-board">
            <div className="image-board rect-border">
              <Stage width="288" height="480" ref={node => { this.state.stageRef = node }} className="konva-stage" onMouseDown={this.handleStageMouseDown} onMouseUp={this.handleStageMouseUp}>
                <Layer>
                  <Rect width="288" height="480" fill={this.state.backgroundColor}></Rect>
                </Layer>
                <Layer>
                  <AddedBGImage src={this.state.backgroundImg}></AddedBGImage>
                </Layer>
                <Layer>
                  {elements.map((ele, index) => (
                    <AddedImage key={index} name={`image${index}`} src={ele.url}></AddedImage>
                  ))}
                  <Transformer
                    selectedShapeName={this.state.selectedShapeName}
                  />
                </Layer>
                <Layer hitGraphEnabled={false}>
                  <URLImage src={this.state.selectedCover} ref={node => { this.mask = node }} />
                </Layer>
              </Stage>
            </div>
            <div className="choose-cover">
              <div>
                <Button
                  variant="primary"
                  onClick={() => this.setState({ showModal: true })}
                  className="btn-primary"
                >
                  Choose Model
                </Button>
                <Button
                  onClick={() => this.handleExportClick()}
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>
          <div className="control-board">
            <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
              <Tab eventKey="chooseProd" title="Products" className="border-item">
                {this.state.selectedModel ?
                  <Products chooseProduct={this.chooseCoverProduct} selectedPhoneModel={this.state.selectedModelUrl} token={this.state.access_token} />
                  : <p>Please choose Model of your mobile.</p>}
              </Tab>
              <Tab eventKey="addimage" title="Add Image" className="border-item">
                <AddImage handleAddImage={this.handleAddElement} token={this.state.access_token} />
              </Tab>
              <Tab eventKey="addtext" title="Add Text" className="border-item">
                <AddText handleAddText={this.handleAddElement} code={this.state.code} token={this.state.access_token} />
              </Tab>
              <Tab eventKey="sticker" title="Add Sticker" className="border-item">
                <AddSticker handleAddStickers={this.handleAddElement} token={this.state.access_token} />
              </Tab>
              <Tab eventKey="bgcolor" title="BG Color" className="border-item">
                <AddColor handleSelectColor={this.handleSelectColor} token={this.state.access_token} />
              </Tab>
              <Tab eventKey="bgimage" title="BG Image" className="border-item">
                <AddBGImage handleAddBGImage={this.handleAddBGImage} token={this.state.access_token} />
              </Tab>
            </Tabs>
          </div>
        </div>
        <ModalComponent
          show={this.state.showModal}
          onHide={modalClose}
          selected={this.setSelectedModelFlag}
          token={this.state.access_token}
        />
        <TextModalComponent
          show={this.state.showTextModal}
          onHide={textModalClose}
          selected={this.setSelectedModelFlag}
          token={this.state.access_token}
          code={this.state.code}
        />
        <footer className="App-footer">
          <p> @created by chengxin</p>
        </footer>
      </div>
    );
  }
}

export default App;
