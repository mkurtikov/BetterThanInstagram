import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import RegionSelect from 'react-region-select';
import Styles from './styles.scss';
import { addNewData } from "../../utils/mockApiRequests";

export default class Adding extends Component {

    constructor (props) {
        super(props);

        this.dragenter = ::this._dragenter;
        this.drop = ::this._drop;
        this.dragover = ::this._dragover;
        this.handleFiles = ::this._handleFiles;
        this.handleBtnSave = ::this._handleBtnSave;
        this.uploadFile = ::this._uploadFile;
        this.onChange = ::this._onChange;
        this.renderRedirect = ::this._renderRedirect;
    }

    state = {
        cloudName: 'kseniia',
        unsignedUploadPreset: 'iaavwduk',
        callRender: '',
        regions: [],
        url: '/',
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

    _renderRedirect () {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }

    _handleBtnSave () {
        const { url, x, y, width, height } = this.state,
            tooltipArea = ReactDOM.findDOMNode(this._tooltipArea),
            tooltipText = tooltipArea.value;
        const imgDataArray = {
            'url': url,
            'tooltip': tooltipText,
            'x': x,
            'y': y,
            'width': width,
            'height': height
        };
        console.log(url);

        addNewData(imgDataArray, () => {
            this.setState({ redirect: true });
        });
    }

    _uploadFile (file) {
        const url = `https://api.cloudinary.com/v1_1/${this.state.cloudName}/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        const progressElement = ReactDOM.findDOMNode(this._progressElement);
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        progressElement.style.width = 0;
        xhr.upload.addEventListener('progress', function (e) {
            const progress = Math.round((e.loaded * 100.0) / e.total);
            progressElement.style.width = progress + '%';
        });

        xhr.onreadystatechange = (() => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const url = response.secure_url;
                const tokens = url.split('/');
                const img = new Image();
                img.src = tokens.join('/');
                img.alt = response.public_id;
                this.setState({ url: img.src });
            }
        }).bind(this);

        fd.append('upload_preset', this.state.unsignedUploadPreset);
        fd.append('tags', 'browser_upload');
        fd.append('file', file);
        xhr.send(fd);
    }

    _dragenter (e) {
        e.stopPropagation();
        e.preventDefault();
    }

    _drop (e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;

        this.handleFiles(files);
    }

    _dragover (e) {
        e.stopPropagation();
        e.preventDefault();
    }


    _handleFiles (selectorFiles: FileList) {
        for (let i = 0; i < selectorFiles.length; i++) {
            this.uploadFile(selectorFiles[i]);
        }
    };


    componentDidMount () {
        const dropbox = ReactDOM.findDOMNode(this._dropboxArea);

        dropbox.addEventListener('dragenter', this.dragenter, false);
        dropbox.addEventListener('dragover', this.dragover, false);
        dropbox.addEventListener('drop', this.drop, false);
    }


    render () {
        const { url } = this.state;

        const imgSavingContent =
            `${ url }` === '/'
                ? ''
                : (
                    <div
                        className={Styles.uploadedImgContainer}
                        ref={(node) => {
                            this._imgSavingInner = node
                        }}>
                            <RegionSelect
                                maxRegions={1}
                                regions={this.state.regions}
                                constraint
                                onChange={this.onChange}
                            >
                                <img src={url}/>
                            </RegionSelect>
                            <textarea
                                name='tooltip'
                                className={Styles.tooltip}
                                ref={(node) => {
                                    this._tooltipArea = node
                                }}
                                placeholder='Add tooltip to your image'>

                            </textarea>
                            <button className={Styles.btnSave} onClick={this.handleBtnSave}>Save changes</button>
                    </div> );

        return (
            <div>
                <div ref={(node) => {
                    this._dropboxArea = node
                }} className={Styles.managerContainer}>
                    <div className={Styles.uploadContainer}>
                        <div className={Styles.progressBar}>
                            <div className='progress-bar' id='progress-bar'>
                                <div
                                    className='progress'
                                    ref={(node) => {
                                        this._progressElement = node
                                    }}
                                />
                            </div>
                        </div>
                        <form>
                            <div className='form_line'>
                                <div className='form_controls'>
                                    <div className='upload_button_holder'>
                                        <span>DROP OR...</span>
                                        <input type='file'
                                               ref={(node) => {
                                                   this._findElem = node
                                               }}
                                               accept='image/*'
                                               onChange={(e) => this.handleFiles(e.target.files)}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={Styles.imgSaving}>
                        {imgSavingContent}
                    </div>
                    {this.renderRedirect()}
                </div>
            </div>
        )
    }
}