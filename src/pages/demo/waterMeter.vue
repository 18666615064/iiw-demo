<template lang="pug">
  .row
    .col-12
      q-card-title
        div(class="row items-center text-grey-6" style="font-size: 14px;")
          span(class="text-grey-10") 最后上报：
          q-icon(name="today")
          span(style="padding-left: 5px") {{theMonth.cretime}}
        div(class="row items-center text-blue-grey-9" style="font-size: 14px;")
          |累计用水：{{theMonth.allVal}}
          |<span style="padding-left: 5px; font-size: 12px;">m³</span>
      //- q-card-title
        | {{Wdata.name}}
        div(slot="right" class="row items-center")
          q-icon(name="today")
          span(style="padding-left: 5px") {{theMonth.cretime}}
        //- .col-12(style="font-size: 14px;")
          |{{Wdata.code}}
      q-card-main
        .row
          .col-7
            q-item-tile(label lines="1")
              | 当月用水量 <span style="padding-left: 5px; font-size: 12px;">m³</span>
              //- q-spinner-pie(style="padding-left: 10px" color="primary" :size="30")
            p(class="text-faded" style="font-size: 60px;")
              ICountUp(ref="test" :startVal="theMonth.startVal" :endVal="theMonth.endVal" :decimals="decimals" :duration="duration" :options="options" @ready="onReady")
              i(class="iconfont icon-water" style="font-size: 24px; color: #338edc")
          .col-5
            q-card-main(style="padding: 0;")
              q-item-tile(label lines="1" style="line-height: 18px")
                |收费金额 <span style="padding-left: 5px; font-size: 12px;">￥</span>
              p(class="text-faded" style="font-size: 40px; margin-bottom: 0")
                ICountUp(ref="test" :startVal="theMoney.startVal" :endVal="theMoney.endVal" :decimals="Mdecimals" :duration="duration" :options="options" @ready="onReady")
                i(class="iconfont icon-qian1 text-yellow-8" style="font-size: 24px;")
              p(class="gradient" @click="showing = true")
                |收费梯度：<span class="text-grey-6">{{theMoney.grade === 1 ? '第一梯度' : theMoney.grade === 2 ? '第二梯度' : '第三梯度'}}</span>
                q-icon(style="padding-left: 5px; font-size: 18px; vertical-align: middle" name="help_outline" color="grey-6")
                q-modal(v-model="showing" position="top")
                  q-card-main
                    q-item-tile(style="font-size: 16px;") 收费标准
                  .gradient_popover
                    .row
                      .col-2 第一梯度
                      .col-10(class="text-grey-7") 每户每月用水量26立方米及下
                      .col-10.offset-2(class="text-grey-7") 水价：1.95/m³
                      .col-2 第二梯度
                      .col-10(class="text-grey-7") 每户每月用水量27-34立方米，含34立方米
                      .col-10.offset-2(class="text-grey-7") 水价：2.97/m³
                      .col-2 第三梯度
                      .col-10(class="text-grey-7") 每户每月用水量34立方米以上
                      .col-10.offset-2(class="text-grey-7") 水价：3.96/m³
                      .col-12(class="text-red-8") * 该收费标准来自2018年广州市居民用水价格标准
        q-card-separator
        .row
          .col-12(style="padding-bottom: 5px; padding-top: 20px;")
            .row
              .col-3
                div(class="waterParameter-box")
                  div(class="waterParameter-box_unit")
                    |水温
                    i(class="iconfont icon-shuiwen text-light-blue-8")
                  | - - - -
              .col-3
                div(class="waterParameter-box")
                  div(class="waterParameter-box_unit")
                    |水压
                    i(class="iconfont icon-shuiya text-brown-5")
                  //- | 0.1<span class="waterParameter-box_unitSpan text-faded">Pa</span>
                  | - - - -
              .col-3
                div(class="waterParameter-box")
                  div(class="waterParameter-box_unit")
                    |TDS
                    i(class="iconfont icon-shuizhi text-green-8")
                  | - - - -
                  //- | 126<span class="waterParameter-box_unitSpan text-faded">PPM</span>
              .col-3
                div(class="waterParameter-box")
                  div(class="waterParameter-box_unit")
                    |信号
                    i(class="iconfont icon-xinhao text-indigo-5")
                  | - - - -
                  //- span(class="waterParameter-box_unitSpan text-green-6" style="font-size: 20px") 优
                  //- 优良差
                  //- | -86<span class="waterParameter-box_unitSpan text-faded">dBm</span>
        q-card-separator
    .col-12(class="chart")
      span(class="chart-span") 月份读表图
      canvas(id="myChart" height="200" style="width: 100%")
    .col-12(v-show="look")
      q-table(:data="InfoList" :columns="columns" row-key="name" hide-bottom)
    q-btn(class="fixed" style="right: 18px; top: 18px" :loading="loading" round icon="refresh" color="primary" @click="refreshChange")
    q-btn(round color="primary" class="fixed" icon="remove_red_eye" style="right: 18px; bottom: 18px" @click="look = !look")
