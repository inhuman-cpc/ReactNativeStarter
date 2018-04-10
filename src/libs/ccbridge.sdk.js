(function (w) {
  var promiseChain = Promise.resolve()
  var callbacks = {}
  var noop = function () {}
  var guid = function () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  w.ccbridge = {
    /**
     * send message to the React-Native WebView onMessage handler
     * @param handler - name of the function to invoke on the React-Native side
     * @param params - params to pass
     * @param success - success callback
     * @param error - error callback
     */
    callHandler: function (handler, params, success, error) {
      var msgObj = {
        handler: handler,
        params: params || {}
      }

      if (success || error) {
        msgObj.callbackId = guid()
      }

      var msg = JSON.stringify(msgObj)

      promiseChain = promiseChain.then(function () {
        return new Promise(function (resolve, reject) {
          if (msgObj.callbackId) {
            callbacks[msgObj.callbackId] = {
              onsuccess: success,
              onerror: error
            }
          }

          w.postMessage(msg)

          resolve()
        })
      }).catch(function (e) {
        console.error(e.message)
      })
    }
  }

  w.document.addEventListener('message', function (e) {
    var message
    try {
      message = JSON.parse(e.data)
    } catch (err) {
      console.error(err.message)
      return
    }

    var cbConfig = callbacks[message.callbackId]
    if (cbConfig) {
      var callback = message.success === true ? cbConfig.onsuccess : cbConfig.onerror
      callback = callback || noop
      callback(message.data)
      delete callbacks[message.callbackId]
    }
  })
}(window))
