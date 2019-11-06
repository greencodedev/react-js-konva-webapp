import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal } from 'react-bootstrap';

export default class ChooseModalComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: props.showModal
        }
    }
    render() {
        return (
            <div>
                <Modal.Dialog
                    isOpen={this.state.showModal}
                    contentLabel="Choose Model of your Mobile"
                    // onRequestClose={this.props.handleCloseModal()}
                    shouldCloseOnOverlayClick={false}
                >
                    <p>Modal</p>
                    {/* <button onClick={this.props.handleCloseModal()}>Close</button> */}
                </Modal.Dialog>
            </div>
        )
    }
}