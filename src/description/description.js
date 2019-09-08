import React, {Component} from 'react'
import './description.css'

export default class Description extends Component {
    render(){
        return(
            <div>
                <div className="description-container">   
                    <img 
                        src={this.props.img} 
                        alt="+58 Cafe Logo"  
                        srcSet=""
                        className="header-logo"
                    />

                    <div>
                        <p>title: {this.props.title}</p>
                        <p>duration: {this.props.duration}</p>
                    </div>

                </div>
                <div className="description-select">
                    <select
                        onChange={this.props.handleSelectFormat}
                        defaultValue="mp4" >
                        <option value=".mp4">.MP4</option>
                        <option value=".mp3">.MP3</option>
                    </select>
                </div>

                <br/>
                <br/>
                
                <div className='description-btns'>
                    <button className='btn btn-danger' onClick={this.props.handleHideDescription} >Cancel</button>

                    <button className='btn btn-primary' onClick={this.props.handleDownladVideo} >Download</button>
                </div>
            </div>
        )
    }
}