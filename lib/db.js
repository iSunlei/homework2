const Tapable = require('tapable')

class DB extends Tapable {
  constructor(options) {
    super()
    this.options = options
  }

  request(options) {

    return new Promise((resolve, reject) => {
      // 有 options 则设置 options 插件
      if (options) {
        options = Object.assign(this.options || {}, options)
        this.applyPlugins('options', options)
      }

      let result = this.applyPluginsBailResult('endpoint', options)

      Promise.resolve(result).then((res) => {
        let judgeResult = this.applyPluginsBailResult('judge', res)
        if (judgeResult) {
          reject(res)
        } else {
          resolve(res)
        }
      }, () => {
        reject()
      })
    })
  }
}

module.exports = DB