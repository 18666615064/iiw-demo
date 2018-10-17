<template lang="pug">
  .detecitonBox
    .detecitonBox_title 更新时间： {{ cretime }}
      span(style="float: right")
        q-btn(round size="sm" color="cyan-6" icon="history" @click="modelChange")
    .row
      .col-12
        .listBox
          .row
            .col-2.iconBox
              i(class="iconfont icon-gonglv text-cyan-6")
            .col-5.contentBox
              p(class="title") RX信号强度水平
              template
                span(v-if="endValRX === '----'") {{endValRX}}
                ICountUp(v-else :startVal="startVal" :endVal="endValRX" :decimals="decimals" :duration="duration" :options="options")
            .col-5.commentBox
              p -110 信号最差
              p 信号值越大信号越好
          q-card-separator.separator
          .row
            .col-2.iconBox
              i(class="iconfont icon-zhiliang text-green-5")
            .col-5.contentBox
              p(class="title") 信号接收质量
              template
                span(v-if="endValrsrq === '----'") {{endValrsrq}}
                ICountUp(v-else :startVal="startVal" :endVal="endValrsrq" :decimals="decimals" :duration="duration" :options="options")
            .col-5.commentBox
              p 质量范围：-3 ~ -19.5
              p 值越大，接收质量越好
          q-card-separator.separator
          .row
            .col-2.iconBox
              i(class="iconfont icon-wuma text-light-blue-10")
            .col-5.contentBox
              p(class="title") 信号接收功率
              template
                span(v-if="endValdBm === '----'") {{endValdBm}}
                ICountUp(v-else :startVal="startVal" :endVal="endValdBm" :decimals="decimals" :duration="duration" :options="options")
              span(class="unit") dBm
            .col-5.commentBox(@click="showing = true")
              p {{ endValdBm > -65 ? '非常好' : (endValdBm < -65 && endValdBm > -75) ? '好' : (endValdBm < -75 && endValdBm > -85) ? '较好' : (endValdBm < -85 && endValdBm > -95) ? '一般' : (endValdBm < -95 && endValdBm > -105) ? '差' : '较差'}}
              p
                |信号等级 {{ endValdBm > -65 ? '1' : (endValdBm < -65 && endValdBm > -75) ? '2' : (endValdBm < -75 && endValdBm > -85) ? '3' : (endValdBm < -85 && endValdBm > -95) ? '4' : (endValdBm < -95 && endValdBm > -105) ? '5' : '6'}}
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
        .listBox
          .row(style="text-align: center")
            .col-4.border-r
              .contentBox
                p(class="title") 附网时间
                template
                  span(v-if="endValF === '----'") {{endValF}}
                  ICountUp(v-else :startVal="startVal" :endVal="endValF" :decimals="decimals" :duration="duration" :options="options")
                span(class="unit") s
            .col-4.border-r
              .contentBox
                p(class="title") 登陆时间
                template
                  span(v-if="AendValD === '----'") {{AendValD}}
                  ICountUp(v-else :startVal="startVal" :endVal="AendValD" :decimals="decimals" :duration="duration" :options="options")
                span(class="unit") s
            .col-4
              .contentBox
                p(class="title") 上报时间
                template
                  span(v-if="AendValZ === '----'") {{AendValZ}}
                  ICountUp(v-else :startVal="startVal" :endVal="AendValZ" :decimals="decimals" :duration="duration" :options="options")
                span(class="unit") s
      .col-6
        .listBox(style="margin-right: 5px")
          .row
            .col-12.knob
              .contentBox
                p(class="title") 误码率
                template
                  q-knob(v-if="endValW === '----'" v-model="startVal" size="7rem" :min="min" :max="max" :color="endValW === 0 ? 'green-6' : 'red-6'" readonly)
                    |{{endValW}}
                  q-knob(v-else v-model="endValW" size="7rem" :min="min" :max="max" :color="endValW === 0 ? 'green-6' : 'red-6'" readonly)
                    |{{endValW}}%
      .col-6
        .listBox(style="margin-left: 5px")
          .row
            .col-12.knob
              .contentBox
                p(class="title" @click="customDialogModel = true") 拾取地址
                  q-icon(name="create" color="blue-8" style="float: right")
                p(class="content")
                  | {{current.address}}
                //- p(class="title knob-title") 坐标
                //- p(class="content") lng：113.416634
                //- p(class="content") lat：23.145874
                q-btn.currentBtn(flat color="grey-5" icon="backup" @click="setsave")
            q-dialog(v-model="customDialogModel" @ok="onOk" @show="onShow" @hide="onHide")
              span(slot="title" style="font-size: 1.2rem;") 地址修改
              div(slot="body")
                q-input(v-model="inputaddress")
              template(slot="buttons" slot-scope="props")
                q-btn(color="primary" flat label="取消" @click="choose(props.ok, 'no')")
                q-btn(color="primary" flat label="确认" @click="choose(props.ok, 'ok')")
      .col-12
        .listBox
          .mapBox
            baidu-map(ref="map" :center="center" :zoom="zoom" @ready="initMap" style="width: 100%; height: 300px;")
              .geolocation(@click="locateChange")
                q-icon(name="my_location" color="grey-7")
    q-modal.model-cover(v-model="model")
        q-btn(round class="fixed" style="right: 10px; top: 10px; z-index: 5" size="sm" color="red-6" icon="clear" @click="modelChange")
        q-card-main
          q-item-tile(style="font-size: 16px;") 历史检测记录
        .tableBox
          template(v-for="(item, i) in tableData")
            .tableBox-list(class="relative-position" v-ripple :class="item.length < 9 ? 'tableBox-error' : ''" @click="hideModal(item)")
              .row
                .col-12
                  span
                    |RX信号强度：<span class="text-teal-8" style="font-size: 13px">{{item.rxlev}}</span>
                  span(style="float: right")
                    q-icon(name="today" style="padding-right: 2px; padding-top: 1px; vertical-align: text-top")
                    |{{item.time}}
                .col-12.tableBox-separator
                  |拾取地址：{{item.address}}
                  span(v-if="item.length < 9" style="float: right; color: red") 数据缺失
                .col-12(style="overflow: auto")
                  .tableBox-scroll.clearfix
                    div
                      p 信号接收功率
                      p {{item.rsrp}}
                    div
                      p 信号质量
                      p {{item.rsrq}}
                    div
                      p 附网时间
                      p {{item.nettime}}
                    div
                      p 登陆时间
                      p {{item.logintime}}
                    div
                      p 上报时间
                      p {{item.uploadtime}}
                    div
                      p 误码率
                      p {{item.ber}}
        //- q-table(:data="tableData" :columns="columns" :pagination.sync="serverPagination" row-key="name" :filter="filter" :loading="loading" @request="getGroupList")
        .chartBox
          div
            canvas(id="mountNode" height="200" style="width: 100%")
        .chartBox
          div
            .canvas-title 最近{{tableData.length}}次平均时长
            canvas(id="columnar" height="200" style="width: 100%")
    Loading(ref="loading")
