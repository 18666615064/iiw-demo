<template lang="pug">
  .detecitonBox
    .detecitonBox_title 更新时间： {{ data.cretime }}
    .row
      .col-12
        .listBox.shadow-2
          .row
            .col-2.iconBox
              i(class="iconfont icon-gonglv text-cyan-6")
            .col-5.contentBox
              p(class="title") RX信号强度水平
              p(class="content")
              |{{ data.rxlev }}<span class="unit">dBm</span>
            .col-5.commentBox
              p -110 信号最差
              p 信号值越大信号越好
      .col-12
        .listBox.shadow-2
          .row
            .col-2.iconBox
              i(class="iconfont icon-cuowu text-red-7")
            .col-5.contentBox
              p(class="title") 误码率
              p(class="content")
              |{{ data.ber }}<span class="unit">%</span>
      .col-12
        .listBox.shadow-2
          .row
            .col-2.iconBox
              i(class="iconfont icon-zhiliang text-green-5")
            .col-5.contentBox
              p(class="title") 信号接收质量
              p(class="content")
              |{{ data.rsrq }}
            .col-5.commentBox
              p 质量范围：-3 ~ -19.5
              p 值越大，接收质量越好
      .col-12
        .listBox.shadow-2
          .row
            .col-2.iconBox
              i(class="iconfont icon-wuma text-light-blue-10")
            .col-5.contentBox
              p(class="title") 信号接收功率
              p(class="content")
              |{{ data.rsrp }}<span class="unit">dBm</span>
            .col-5.commentBox(@click="showing = true")
              p {{ data.rsrp > -65 ? '非常好' : (data.rsrp < -65 && data.rsrp > -75) ? '好' : (data.rsrp < -75 && data.rsrp > -85) ? '较好' : (data.rsrp < -85 && data.rsrp > -95) ? '一般' : (data.rsrp < -95 && data.rsrp > -105) ? '差' : '较差'}}
              p
                |信号等级 {{ data.rsrp > -65 ? '1' : (data.rsrp < -65 && data.rsrp > -75) ? '2' : (data.rsrp < -75 && data.rsrp > -85) ? '3' : (data.rsrp < -85 && data.rsrp > -95) ? '4' : (data.rsrp < -95 && data.rsrp > -105) ? '5' : '6'}}
                q-icon(name="help")
              q-modal(v-model="showing" position="top")
                  q-card-main
                    q-item-tile(style="font-size: 16px;") 信号衡量标准
                  .gradient_popover
                    .row
                      .col-5
                        |<span class="span_left">非常好</span>---- 信号强度 1
                      .col-5 Rx > -65
                      .col-5
                        |<span class="span_left">好</span>---- 信号强度 2
                      .col-5 -65 < Rx < -75
                      .col-5
                        |<span class="span_left">较好</span>---- 信号强度 3
                      .col-5 -75 < Rx < -85
                      .col-5
                        |<span class="span_left">一般</span>---- 信号强度 4
                      .col-5 -85 < Rx < -95
                      .col-5
                        |<span class="span_left">差</span>---- 信号强度 5
                      .col-5 -95 < Rx < -105
                      .col-5
                        |<span class="span_left">较差</span>---- 信号强度 6
                      .col-5 -105 < Rx
      .col-12
        .listBox.shadow-2
          .row
            .col-2.iconBox
              i(class="iconfont icon-duration text-blue-grey-4")
            .col-8.contentBox
              p(class="title") 开机到附网时长
              p(class="content")
              |{{ data.nettime }}<span class="unit">s</span>
      .col-12
        .listBox.shadow-2
          .row
            .col-2.iconBox
              i(class="iconfont icon-duration text-brown-5")
            .col-8.contentBox
              p(class="title") 开机到登陆时长
              p(class="content")
              |{{ data.logintime }}<span class="unit">s</span>
      .col-12.listBox.shadow-2
        .row
          .col-2.iconBox
            i(class="iconfont icon-duration")
          .col-8.contentBox
            p(class="title") 开机到最后数据上报时长
            p(class="content")
            |{{ data.uploadtime }}<span class="unit">s</span>
