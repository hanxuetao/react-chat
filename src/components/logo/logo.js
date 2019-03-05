import React from 'react'
import logoImg from './JOB.png'
import './logo.css'
class Logo extends React.Component {

    render() {
        return (
            <div className="logo-container">
            <img src={logoImg} className="LogoPic" alt="" />
            </div>
        )
    }
}

export default Logo