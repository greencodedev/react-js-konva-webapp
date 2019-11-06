/*
 * className: AddedImageComponent
 * Author   : ChengXin
 * Created  : July 5th 2019
 * Updated  : July 7th 2019
*/

import React, { Component } from 'react';
import { Image } from 'react-konva';
// import store from '../store/index';

export default class AddedImageComponent extends Component {
    state = {
        image: null
    };
    
    componentDidMount() {
        this.loadImage();
    }
    
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    
    loadImage() {
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.setAttribute('crossorigin', 'anonymous');
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setState({
            image: this.image
        });
    };

    render() {
        return (
            <Image
                name={this.props.name}
                x={30}
                y={30}
                width={100}
                height={100}
                image={this.state.image}
                ref={node => {
                    this.imageNode = node;
                }}
                draggable
            />
        );
    }
}