const Koa = require('koa');
const KoaBody = require('koa-body');
const app = new Koa();
require('./db/db');
const router = require('./router/router');
const cors = require("koa2-cors");
app.use(cors());
app.use(KoaBody({
    multipart: true
}));

app.use(router.routes()).use(router.allowedMethods());
const server = require('http').Server(app.callback());

const io = require('socket.io')(server);
io.on("connection", socket => {
    // socket.on("submit", (data) => {
    //     let result = users.find(item => {
    //         return item.userName == data.userName
    //     })
    //     socket.emit("login", result)
    //     if (!result) {
    //         // 存储当前登陆用户的信息
    //         socket.userName = data.userName
    //         socket.avatar = data.avatar

    //         // 加入到用户数组
    //         users.push(data)
    //         socket.emit("loginSuccess", data)

    //         io.emit("addUser", data)
    //         io.emit("userList", users)
    //     }
    // })

    socket.on("sendMsg", data => {
        io.emit("sendAll", data)
    })

    // socket.on("sendFile", data => {
    //     io.emit("sendFileAll", data)
    // })

    // 用户断开连接的时候
    // socket.on('disconnect', () => {
    //     // 把当前用户的信息从users中删除掉
    //     let idx = users.findIndex(item => item.userName === socket.userName)
    //     // 删除掉断开连接的这个人
    //     users.splice(idx, 1)
    //     // 1. 告诉所有人，有人离开了聊天室
    //     io.emit('delUser', {
    //         userName: socket.userName,
    //         avatar: socket.avatar
    //     })
    //     // 2. 告诉所有人，userList发生更新
    //     io.emit('userList', users)
    // })
})
// io.on("connection", socket => {
//     console.log("连接成功")
//     socket.on('message', function (val) {
//         console.log(val)
//         socket.emit('welcome', {
//             msg: ` Hello ${val}`,
//             code: 200
//         })
//     })
// })

server.listen(3003, () => {
    console.log(`监听地址: http://localhost:3003`)
})