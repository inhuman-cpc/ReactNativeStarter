# JavaScriptBridge

JS端应用层做了封装，使用如下方式调用：

```javascript
ccbridge.ui.openWebPage(...)
```

> *ccbridge* 底层调用Native端则按照各自的 Bridge 实现而有所不同，最大的不同在于参数的传递：iOS端始终接受到的是一个Map（没有参数则是空的Map），而 Android端则依据方法签名。

## App

### checkAppInstalled （异步方法）

> 检查某个App是否已安装

* Added in app version **2.6.0**

```javascript
// ios 端接受到的参数为 {name: '...'}
ccbridge.app.checkAppInstalled(name, function (version) {
  //  空字符串则表示未安装
  console.log(version)
})
```

##

### launchExternalApp （同步方法）

> 打开外部的App

* Added in app version **2.6.0**

```javascript
// ios 端接受到的参数为 {name: '...'}
ccbridge.app.launchApp(name)
```

## Data

### getUserProfile （异步方法）

> 获取用户信息

* Added in app version **2.6.0** ，返回值如下：

| 名称     | 类型   | 必选 | 描述     |
| -------- | ------ | ---- | ------- |
| name     | String | 是   | 用户名   |
| avatar   | String | 是   | 用户头像 |
| language | String | 否   | 语言     |



```javascript
// ios 端 参数只有 callback
ccbridge.data.getUserProfile(function(user){
  // 获取失败返回空字符串
  if (user) {
    alert('获取成功')
  } else {
    alert('获取失败')
  }
})
```



### isLoggedIn （异步方法）

> 用户是否已登录

* Added in app version **2.6.0**

```javascript
ccbridge.data. isLoggedIn(function (isLoggedIn) {
  // 返回 1表示 已登录，返回 0 表示未登录
  alert(isLoggedIn)
})
```

### setClipboard （异步方法）

> 复制文本到剪切板

* Added in app version **2.6.0**

```javascript
// ios 端参数为 {name: '...'}
ccbridge.data.setClipboard(someText, function (result) {
  // 返回 1表示 操作成功，返回 0 操作失败
  if (result) {
    alert('复制成功')
  } else {
    alert('复制失败')
  }
})
```

### saveImage （异步方法）(暂未实现)

> 保存图片到本地SD卡或相册


```javascript
// ios端参数为 {url: '...'} 或者 {content: '...'}
ccbridge.data.saveImage(urlOrBase64String, function (data) {
    // 返回对象，200 表示成功 400 表示客户端异常 500 表示服务端异常，自行决定
    // {code: 200/400/500, message: '错误详情', imageId: '图片本地路径'}
    console.log(data)
})
```

### ajax （异步方法）

> Https网络请求

* Added in app version **2.6.0**

```javascript
// method 为 GET / POST，GET 传入 dataMap 未空
ccbridge.data.ajax(url, method, dataMap, function (json) {
  // 返回对象，200 表示成功 400 表示客户端异常 500 表示服务端异常，自行决定
  // {code: 200/400/500, message: '错误详情', data: [返回数据]}
  if (json && json.code === 200) {
    console.log('请求成功')
  } else {
    console.log('请求失败')
  }
})
```


## Device

### getDeviceInfo （异步方法）

> 获取当前设备信息

* Added in app version **2.6.0**

| 名称          | 类型   | 描述                   |
| ------------- | ------ | ---------------------- |
| systemName    | String | 系统名，如"Android OS" |
| systemVersion | String | 系统版本               |
| model         | String | 机器系列               |
| identifier    | String | 设备唯一标识           |

```javascript
ccbridge.device.getDeviceInfo(
  function (data) {
    // ios端返回对象，失败则返回空字符串
    console.log(data)
  }
)
```

### getPlatform （异步方法）

> 获取App包的相关信息

* Added in app version **2.6.0**

| 名称        | 类型   | 描述                  |
| ----------- | ------ | --------------------- |
| packageName | String | App包名, 如com.wechat |
| versionName | String | App版本名称，如2.5.1  |
| versionCode | Int    | App版本号             |

```javascript
ccbridge.device.getPlatform(
  function (data) {
    // ios端返回对象，失败则返回空字符串
    console.log(data)
  }
)
```

## UI

### goBack

> 后退 webview 页面

* Added in app version **2.6.0**

```javascript
ccbridge.ui.goBack()
```

### popBack

> 关闭当前Web页面

* Added in app version **2.6.0**

```javascript
ccbridge.ui.popBack()
```

### openWebPage

> 打开一个Web页面

* Added in app version **2.6.0**

```javascript
// 0为当前webview打开，1为新的webview打开，2为外部浏览器打开，默认为0
// ios 端参数为 {url: 'xxx', target: 0}
ccbridge.ui.openWebPage(url, target)
```

### openAppPage （同步方法）

> 打开APP内native页面

* Added in app version **2.6.0**

| 页面       | 传入参数 | 描述           | 支持的App版本 |
| ---------- | -------- | -------------- | ------------- |
| login      |          | 登录页面       |      >=2.6.0         |
| register   |          | 注册页面       |     >=2.6.0          |
| invite     |          | 邀请页面       |       >=2.6.0        |
| otc_ad     |          | 首页场外广告页 |       >=2.6.0        |
| wallet     |          | 钱包           |      >=2.6.0         |

```javascript
// ios 端参数为 {page: '/invite', extra: ''}
ccbridge.ui.openAppPage(page, extra)
```

### showShareMenu （同步方法）

> 显示分享弹窗菜单，可分享内容到微信

* Added in app version **2.6.0**

```javascript
// type = 1:文字,  2:图片，3:网页  4:音乐,  5:视频, (目前暂不支持4, 5)
// 分享文字：text
// 分享图片:  bitmap
// 分享网页:  url，title,  description,  thumbData
// 分享音乐:  url， title,  description
// 分享视频:  url,  title,  description,  thumbData
// ios 端参数 {type: 1, params: {...}}
ccbridge.ui.showShareMenu(type, params)
```

### showTips （同步方法）

> 弹出一个Toast提示

* Added in app version **2.6.0**

```javascript
// ios 端参数为 {text: '请求成功', duration: 2000}
ccbridge.ui.showTips(text, duration)
```

### showActionSheet （异步方法）

```javascript
// ios 端参数为 {title: '请选择城市', items: ['北京', '上海'], cancelText: '取消'}
ccbridge.ui.showActionSheet(title, items, cancelText, function (data) {
  // 用户选择项目
  alert(data)
})
```

### showDialog

```javascript
// ios 端参数为 {content: '确定要删除吗？', okText: '删除', cancelText: '取消'}
ccbridge.ui.showDialog(content, okText, cancelText, function(data){
  // 成功则返回 true 或者 'ok'，失败返回 false 或 ''
  alert(data)
})
```
