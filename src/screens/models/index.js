/*
 * className: ModelListofType
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 6th 2019
*/

import React, { Component } from 'react';
import { Row, Col, Tab } from 'react-bootstrap';

export default class ModelListofType extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedID: -1,
            data: props.models
        }
    }

    selectModel = ( file_url, index ) => {
        this.setState({
            selectedID: index
        });
        this.props.selectModel(file_url);
    }

    _renderModel = ( item, index ) => {
        return(
            <Col key={index} sm={4} className="model-item" onClick={() => {this.selectModel(item.file_url, index)}}>
                <div key={index} className="item" style = {this.state.selectedID === index? styles.selectedModelStyle: styles.modelStyle}>
                    <p>{ item.title }</p>
                </div>
            </Col>
        )
    };

    render () {
        return (
            <Tab.Content 
                style={{height: 350, overflowY:'scroll', overflowX: 'hidden'}}>
                {this.state.data.map((element, index) => {
                    return (
                        <Tab.Pane eventKey={"#" + element.id} className="list-scroller" key={index}>
                            <Row>
                                {element.data.map((model, index) => this._renderModel(model, index))}
                            </Row>
                        </Tab.Pane>
                    )
                })}
            </Tab.Content>
        )
    }
}

let styles = {
    divModelStyle: {
        marginBottom: 10,
    },
  
    modelStyle: {
        marginRight: 5,
        borderRadius: 4,
    },
  
    selectedModelStyle: {
        marginRight: 5,
        borderRadius: 4,
        borderColor: 'fuchsia',
        borderWidth: 6,
        borderStyle: 'solid'
    }
  }