import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import RegionSelect from 'react-region-select';
import { urlToProperty } from 'query-string-params';
import { getImageData, editImage } from '../utils/mockApiRequests';
import Styles from './styles.scss';

export default class Editing extends Component {

    constructor (props) {

        super(props);
        this.getImageData = ::this._getImageData;
        this.onChange = ::this._onChange;
        this.handleBtnSave = ::this._handleBtnSave;
        this.renderRedirect = ::this._renderRedirect;
    }

    state = {
        regions: [],
        redirect: false
    };

    _onChange (regions) {
        this.setState({
            regions: regions,
            x: regions[0].x,
            y: regions[0].y,
            width: regions[0].width,
            height: regions[0].height
        });
    }

    _getImageData () {
        const parsed = urlToProperty(this.props.location.search);
        const imageUrl = parsed.img[0];
        getImageData(imageUrl, (imageData) => {
            this.setState({ imageDataObject: imageData[0] })
        });
    }

    _handleBtnSave () {
        const { url, x, y, width, height } = this.state,
            tooltipArea = ReactDOM.findDOMNode(this._tooltipArea),
            tooltipText = tooltipArea.value,
            imgDataObjectUpdated = {
                'url': url,
                'tooltip': tooltipText,
                'x': x,
                'y': y,
                'width': width,
                'height': height
            };

        const { imageDataObject } = this.state;

        for (let key in imageDataObject) {
            if (imageDataObject.hasOwnProperty(key)) {
                if (imageDataObject[key] !== imgDataObjectUpdated[key] && imgDataObjectUpdated[key] !== undefined) {
                    imageDataObject[key] = imgDataObjectUpdated[key];
                }
            }

        }

        editImage(imageDataObject, () => {
            this.setState({
                redirect: true
            })
        });
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

        return (
            <div className={Styles.editingContainer}>
                <div className={Styles.msg}>Select new area for tooltip if you want</div>
                <div className={Styles.imgContainer}>
                <RegionSelect
                    maxRegions={1}
                    regions={this.state.regions}
                    constraint
                    onChange={this.onChange}
                >
                    <img src={imageDataObject.url} width=' 100%'/>
                </RegionSelect>
                </div>
                <div className={Styles.tooltipText}> {imageDataObject.tooltipText} </div>

                <textarea
                    name='tooltip'
                    className={Styles.tooltip}
                    ref={(node) => {
                        this._tooltipArea = node
                    }}
                    placeholder='Add new tooltip text if you want...'>
                </textarea>
                <button className={Styles.btnSave} onClick={this.handleBtnSave}>Save changes</button>
                { this.renderRedirect() }
            </div>
        )
    }
}