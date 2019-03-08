import React from 'react'

export default function imoocForm(Component) {
    return class WrapperComp extends React.Component {
        constructor(props){
            super(props)
            this.state={}
            this.handleChange = this.handleChange.bind(this)
        }

        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }

        render() {
            return <Component handleChange={this.handleChange} state={this.state} {...this.props}></Component>
        }
    }
}