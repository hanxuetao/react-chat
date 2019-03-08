import React from 'react'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../nav-link/navlink'
import { connect } from 'react-redux'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'

function Msg() {
    return <h2>Msg Page</h2>
}


@connect(
    state => state
)
class Dashboard extends React.Component {

    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: 'Genius',
                icon: 'boss',
                title: 'Genius list',
                component: Boss,
                hide:user.type==="genius",
            },
            {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss list',
                component: Genius,
                hide:user.type==="boss",
            },
            {
                path: '/msg',
                text: 'msg',
                icon: 'msg',
                title: 'Message list',
                component: Msg,
            },
            {
                path: '/me',
                text: 'me',
                icon: 'user',
                title: 'User Center',
                component: User,
            }
        ]
        return (
            <div>
                <NavBar>{navList.find(v =>v.path===pathname).title}</NavBar>
                <div>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>
                <NavLinkBar className="nav-tab-bar" data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard