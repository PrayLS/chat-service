const userModel = require('../models/user');


class userController {

    /**
     * @description 用户注册
     * @param {String} userName 用户名
     * @param {String} password 密码
     * @param {String} avatar 头像
     */
    async register ({ userName, password, avatar }) {
        try {
            let _user = await userModel.findOne({ userName });
            if (_user) {
                return {
                    msg: '用户名已存在',
                    code: 400
                }
            } else {
                let userInfo = new userModel({
                    userName,
                    password,
                    avatar,
                    groups: {
                        '0002': {
                            userName:'22',
                            password:'fdfsdf',
                            avatar:'dfdfdfsd',
                        }
                    },
                    friends: {
                        '0001': {
                            userName:'22',
                            password:'fdfsdf',
                            avatar:'dfdfdfsd',
                        }
                    }
                });
                let result = await userInfo.save();
                return {
                    msg: '注册成功',
                    code: 200,
                    data: result
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * @description 用户登录
     * @param {String} userName 用户名
     * @param {String} password 密码
     */
    async login ({userName, password}) {
        try {
            console.log(userName, password)
            let _user = await userModel.findOne({userName})
            if (!_user) {
                return {
                    msg: '用户名不存在，请注册',
                    code: 400
                }
            } else if(_user.password !== password) {
                return {
                    msg: '密码错误',
                    code: 400
                }
            } else {
                return {
                    msg: '登录成功',
                    code: 200,
                    data: _user
                }
            }

        } catch (err) {
            console.log(err)
        }
    }
        
}
module.exports = new userController();