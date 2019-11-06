/*
 * className: AddTextScreen
 * Author   : ChengXin
 * Created  : July 11th 2019
 * Updated  : July 13th 2019
*/

import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import htmlToImage from 'html-to-image';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../fonts.css';

export default class AddTextScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            code: this.props.code,
            fonts: [
                {id: 0, name: 'Roboto', style: 'normal', weight: '400'},
                {id: 1, name: 'Roboto', style: 'normal', weight: '700'},
                {id: 2, name: 'Roboto', style: 'italic', weight: '400'},
                {id: 3, name: 'Sansation', style: 'normal', weight: '400'},
                {id: 4, name: 'Sansation', style: 'normal', weight: '700'},
                {id: 5, name: 'Sansation', style: 'italic', weight: '400'},
                {id: 6, name: 'Windsong', style: 'normal', weight: '400'},
                {id: 7, name: 'Sofia', style: 'normal', weight: '400'},
                {id: 8, name: 'Montserrat', style: 'normal', weight: '400'},
                {id: 9, name: 'Montserrat', style: 'normal', weight: '700'},
                {id: 10, name: 'Montserrat', style: 'italic', weight: '400'},
            ],
            selectFont: null,
            selectedFontID: -1,
        }
        console.log("code ====> " + this.state.code);
    }

    componentDidMount() {
        // this.getFonts();
    }

    selectFont(font, index) {
        console.log("Font ===> " + JSON.stringify(font));
        var node = document.querySelector('.public-DraftStyleDefault-ltr');
        node.style['font-family'] = font.name;
        node.style['font-style'] = font.style;
        node.style['font-weight'] = font.weight;
        this.setState({
            selectedFontID: index
        });
    }

    async getFonts() {
        fetch("http://165.22.179.40:81/api/v1/fonts/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                'Authorization': 'Bearer ' + this.props.token 
            },
        }).then(res => res.json())
          .then(res => { 
                this.setState({fonts: res.data});
          });
    }

    onEditorStateChange = (editorState) => {        
        this.setState({
            editorState,
        });
    };

    handleText = () => {
        var htmlCode = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        let handle = this.props.handleAddText;
        var node = document.querySelector('.public-DraftStyleDefault-ltr');
        htmlToImage.toPng(node).then(function (dataUrl) {
            handle(dataUrl, htmlCode);
        });
    }
    
    render () {
        if (this.state.code !== "") {
            const blocksFromHtml = htmlToDraft(this.state.code);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            this.state.editorState = EditorState.createWithContent(contentState);
            console.log("editorState ===> " + JSON.stringify(this.state.editorState));
        }
        return (
            <div className="galaryStyle">
                <Row className="imageGalaryStyle text-style">
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        localization={{ locale: 'en', translations: editorLabels }}
                        onEditorStateChange={this.onEditorStateChange}
                    />    
                </Row>
                <Row className='fontlists'>
                    {this.state.fonts.map((element, index) => {
                        return (
                            <div 
                                className="font-item" 
                                style={this.state.selectedFontID !== index? styles.imageStyle: styles.selectedImgStyle}
                                key={element.id}
                                onClick={() => this.selectFont(element, index)} 

                            >
                                <span style={{fontFamily: element.name, fontWeight: element.weight, fontStyle: element.style}} >Hello World</span>
                            </div>
                        )
                    })}                    
                </Row>
                <Row style={{bottom: 0}}>
                    <Col md></Col>
                    <Col md>
                        <Row>
                            <Col md></Col>
                            <Col md>
                                <Button onClick={this.handleText}>Add Text</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const editorLabels = {
    'generic.add' : 'Add',
    'generic.cancel' : 'Cancel',
    'components.controls.fontfamily.fontfamily': 'Font',
    'components.controls.history.history': 'History',
    'components.controls.history.undo': 'Undo',
    'components.controls.history.redo': 'Redo',
}

let styles = {
    divImgStyle: {
        marginBottom: 10,
    },

    imageStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    selectedImgStyle: {
        borderRadius: 4,
        borderColor: 'fuchsia',
        borderWidth: 6,
        borderStyle: 'solid'
    }
}