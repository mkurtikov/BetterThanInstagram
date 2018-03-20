import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { urlToProperty } from 'query-string-params';
import { getImageData } from '../utils/mockApiRequests';
import Styles from './styles.scss';

export default class Preview extends Component {

    constructor (props) {

        super(props);
        this.getImageData = ::this._getImageData;
        this.renderRedirect = ::this._renderRedirect;
        this.handleBtnOk = ::this._handleBtnOk;
    }

    state = {
        regions: [],
        redirect: false
    };

    _getImageData () {
        const parsed = urlToProperty(this.props.location.search);
        const imageUrl = parsed.img[0];
        getImageData(imageUrl, (imageData) => {
            this.setState({ imageDataObject: imageData[0] });
        });
    }

    _handleBtnOk() {
        this.setState({
            redirect: true
        })
    }

    _renderRedirect () {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }

    componentWillMount () {
        this.getImageData();
    }

    render () {
        const { imageDataObject } = this.state;
        const tooltipStyles = {
            top: `${imageDataObject.y}%`,
            left: `${imageDataObject.x}%`,
            width: `${imageDataObject.width}%`,
            height: `${imageDataObject.height}%`,
        };

        return (
            <div className={Styles.previewContainer}>
                <div className={Styles.msg}>Hover image to see tooltip</div>
                <div className={Styles.imgContainer}>
                    <img src={imageDataObject.url}/>
                    <div className={Styles.tooltip} style = {tooltipStyles}>
                        <span>{imageDataObject.tooltip}</span>
                    </div>
                </div>
                <button className={Styles.btnBack}><Link to={`/`}>Back</Link></button>
                <button className={Styles.btnEdit}><Link to={`/Editing?img=${imageDataObject.url}`}>Edit</Link></button>
            </div>
        )
    }
}