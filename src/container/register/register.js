import React from 'react'
import Logo from '../../components/logo/logo'
import './register.css'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import imoocForm from '../../components/imoocForm/imoocForm'

@connect(
    state => state.user,
    { register }
)
@imoocForm
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius',
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    onChange = (type) => {
        this.setState({
            type,
        })
    }

    handleRegister() {
        this.props.register(this.state)
        console.log(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem
        const { type } = this.state
        const data = [
            { type: 'genius', label: 'genius' },
            { type: 'boss', label: 'boss' },
        ]
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
                <Logo />
                <WingBlank>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >
                            Username
                         </InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('pwd', v)}
                        >
                            Password
                         </InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('repeatpwd', v)}
                        >
                            Repeat Pwd
                         </InputItem>
                    </List>
                    <WhiteSpace />
                    <List renderHeader={() => 'User Type Select'}>
                        {data.map(i => (
                            <RadioItem key={i.type} checked={type === i.type} onChange={() => this.onChange(i.type)}>
                                {i.label}
                            </RadioItem>
                        ))}
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleRegister}>Register!</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register