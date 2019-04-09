const express = require('express')
const session = require('cookie-session')

const { log } = require('./utils')
const { secretKey } = require('./config')

// 引入路由文件
const index = require('./routes/index')

// 先初始化一个 express 实例
const app = express()

// 设置 session, 这里的 secretKey 是从 config.js 文件中拿到的
app.use(session({
    secret: secretKey,
}))

// 使用 app.use(path, route) 的方式注册路由程序
// path 是访问路由的前缀(注意, 这里并不是完整的路由, 只是一个路由的前缀),
// 比如 foo 里有一个 app.get('/foo', () => {})
// 那么 foo.get('/bar') 匹配的路由就是 /foo/bar
app.use('/api', index)


// app.use('/api/user', index)

// 把逻辑放在单独的函数中, 这样可以方便地调用
// 指定了默认的 host 和 port, 因为用的是默认参数, 当然可以在调用的时候传其他的值
const run = (port=3000, host='') => {
    // app.listen 方法返回一个 http.Server 对象, 这样使用更方便
    const server = app.listen(port, host, () => {
        // 非常熟悉的方法
        const address = server.address()
        host = address.address
        port = address.port
        log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    const port = 3000
    // host 参数指定为 '0.0.0.0' 可以让别的机器访问你的代码
    const host = '0.0.0.0'
    run(port, host)
}