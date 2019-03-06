import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">Boss Info Page</NavBar>
                <AvatarSelector
                selectAvatar={(imgname)=>{
                    this.setState({
                        avatar: imgname,
                    })
                }}
                ></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>
                    Recruitment
                </InputItem>
                <InputItem onChange={(v) => this.onChange('company', v)}>
                    Company
                </InputItem>
                <InputItem onChange={(v) => this.onChange('money', v)}>
                    Salary
                </InputItem>
                <TextareaItem
                    title="Require"
                    onChange={(v) => this.onChange('desc', v)}
                    rows={6}
                    autoHeight
                />
                <Button
                onClick={()=> {
                    this.props.update(this.state)
                }}
                 type='primary'>Save</Button>
            </div>
        )
    }
}

export default BossInfo