</template>

<script>
import ICountUp from 'vue-countup-v2'
import { getInfoList, getMInfoList } from '@/api/meter'
const F2 = require('@antv/f2')
export default {
  components: {
    ICountUp
  },
  name: 'waterMeter',
  data() {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: '序号',
          align: 'left',
          field: 'id',
          sortable: false
        },
        {
          name: 'value',
          required: true,
          label: '读数',
          align: 'left',
          field: 'value',
          sortable: false
        },
        {
          name: 'cretime',
          required: true,
          label: '时间',
          align: 'left',
          field: 'cretime',
          sortable: false
        }
      ],
      look: false,
      showing: false,
      InfoList: [],
      loading: false,
      decimals: 0,
      Mdecimals: 1,
      duration: 2.5,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      theMonth: {
        startVal: 0,
        endVal: 0,
        allVal: 0,
        cretime: '2018-9-21 13:00:00'
      },
      theMoney: {
        startVal: 0,
        endVal: 0,
        grade: 1
      },
      waterData: [],
      // mchartData: [{
      //   money: 2,
      //   degree: 5
      // }, {
      //   money: 3,
      //   degree: 7
      // }, {
      //   money: 7,
      //   degree: 10
      // }, {
      //   money: 9,
      //   degree: 20
      // }, {
      //   money: 10,
      //   degree: 60
      // }],
      chartData: [],
      defs: {
        time: {
          range: [0, 1]
          // max: 2020
        },
        tem: {
          min: 0,
          tickCount: 5
        }
      }
      // mdefs: {
      //   degree: {
      //     ticks: [0, 26, 34]
      //   }
      // }
    }
  },
  created() {
    if (this.$route.params.device !== undefined) this.Wdata = this.$route.params.device
    this.getInfoList()
    this.wsMonitor(this.$route.params.imei)
  },
  mounted() {
    document.title = 'NB-IoT · 物联网水表'
  },
  methods: {
    onReady(instance, CountUp) {
      // const that = this
      // setTimeout(() => {
      //   instance.update(that.waterData[0].endVal + 100)
      // }, 5000)
    },
    refreshChange() {
      this.loading = true
      setTimeout(() => {
        this.$q.notify({
          message: `数据大约在 ${this.theMonth.msgTime} 更新`,
          type: 'info',
          position: 'top-left'
        })
        this.loading = false
      }, 2000)
    },
    _initChat() {
      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })
      chart.axis('time', {
        label: function label(text, index, total) {
          var cfg = {
            textAlign: 'center'
          }
          if (index === 0) {
            cfg.textAlign = 'start'
          }
          if (index > 0 && index === total - 1) {
            cfg.textAlign = 'end'
          }
          return cfg
        }
      })
      chart.source(this.chartData, this.defs)
      chart.tooltip({
        showCrosshairs: true,
        onShow: function onShow(ev) {
          var items = ev.items
          items[0].name = null
          items[0].value = `${items[0].title}，用水：${items[0].value}m³`
        }
      })
      chart.guide().tag({
        position: [2017, 30.12],
        content: '30.12',
        direct: 'tl',
        offsetY: -5,
        background: {
          fill: '#8659AF'
        },
        pointStyle: {
          fill: '#8659AF'
        }
      })
      chart
        .line()
        .position('time*tem')
        .shape('smooth')
        .color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      chart
        .area()
        .position('time*tem')
        .shape('smooth')
        .color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      chart.render()
      // 当月消费梯度图表
      // const mounthChart = new F2.Chart({
      //   id: 'mounthChart',
      //   pixelRatio: window.devicePixelRatio // 指定分辨率
      // })
      // mounthChart.axis('degree', {
      //   label: function label(text, index, total) {
      //     var cfg = {
      //       textAlign: 'center'
      //     }
      //     if (index === 0) {
      //       cfg.textAlign = 'start'
      //     }
      //     if (index > 0 && index === total - 1) {
      //       cfg.textAlign = 'end'
      //     }
      //     return cfg
      //   }
      // })
      // mounthChart.source(this.mchartData, this.mdefs)
      // mounthChart.tooltip({
      //   showCrosshairs: true,
      //   onShow: function onShow(ev) {
      //     var items = ev.items
      //     items[0].name = null
      //     items[0].value = `用水：${items[0].value}m³，金额：123￥`
      //   }
      // })
      // mounthChart.guide().tag({
      //   position: [2017, 30.12],
      //   content: '30.12',
      //   direct: 'tl',
      //   offsetY: -5,
      //   background: {
      //     fill: '#8659AF'
      //   },
      //   pointStyle: {
      //     fill: '#8659AF'
      //   }
      // })
      // mounthChart.line().position('degree*money').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      // mounthChart.area().position('degree*money').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      // mounthChart.render()
    },
    // 第一阶梯 26m³以下 1.98  27m³-34m³之间 2.97  34m³以上 3.96
    Moneytransform(tem) {
      let num = parseInt(tem)
      let money = 0
      if (num < 27) {
        money = num * 1.98
        this.theMoney.grade = 1
      } else if (num >= 27 && num <= 34) {
        money = 27 * 1.98 + (num - 27) * 2.97
        this.theMoney.grade = 2
      } else {
        money = 27 * 1.98 + 7 * 2.97 + (num - 34) * 3.96
        this.theMoney.grade = 3
      }
      return money
    },
    Timestamps(time, type) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let date = null
      if (type) {
        let tempTime = new Date(time).getTime() / 1000
        tempTime += 3600
        date = new Date(tempTime * 1000)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D + h + m + s
      } else {
        date = new Date(time)
        let M = date.getMonth() + 1
        return M
      }
    },
    wsMonitor(imei) {
      // var es = new EventSource(`/server/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      var es = new EventSource(`/admin/devicecenter/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      es.addEventListener('dataLog', e => {
        this.getInfoList()
        this.getMInfoList()
      })
    },
    getInfoList() {
      getInfoList({
        imei: this.$route.params.imei,
        name: 'water_load',
        size: 24
      })
        .then(res => {
          let data = res.data
          data.forEach((item, i) => {
            if (i === 0) {
              this.theMonth = item
              this.theMonth.endVal = 0
              this.theMonth.allVal = item.value
              this.theMonth.msgTime = this.Timestamps(item.cretime, true)
            }
          })
          this.InfoList = data
          this.getMInfoList() // 获取历史月份数据
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
    },
    getMInfoList() {
      getMInfoList({
        imei: this.$route.params.imei,
        name: 'water_load',
        size: 11
      })
        .then(res => {
          let data = res.data.reverse()
          this.chartData = []
          for (let i in data) {
            let json = {}
            let tem = null
            if (i > 0) {
              tem = data[i].value - data[i - 1].value
              json.tem = tem
              json.time = `${this.Timestamps(data[i].cretime)}月`
            }
            if (data.length === Number(i) + 1) {
              this.theMonth.endVal = parseInt(this.theMonth.value) - parseInt(data[i].value)
              this.theMoney.endVal = this.Moneytransform(this.theMonth.endVal)
            }
            this.chartData.push(json)
          }
          this._initChat()
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.iCountUp {
  font-size: 12em;
  margin: 0;
  color: #4d63bc;
}
.water-lint {
  i {
    font-size: 30px;
  }
}
.water-parameter {
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 20px;
  span {
    padding-left: 15px;
    color: #757575;
  }
}
.waterParameter-box {
  position: relative;
  // padding-left: 10px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 24px;
  .waterParameter-box_unit {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    .iconfont {
      padding-left: 3px;
      font-size: 13px;
    }
  }
  .waterParameter-box_unitSpan {
    padding-left: 5px;
    font-size: 12px;
  }
}
.chart {
  position: relative;
  .chart-span {
    position: absolute;
    top: -10px;
    left: 17px;
    color: #757575;
    font-size: 12px;
  }
}
.lookBox {
  padding: 0 20px;
  font-size: 12px;
  padding-bottom: 20px;
  line-height: 24px;
}
.gradient {
  margin-bottom: 0;
  padding-top: 5px;
  padding-bottom: 15px;
  font-size: 12px;
  line-height: 16px;
}
.gradient_popover {
  padding: 0 15px;
  padding-bottom: 15px;
  font-size: 12px;
  line-height: 30px;
}
</style>

<style lang="less">
.water-lint {
  .q-item-label {
    line-height: 2;
  }
}
</style>