</template>

<script>
import Loading from '@/components/loading'
import ICountUp from 'vue-countup-v2'
import { getInfoList, getGroupList, setsave } from '@/api/meter'
const F2 = require('@antv/f2')
export default {
  components: {
    ICountUp,
    Loading
  },
  name: 'detection',
  data() {
    return {
      mostLoading: null,
      timeOut: false,
      model: false,
      iemi: null,
      showing: false,
      decimals: 0,
      duration: 2.5,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      startVal: 0,
      endValRX: 0,
      endValW: 0,
      endValrsrq: 0,
      endValdBm: 0,
      endValF: 0,
      endValD: 0,
      endValZ: 0,
      cretime: '',
      min: 0,
      max: 100,
      map: null, // 地图
      center: {
        lng: 113.412299,
        lat: 23.158603
      },
      zoom: 19,
      marker: null,
      current: {
        devicefk: 0,
        address: '',
        point: {
          lat: '',
          lng: ''
        },
        time: ''
      },
      customDialogModel: false,
      inputaddress: '',
      checked: true,
      iconUrl: {
        error: require('../../assets/images/detection-e.png'),
        normal: require('../../assets/images/detection-n.png')
      },
      columns: [
        { name: 'id', required: true, label: '序号', align: 'left', field: 'id', sortable: false },
        { name: 'time', required: true, label: '更新日期', align: 'left', field: 'time', sortable: false },
        { name: 'rxlev', required: true, label: 'RX信号强度水平', align: 'left', field: 'rxlev', sortable: false },
        { name: 'rsrp', required: true, label: '信号接收功率', align: 'left', field: 'rsrp', sortable: false },
        { name: 'rsrq', required: true, label: '信号质量', align: 'left', field: 'rsrq', sortable: false },
        { name: 'nettime', required: true, label: '附网时间', align: 'left', field: 'nettime', sortable: false },
        { name: 'logintime', required: true, label: '登陆时间', align: 'left', field: 'logintime', sortable: false },
        { name: 'uploadtime', required: true, label: '上报时间', align: 'left', field: 'uploadtime', sortable: false },
        { name: 'ber', required: true, label: '误码率', align: 'left', field: 'ber', sortable: false }
      ],
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 3
      },
      tableData: [],
      chartData: [],
      columnsData: [{
        action: '附网时间',
        value: 123
      }, {
        action: '登陆时间',
        value: 104970
      }, {
        action: '上传时间',
        value: 131744
      }]
    }
  },
  computed: {
    AendValD: function() {
      return parseInt(this.endValD) - parseInt(this.endValF)
    },
    AendValZ: function() {
      return parseInt(this.endValZ) - parseInt(this.endValD)
    }
  },
  created() {
    this.iemi = window.sessionStorage.getItem('imei')
    this.current.devicefk = parseInt(window.sessionStorage.getItem('id'))
    this.wsMonitor(this.iemi)
    this.initGet()
  },
  mounted() {
    document.title = 'NB-IoT · 信号探测仪'
    // setTimeout(() => {
    //   console.log('222')
    //   this.$refs.loading.hide()
    // }, 3000)
    // setTimeout(() => {
    //   this.$refs.loading.show()
    // }, 5000)
  },
  methods: {
    onOk(data) {
      this.current.address = this.inputaddress
    },
    // 当我们展示给用户时
    onShow() {
      this.inputaddress = this.current.address
    },
    // 当它被隐藏时
    onHide() {
      // this.inputaddress = ''
    },
    async choose(okFn, hero) {
      if (hero === 'no') {
        this.customDialogModel = false
      } else {
        await okFn()
      }
    },
    setsave(name) {
      setsave({
        devicefk: this.current.devicefk,
        props: [{
          name: 'lnglat',
          value: this.current.point,
          cretime: this.current.time
        }]
      }).then(res => {
        setsave({
          devicefk: this.current.devicefk,
          props: [{
            name: 'address',
            value: this.current.address,
            cretime: this.current.time
          }]
        }).then(res => {
          this.$q.notify({
            message: '地址修改成功',
            type: 'info',
            position: 'top-left'
          })
          this.initGet()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          type: 'negative',
          position: 'top-left'
        })
      })
    },
    wsMonitor(imei) {
      // var es = new EventSource(`/server/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      var es = new EventSource(`/admin/devicecenter/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      es.addEventListener('dataLog', e => {
        if (!this.customDialogModel) this.$refs.loading.show()
        this.timeOut = true
        window.clearTimeout(this.mostLoading)
        if (this.timeOut) {
          this.mostLoading = setTimeout(() => {
            this.$refs.loading.hide()
            this.timeOut = false
          }, 5000)
        } else {
          this.$q.notify({
            message: '信号数据更新超时...',
            type: 'negative',
            position: 'top-left'
          })
        }
        this.$refs.loading.show()
        let data = JSON.parse(e.data)
        this.cretime = this.Timestamps(data.cretime)
        switch (data.name) {
          case 'rxlev':
            this.endValRX = Number(data.value)
            break
          case 'ber':
            this.endValW = Number(data.value)
            break
          case 'rsrq':
            this.endValrsrq = Number(data.value)
            break
          case 'rsrp':
            this.endValdBm = Number(data.value)
            break
          case 'nettime':
            this.endValF = Number(data.value)
            break
          case 'logintime':
            this.endValD = Number(data.value)
            break
          case 'uploadtime':
            this.endValZ = Number(data.value)
            break
          default:
            break
        }
      })
    },
    initGet() {
      // this.getInfoList('rxlev')
      // this.getInfoList('ber')
      // this.getInfoList('rsrq')
      // this.getInfoList('rsrp')
      // this.getInfoList('nettime')
      // this.getInfoList('logintime')
      // this.getInfoList('uploadtime')
      this.getGroupList()
    },
    initData(data) {
      console.log(data)
      this.address = data.address
      this.cretime = data.time
      this.endValRX = data.rxlev
      this.endValW = data.ber
      this.endValrsrq = data.rsrq
      this.endValdBm = data.rsrp
      this.endValF = data.nettime
      this.endValD = data.logintime
      this.endValZ = data.uploadtime
    },
    initChart() {
      this.mountNodeChart()
      this.columnarChart()
    },
    modelChange() {
      this.model = !this.model
      if (this.model) {
        let dom = document.getElementById('mountNode')
        if (dom) {
          dom.insertAdjacentHTML('afterend', '\n  <div id="tooltip" class="f2-tooltip">\n    <span> </span>\n    <span> </span>\n  </div>\n')
        }
        setTimeout(() => {
          this.initChart()
        }, 300)
      }
    },
    hideModal(data) {
      setTimeout(() => {
        this.initData(data)
        this.model = false
      }, 300)
    },
    getInfoList(type) {
      getInfoList({
        imei: this.iemi,
        name: type,
        size: 5
      })
        .then(res => {
          let data = res.data
          switch (type) {
            case 'rxlev':
              this.endValRX = Number(data[0].value)
              break
            case 'ber':
              this.endValW = Number(data[0].value)
              break
            case 'rsrq':
              this.endValrsrq = Number(data[0].value)
              break
            case 'rsrp':
              this.endValdBm = Number(data[0].value)
              break
            case 'nettime':
              this.endValF = Number(data[0].value)
              break
            case 'logintime':
              this.endValD = Number(data[0].value)
              break
            case 'uploadtime':
              this.endValZ = Number(data[0].value)
              this.cretime = data[0].cretime
              break
            default:
              break
          }
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
    },
    getGroupList() {
      getGroupList({
        imei: this.iemi,
        name: 'uploadtime',
        size: 15
      })
        .then(res => {
          let data = res.data
          data = data.reverse()
          let list = []
          let clist = []
          let nettimeList = []
          let logintimeList = []
          let uploadtimeList = []
          data.forEach((item, i) => {
            let keyArr = Object.keys(item)
            let oneTime = item[keyArr[0]].cretimestr
            let temp = {
              id: i,
              ber: '----',
              rsrp: '----',
              rsrq: '----',
              rxlev: '----',
              logintime: '----',
              nettime: '----',
              uploadtime: '----',
              address: '----',
              time: oneTime,
              length: keyArr.length
            }
            if (item.ber) {
              temp.ber = Number(item.ber.value)
            }
            if (item.rsrp) {
              temp.rsrp = Number(item.rsrp.value)
            }
            if (item.rsrq) {
              temp.rsrq = Number(item.rsrq.value)
            }
            if (item.rxlev) {
              temp.rxlev = Number(item.rxlev.value)
            }
            if (item.address) {
              temp.address = item.address.value
            }
            if (item.nettime) {
              temp.nettime = parseInt(item.nettime.value)
              nettimeList.push(temp.nettime)
            }
            if (item.logintime && item.nettime) {
              temp.logintime =
                parseInt(item.logintime.value) - parseInt(item.nettime.value)
              logintimeList.push(temp.logintime)
            }
            if (item.uploadtime && item.logintime) {
              temp.uploadtime =
                parseInt(item.uploadtime.value) -
                parseInt(item.logintime.value)
              uploadtimeList.push(temp.uploadtime)
            }
            list.push(temp)
            if (i === 0) {
              this.current.time = item[keyArr[0]].cretime
              this.initData(temp)
            }
            if (item.rxlev) {
              let ctempber = {
                date: item.rxlev.cretimestr,
                value: Number(item.rxlev.value),
                type: 'RX信号强度'
              }
              clist.push(ctempber)
            }
          })
          this.columnsData[0].value = this.getaverage(nettimeList, data.length)
          this.columnsData[1].value = this.getaverage(logintimeList, data.length)
          this.columnsData[2].value = this.getaverage(uploadtimeList, data.length)
          this.chartData = clist
          this.tableData = list
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
    },
    // 算最大最小值
    getpink(data, type) {
      data.sort((a, b) => {
        return a - b
      })
      console.log('min', data[0])
      console.log('max', data[data.length - 1])
    },
    // 算平均值
    getaverage(data, length) {
      let oldNum = 0
      let Num = 0
      for (const item of data) {
        let temp = parseInt(item)
        oldNum += temp
      }
      let oldvalue = Math.round(oldNum / length)
      let tempList = []
      for (let i = 0; i < length; i++) {
        if (data[i]) {
          tempList.push(data[i])
        } else {
          tempList.push(oldvalue)
        }
      }
      for (const item of tempList) {
        Num += item
      }
      return Math.round(Num / length)
    },
    Timestamps(time, show) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let date = new Date(time)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':'
      let s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      if (show) {
        return Y + M + d
      } else {
        return Y + M + D + h + m + s
      }
    },
    mountNodeChart() {
      var chart = new F2.Chart({
        id: 'mountNode',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(this.chartData)
      chart.scale('date', {
        type: 'timeCat',
        tickCount: 3
      })
      chart.scale('value', {
        min: -110,
        max: -50
      })
      chart.axis('date', {
        label: function label(text, index, total) {
          // 只显示每一年的第一天
          var textCfg = {}
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          return textCfg
        }
      })
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        showCrosshairs: true,
        onChange: function onChange(obj) {
          let legend = chart.get('legendController').legends.top[0]
          let tooltipItems = obj.items
          let legendItems = legend.items
          let map = {}
          legendItems.map(function(item) {
            map[item.name] = item
          })
          tooltipItems.map(function(item) {
            let name = item.name
            let value = item.value
            if (map[name]) {
              map[name].value = value
            }
          })
          legend.setItems(tooltipItems)
          let tooltipEl = document.getElementById('tooltip')
          if (tooltipEl) {
            let currentData = obj.items[0]
            tooltipEl.innerHTML = `<span>${currentData.origin.date}</span>`
            tooltipEl.style.cssText = 'opacity: 1'
          }
        },
        onHide: function onHide(obj) {
          let tooltipEl = document.getElementById('tooltip')
          if (tooltipEl) {
            tooltipEl.style.cssText = 'opacity: 0'
          }
          let legend = chart.get('legendController').legends.top[0]
          let legendItems = legend.items
          legendItems.map((item) => {
            delete item.value
          })
          legend.setItems(chart.getLegendItems().country)
        }
      })
      chart
        .line()
        .position('date*value')
        .color('type')
      chart.render()
    },
    columnarChart() {
      var Global = F2.Global
      var chart = new F2.Chart({
        id: 'columnar',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(this.columnsData)
      chart.scale('value', {
        max: 100
      })
      chart.coord({
        transposed: true
      })
      chart.axis('action', {
        line: Global._defaultAxis.line,
        grid: null
      })
      chart.axis('value', {
        line: null,
        grid: Global._defaultAxis.grid,
        label: function label(text, index, total) {
          var textCfg = {}
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          return textCfg
        }
      })
      chart.tooltip({
        showCrosshairs: true,
        onShow: function onShow(ev) {
          var items = ev.items
          items[0].name = null
          items[0].value = `平均：${items[0].value}s`
        }
      })
      chart.interval().position('action*value')

      // 绘制文本
      this.columnsData.map(function(obj) {
        chart.guide().text({
          position: [obj.action, obj.value],
          content: obj.value,
          style: {
            textAlign: 'start'
          },
          offsetX: 10
        })
      })
      chart.render()
    },
    /* eslint-disable no-undef */
    initMap({ BMap, map }) {
      let that = this
      this.map = map
      this.map.centerAndZoom(new BMap.Point(113.413139, 23.158125), 19)
      let point = new BMap.Point(113.413139, 23.158125)
      let iconurl = null
      if (this.checked) {
        iconurl = this.iconUrl.normal
      } else {
        iconurl = this.iconUrl.error
      }
      let icon = new BMap.Icon(iconurl, new BMap.Size(30, 38), { anchor: new BMap.Size(16, 38) })

      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(point, res => {
        that.current.address = res.address
        that.current.point = res.point
      })
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point, { icon: icon })
          that.marker = mk
          map.addOverlay(mk)
          map.panTo(r.point)
        } else {
          let marker = new BMap.Marker(point, { icon: icon })
          map.addOverlay(marker)
          map.panTo(point)
          that.marker = marker
        }
      }, { enableHighAccuracy: true })
      this.map.addEventListener('click', e => {
        let pt = e.point
        this.marker.setPosition(new BMap.Point(pt.lng, pt.lat))
        myGeo.getLocation(pt, function(rs) {
          var addComp = rs.addressComponents
          that.current.address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
          that.inputaddress = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
        })
      })
    },
    locateChange(e) {
      this.map.centerAndZoom(new BMap.Point(113.413139, 23.158125), 19)
    }
  }
}
</script>

