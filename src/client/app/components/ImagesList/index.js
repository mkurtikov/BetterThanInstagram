import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteImage } from '../../utils/mockApiRequests';

import Styles from './styles.scss';


export default class ImagesList extends Component {

    constructor () {
        super();
        this.getImagesData = ::this._getImagesData;
        this.handleDeleteOnClick = ::this._handleDeleteOnClick;
    }

    state = {
        imagesData: []
    };

    componentWillMount () {
        this.getImagesData();
    }

    _getImagesData () {
        const imagesData = getData();
        this.setState(() => this.state.imagesData = imagesData);
    }

    _handleDeleteOnClick (url) {
        deleteImage(url, (imagesDataUpdated) => {
            this.setState({
                imagesData: imagesDataUpdated
            })
        });
    }

    render () {
        const contentArray = this.state.imagesData;
        let key = 0;

        const content = contentArray.map((img) => {
            key++;
            return (
                <div className={ Styles.imageBlock } key={key}>
                    <div className={Styles.imgBox}><img src={img.url} alt=""/></div>
                    <div className={Styles.tooltipText}>{img.tooltip}</div>
                    <button className={Styles.btnEdit}><Link to={`/Editing?img=${img.url}`}>Edit</Link></button>
                    <button className={Styles.btnPreview}><Link to={`/Preview?img=${img.url}`}>Preview</Link></button>
                    <button className={Styles.btnDelete} onClick={(e) => (this.handleDeleteOnClick(img.url))}>Delete</button>
                </div>
            )
        });

        const result = contentArray.length > 0
            ? <div> {content} </div>
            : '';

        return (
            <div>
                <div className={Styles.imagesList}>
                    {result}
                </div>
            </div>
        )
    }
}