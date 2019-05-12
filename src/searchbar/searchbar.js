import React, {Component} from 'react'
import './searchbar.css'

export default class Searchbar extends Component {

    state = {

    }

    render(){
        return(
            <div className="logo-container">   
                <input 
                    type="text"
                    className='searchbar-input'
                    placeholder='YouTube Url'
                    defaultValue={this.props.value}   
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onKeyPress}
                    autoFocus={true}
                />
                <br/>
                <button className='btn btn-primary' onClick={this.props.onClick} >Search</button>
                <br/>
            </div>
        )
    }
}