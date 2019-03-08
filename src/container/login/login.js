import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import imoocForm from '../../components/imoocForm/imoocForm'

@connect(
    state => state.user,
    { login }
)
@imoocForm
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    

    handleLogin() {
        this.props.login(this.props.state)
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
                            onChange={v => this.props.handleChange('user', v)}
                        >
                            Username
                        </InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
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