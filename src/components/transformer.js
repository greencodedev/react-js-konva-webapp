/*
 * className: TransformerComponent
 * Author   : ChengXin
 * Created  : July 5th 2019
 * Updated  : July 17th 2019
*/

import React, { Component } from 'react';
import { Transformer } from 'react-konva';
import Konva from 'konva';

class TransformerComponent extends Component {

    state = {
        selectedName: '',
        transformerObj: null,
        delImage: null,
    }
    deleteBtn = new Konva.Circle({
        x: 100,
        y: 0,
        radius: 10,
        fillEnabled: true,
    });
    image = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedName: '',
            transformerObj: null,
            selectedShapeName: '',
            selectedNode: ''
        };
        
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteBtn.on("click", (e) => {
            this.deleteItem(this.state); 
            this.state.selectedShapeName = ''; 
            this.state.selectedNode = '';
        });
    }
    componentDidMount() {
        this.checkNode();
    }
    componentDidUpdate() {
        this.checkNode();
    }
    deleteItem(state) {
        var node = state.transformerObj.node();
        node.absolutePosition({
            x: -10000,
            y: 10
          });
        state.transformerObj.getLayer().batchDraw();
    }
    checkNode() {
        // here we need to manually attach or detach Transformer node
        const stage = this.transformer.getStage();
        var { selectedShapeName } = this.props;
        var selectedNode = stage.findOne('.' + selectedShapeName);
        var image = new Image();
        image.src = './images/close.png'
        image.onload = () => {
            this.deleteBtn.fillPatternImage(image);
            this.deleteBtn.fillPatternOffset({x: 8, y: 9});
        };

        this.deleteBtn.x(this.transformer.getWidth());
        this.transformer.add(this.deleteBtn);
        this.transformer.on('transform', () => {
            this.deleteBtn.x(this.transformer.getWidth());
        });            
        // do nothing if selected node is already attached
        if (selectedNode === this.transformer.node()) {
            return;
        }
        if (selectedNode) {
            // attach to another node
            this.setState({ selectedName: selectedShapeName, transformerObj: this.transformer});
            // add delete button
            
            this.transformer.attachTo(selectedNode);
        } else {
            // remove transformer
            this.transformer.detach();
        }
        
        this.transformer.getLayer().batchDraw();
    }

    render() {
        return (
            <Transformer
                ref={node => {
                    this.transformer = node;
                }}
            />
        );
    }
}

export default TransformerComponent;