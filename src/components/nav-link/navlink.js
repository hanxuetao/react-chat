import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component {

    render() {

        const { pathname } = this.props.location
        const navList = this.props.data.filter(v => !v.hide)
       
        return (
            <TabBar tabBarPosition="bottom">
                {navList.map(v => (
                    <TabBar.Item
                        badge={v.path==='/msg'?this.props.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{ uri: require(`./img-bar/${v.icon}.png`) }}
                        selectedIcon={{ uri: require(`./img-bar/${v.icon}-active.png`) }}
                        selected={pathname === v.path}
                        onPress={()=>{
							this.props.history.push(v.path)
						}}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

NavLinkBar.propTypes = {
    data: PropTypes.array.isRequired,
}

export default NavLinkBar