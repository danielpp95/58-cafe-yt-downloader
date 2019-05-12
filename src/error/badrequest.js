import React from 'react'

import './badrequest.css'

export default (props) => (
    <div className="error-container">
        <p>Error 400</p>
        <br/>
        <p>{props.errorMessage}</p>
    </div>
)