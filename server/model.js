const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)

// 定义数据模型
const models = {
	user:{
		'user':{type:String, require:true},
		'pwd':{type:String, require:true},
		'type':{type:String, require:true},
		//头像
		'avatar':{type:String},
		//个人简介或者职位简介
		'desc':{type:String},
		//职位名 寻求或者招聘
		'title':{type:String},
		//boss专属字段
		'company':{type:String},
		'money':{type:String}
	},
	chat: {
		'chatid':{'type':String,'require':true},
		'from':{'type':String, 'require':true},
		'read':{'type':Boolean, default:false},
		'to':{'type':String, 'require':true},
		'content':{'type':String, 'require':true, default:''},
		'create_time':{'type':Number, 'default':new Date().getTime()}
	}
}

//遍历models的数据
for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}

