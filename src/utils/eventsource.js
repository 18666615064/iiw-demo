export default {
  install(Vue, connection, opts) {
    console.log(connection, '1111111111111111111111111')
    let onlist = {}
    let createConnection = function() {
      if (Vue.prototype.$socket) {
        Vue.prototype.$socket.close()
      }
      if (!Object.keys(onlist).length) {
        return
      }
      let events = []
      for (let key in onlist) events.push(key)
      let url = connection + '?&events=' + encodeURI(JSON.stringify(events) + '&imei=xxxxx')
      console.log(url, onlist, 'urlurlurlurlurl')
      let es = new EventSource(url, {
        withCredentials: 'include'
      })
      es.onlist = onlist
      es.addEventListener('open', function() {
        console.log('开启es连接')
      })
      es.addEventListener('close', function() {
        console.log('关闭es连接')
      })
      for (let key in onlist) {
        let methods = onlist[key]
        methods.forEach(func => {
          es.addEventListener(key, (e) => {
            func(JSON.parse(e.data))
          })
        })
      }
      Vue.prototype.$socket = es
    }
    let addListeners = function() {
      if (this.$options['socket']) {
        let conf = this.$options.socket
        if (conf.events) {
          Object.keys(conf.events).forEach((key) => {
            let func = conf.events[key].bind(this)
            onlist[key] = onlist[key] || []
            onlist[key].push(func)
            conf.events[key].__binded = func
          })
          createConnection()
        }
      }
    }
    let removeListeners = function() {
      if (this.$options['socket']) {
        let conf = this.$options.socket
        if (conf.events) {
          Object.keys(conf.events).forEach((key) => {
            let index = onlist[key].indexOf(conf.events[key].__binded)
            if (index > -1) {
              onlist[key].splice(index, 1)
              if (!onlist[key].length) delete onlist[key]
            }
          })
          createConnection()
        }
      }
    }
    Vue.mixin({
      beforeCompile: addListeners,
      beforeCreate: addListeners,
      beforeDestroy: removeListeners
    })
  }
}
