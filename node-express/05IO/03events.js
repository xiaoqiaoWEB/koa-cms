/*

 Node.js 事件循环:

 Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
 Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

 Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，

 如下实例：

* */

let events = require('events')
let EventEmitter = new events.EventEmitter()


setTimeout(() => {
  console.log('开始出发事件！')
  EventEmitter.emit('to_start', 'start 开始')
}, 1000) 

EventEmitter.on('to_start', (data) => {
  console.log(data)
  EventEmitter.emit('to_end', 'end 结束')
})

EventEmitter.on('to_end', (data) => {
  console.log(data)
})
