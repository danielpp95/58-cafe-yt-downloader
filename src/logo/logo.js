import React, {Component} from 'react'
import './logo.css'

import logo from '../../static/logo.png'

export default class Logo extends Component {

    state = {

    }

    render(){
        return(
            <div className="logo-container">   
                <img 
                    src={logo} 
                    alt="+58 Cafe Logo"  
                    srcSet=""
                    className="logo-img"
                />

              <p className="logo-title" >+58 cafe Video Downloader</p>

            </div>
        )
    }
}