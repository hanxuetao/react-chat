import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert

        alert('Log Out', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            } },
          ]);
        
        // console.log('logout')
    }

    render() {
        const props = this.props
        const Item = List.Item
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{ width: 50 }} alt="" />}
                    title={props.title}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => 'Introduction'} className="user-info">
                    <Item
                        multipleLine
                        className="intro-list"
                        >
                        {props.title}
                        {props.desc.split('\n').map(v => <Item.Brief key={v}>{v}</Item.Brief>)}
                        {props.money ? <Item.Brief>Money:{props.money}</Item.Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>Log Out</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo} />
    }
}

export default User