</template>

<script>
import { getInfoList } from '@/api/meter'
export default {
  data() {
    return {
      showing: false,
      data: {
        rxlev: '',
        ber: '',
        rsrq: '',
        rsrp: '',
        nettime: '',
        logintime: '',
        uploadtime: '',
        cretime: ''
      }
    }
  },
  created() {
    this.wsMonitor(this.$route.params.imei)
    this.initGet()
  },
  mounted() {
    document.title = 'NB-IoT · 信号探测仪'
  },
  methods: {
    wsMonitor(imei) {
      var es = new EventSource(`/server/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      // var es = new EventSource(`/admin/devicecenter/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      es.addEventListener('dataLog', e => {
        console.log(e, 'ws')
        let data = JSON.parse(e.data)
        this.data.cretime = this.Timestamps(data.cretime)
        console.log(data, 'data')
        console.log(this.Timestamps(data.cretime), 'time')
        switch (data.name) {
          case 'rxlev':
            this.data.rxlev = data.value
            break
          case 'ber':
            this.data.ber = data.value
            break
          case 'rsrq':
            this.data.rsrq = data.value
            break
          case 'rsrp':
            this.data.rsrp = data.value
            break
          case 'nettime':
            this.data.nettime = data.value
            break
          case 'logintime':
            this.data.logintime = data.value
            break
          case 'uploadtime':
            this.data.uploadtime = data.value
            break
          default:
            break
        }
      })
    },
    initGet() {
      this.getInfoList('rxlev')
      this.getInfoList('ber')
      this.getInfoList('rsrq')
      this.getInfoList('rsrp')
      this.getInfoList('nettime')
      this.getInfoList('logintime')
      this.getInfoList('uploadtime')
    },
    getInfoList(type) {
      getInfoList({
        imei: this.$route.params.imei,
        name: type,
        size: 5
      }).then(res => {
        let data = res.data
        switch (type) {
          case 'rxlev':
            this.data.rxlev = data[0].value
            break
          case 'ber':
            this.data.ber = data[0].value
            break
          case 'rsrq':
            this.data.rsrq = data[0].value
            break
          case 'rsrp':
            this.data.rsrp = data[0].value
            break
          case 'nettime':
            this.data.nettime = data[0].value
            break
          case 'logintime':
            this.data.logintime = data[0].value
            break
          case 'uploadtime':
            this.data.uploadtime = data[0].value
            this.data.cretime = data[0].cretime
            break
          default:
            break
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          type: 'negative',
          position: 'top-left'
        })
      })
    },
    Timestamps(time) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let date = new Date(time)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="less" scoped>
  .detecitonBox {
    padding: 10px;
    height: 100vh;
    background: linear-gradient(-48deg, #8888ce, #43e6d4);
    .listBox {
      margin-top: 10px;
      padding: 10px 0;
      background-color: #fff;
      border-radius: 8px;
      .iconBox {
        text-align: center;
        line-height: 42px;
      }
      .contentBox {
        color: #233A4A;
        p {
          margin-bottom: 0;
        }
        .title {
          font-size: 13px;
          padding-bottom: 10px;
        }
        .content {
          font-size: 18px;
        }
      }
      .commentBox {
        padding-right: 10px;
        text-align: right;
        color: #ababab;
        p {
          margin-bottom: 0;
          font-size: 12px;
          line-height: 20px;
        }
        .q-icon {
          padding-left: 4px;
          font-size: 14px;
          vertical-align: sub;
        }
      }
      .col-4 {
        color: #899CF4;
      }
    }
  }
  .detecitonBox_title {
    color: #fff;
  }
  .unit {
    padding-left: 3px;
    font-size: 12px;
  }
  .iconfont {
    font-size: 30px;
  }
  .gradient_popover {
    padding: 0 15px;
    padding-bottom: 15px;
    font-size: 12px;
    line-height: 30px;
    .span_left {
      display: inline-block;
      width: 45px;
      text-align: center;
    }
  }
</style>