<style lang="less" scoped>
.detecitonBox {
  position: relative;
  padding: 10px;
  background: linear-gradient(-48deg, #d0d2da, #3190ff);
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
      color: #233a4a;
      p {
        margin-bottom: 0;
      }
      .title {
        font-size: 13px;
        padding-bottom: 10px;
      }
      .content {
        text-align: left;
        font-size: 14px;
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
      color: #899cf4;
    }
  }
}
.detecitonBox_title {
  padding-bottom: 26px;
  font-size: 14px;
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
  .col-12 {
    z-index: 1;
  }
}

.separator {
  margin: 6px 0;
  margin-left: 16.67%;
  width: 83.33%;
}
.border-r {
  border-right: 1px dotted #e5e5e5;
}
.knob {
  position: relative;
  height: 140px;
  text-align: center;
  .contentBox {
    padding: 0 10px;
  }
  .title {
    text-align: left;
  }
  .currentBtn {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.knob-title {
  padding: 10px 0;
}
.mapBox {
  position: relative;
  padding: 0 10px;
  overflow: hidden;
  .geolocation {
    position: absolute;
    right: 15px;
    bottom: 12px;
    width: 32px;
    height: 32px;
    line-height: 27px;
    text-align: center;
    font-size: 19px;
    background-color: #fff;
    border: 1px solid #d9d7d5;
    border-radius: 3px;
    cursor: pointer;
  }
}
.tableBox {
  padding: 5px;
  max-height: 50vh;
  overflow: inherit;
  .tableBox-list {
    position: relative;
    margin-bottom: 10px;
    padding: 5px;
    padding-left: 10px;
    background-color: #fff;
    font-size: 11px;
    line-height: 22px;
    border-radius: 4px;
    overflow: hidden;
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background-color: #039be5;
    }
  }
  .tableBox-error {
    &::after {
      background-color: #d32f2f;
    }
  }
  .tableBox-list:last-child {
    margin-bottom: 0;
  }
  .tableBox-scroll {
    width: 340px;
    > div {
      float: left;
      padding: 0 5px;
      p:nth-child(1) {
        color: #233a4a;
        line-height: 35px;
      }
    }
    p {
      margin-bottom: 0;
    }
  }
  .tableBox-separator {
    padding-bottom: 4px;
    border-bottom: 1px dotted #a9a9a9;
  }
  .scroll {
    > div {
      float: left;
    }
  }
  .col-4, .col-3 {
    text-align: center;
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}
.chartBox {
  padding: 0 5px;
  padding-top: 10px;
  > div {
    position: relative;
    padding-top: 15px;
    background-color: #fff;
  }
  .canvas-title {
    position: absolute;
    top: 10px;
    left: 15px;
    color: #000;
    font-size: 14px;
  }
  .f2-tooltip {
    // -moz-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    // -webkit-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    // box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 99;
    color: #000;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    width: 120px;
    opacity: 0;
  }
  .f2-tooltip span:nth-child(1) {
    font-size: 11px !important;
  }
  .f2-tooltip span:nth-child(2) {
    font-size: 13px !important;
  }
}
.model-cover {
  .modal-content {
    background-color: #f4f4f4;
  }
}
</style>
