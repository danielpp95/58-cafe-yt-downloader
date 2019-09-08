import React, {Component} from 'react'

import './home.css'

import Logo from '../../logo/logo'
import SearchBar from '../../searchbar/searchbar'
import Description from '../../description/description'
import Spin from '../../loaders/spin'
import Error from '../../error/badrequest'

import {FormatedTime} from '../../widgets'

export default class HomePage extends Component {

    
    state = {
        url: '',
        title: '',
        img: '',
        showDescription: false,
        file: '',
        isLoading: false,
        error: false,
        errorMessage: '',
        format: '.mp4',
    };

    handleChangeUrl = (sender) => {
        var url = sender.target.value
        this.setState({url, showDescription: false})
    }

    handleKey = e => {
        if(e.key === 'Enter'){
            this.handleSearchVideo()
        }
    }

    handleGetParameters = sender => {
        return `FORMAT=${this.state.format}&URL=${this.state.url}`
    }
    
    handleSearchVideo =  (sender) => {
        this.setState({isLoading: true, error: false})

        const url = this.state.url;

        const validation = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/(watch?v=)?.+$/.test(url);

        if (validation) {
            fetch(`/info?${this.handleGetParameters()}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    showDescription: true,
                    title: data.title,
                    duration: data.player_response.videoDetails.lengthSeconds,
                    img: data.author.avatar,//thumbnail_url,
                    isLoading: false,
                    error: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({isLoading: false, error: true})
            })
        } 
        else if (url === '') {
            this.setState({isLoading: false, error: true, errorMessage: 'Url no puede estar en blanco'})

        }
        else {
            this.setState({isLoading: false, error: true, errorMessage: 'Url invalida'})
        }

        
    }

    handleHideDescription = sender => {
        this.setState({showDescription: false, error: false})
    }

    handleDownladVideo = sender => {
        window.location.href = `/download?${this.handleGetParameters()}`;
    }

    handleSelectFormat = sender => {
        var format = sender.target.value
        this.setState({format})
    }

    render(){
        return(
            <div className='body'>   
                <Logo />
                <SearchBar 
                    value={this.state.url}
                    onClick={this.handleSearchVideo}
                    onKeyPress={this.handleKey}   
                    onChange={this.handleChangeUrl} 
                />
                {this.state.isLoading && <Spin/>}
                {this.state.error && <Error errorMessage={this.state.errorMessage} />}
                {
                    this.state.showDescription &&
                    <Description
                        duration={FormatedTime(this.state.duration)}
                        title={this.state.title}
                        img = {this.state.img}
                        handleHideDescription={this.handleHideDescription}
                        handleDownladVideo={this.handleDownladVideo}
                        isLoading={this.state.isLoading}
                        handleSelectFormat={this.handleSelectFormat}
                    /> 
                }
            </div>
        )
    }
}