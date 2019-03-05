import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogin() {
        this.props.login(this.state)
    }
    register() {
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
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
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin} className="button">Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary" className="button">Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login