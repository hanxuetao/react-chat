import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
@withRouter

class NavLinkBar extends React.Component {

    render() {

        const { pathname } = this.props.location
        const navList = this.props.data.filter(v => !v.hide)
        // console.log(navList)
        // console.log(pathname)
        return (
            <TabBar tabBarPosition="bottom">
                {navList.map(v => (
                    <TabBar.Item
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