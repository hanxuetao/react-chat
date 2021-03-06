import axios from 'axios'
import { getRedirectPath } from "../util";
const AUTH_SUCCESS ='AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOG_OUT = 'LOG_OUT'
const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    pwd: '',
    type: '',
}

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                isAuth: true,
                ...action.payload,
            }
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            }
        case LOG_OUT:
            return {
                ...initState,
                redirectTo:'/login'
            }    
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        default:
            return state
    }
}

function authSuccess (obj) {
    const {pwd, ...data}=obj
    return { type: AUTH_SUCCESS, payload: data }
}


function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function update(data){
    return dispatch =>{
        axios.post('/user/update', data)
            .then(res =>{
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function loadData(userinfo){
	return { type:LOAD_DATA, payload:userinfo}
}

export function logoutSubmit() {
    return { type:LOG_OUT}
}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('Username and Password must be filled')
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('Username, Password and Usertype must be filled')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('Password must be same as Repeat Password')
    }

    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }


}