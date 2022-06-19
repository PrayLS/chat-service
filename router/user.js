const router = require('koa-router')();
const userController = require('../controllers/user');
/**
 * 注册
 */
router.post('/register', async ctx => {
    let { userName, password, avatar } = ctx.request.body;
    let result = await userController.register({ userName, password, avatar })
    ctx.body = result;
})

/**
 * 登录
 */
router.post('/login', async ctx => {
    let { userName, password } = ctx.request.body
    let result = await userController.login({ userName, password })
    ctx.body = result;
})


module.exports = router.routes()