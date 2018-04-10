/**
 * NOTE
 * handler 接受两个参数
 * params 为客户端请求数据，可以为基本类型或者对象
 * callback 为回调函数，handler在成功或者失败后调用
 * 响应数据内容为：{success: true/false, data: 页面接受的内容}
 */

export default {
  handleDataReceived: (params, func) => {
    // TODO
    func({
      success: true,
      data: params % 2 ? 'green' : 'red'
    })
  }
}
