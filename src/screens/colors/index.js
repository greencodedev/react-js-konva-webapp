/*
 * className: ColorPickerComponent
 * Author   : ChengXin
 * Created  : July 9th 2019
 * Updated  : July 10th 2019
*/

import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

export default class ColorPickerComponent extends React.Component {
    state = {
        background: '#fff',
    };

    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
    };

    render() {
        return (
            <div className="galaryStyle">
                <Row className="imageGalaryStyle" style={styles.colorboard}>
                    <SketchPicker color={this.state.background} onChangeComplete={ this.handleChangeComplete } disableAlpha = {true}/>
                </Row>
                <Row style={{bottom: 0}}>
                    <Col md></Col>
                    <Col md>
                        <Row>
                            <Col md></Col>
                            <Col md>
                                <Button onClick={() => this.props.handleSelectColor(this.state.background)}>Select Color</Button>
                                {/* <Button>Upload Image</Button> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

const styles = {
    colorboard: {
        paddingLeft: 10,
        paddingBottom: 10
    }
}