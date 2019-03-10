const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }

Router.get('/list', function (req, res) {
    const { type } = req.query
    // User.remove({type=''}, function(e,d){})
    User.find({ type }, function (err, doc) {
        return res.json(doc)
    })
})

Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid
    // Chat.remove({}, function(e,d){})
    User.find({}, function (e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        })

        Chat.find({'$or':[{from:user},{to:user}]}, function (err, doc) {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users:users })
            }
        })
    })
   
})

Router.post('/update', function (req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json.dumps({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
})
//登录功能
Router.post('/login', function (req, res) {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5pwd(pwd) }, { 'pwd': 0 }, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: 'Username dose not exist or Wrong Password!' })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc })
    })

})
//注册功能
Router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body
    console.log(req.body)
    User.findOne({ user: user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: 'Username cannot repeat' })
        }
        const userModel = new User({ user, type, pwd: md5pwd(pwd) })
        userModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            const { user, type, _id } = d
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
    })
})

Router.get('/info', function (req, res) {
    const { userid } = req.cookies
    //用户有没有cookie
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: 'Internal Error' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

// 密码加密函数
function md5pwd(pwd) {
    const salt = 'Do_you-know_the-way23@#90JHEWI9!&&*'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router