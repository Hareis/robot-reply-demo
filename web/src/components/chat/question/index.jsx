import React, { Component } from 'react'
import './index.css'

export default function (props) {    
    return (
        <div>
             <div>
            我：
            </div>
            <div className='question'> {props.text}  </div>
        </div>
    )
}
