<template lang="pug">
  div.q-pa
    .row
      .col-12.pr
        vue-seamless(:data="newsList" :class-option="optionLeft" class="seamless-warp" v-cloak)
          ul(class="item" :style="`width: ${scrollWidth}; width: 1130px`")
            li(ref="scrollLi" v-for="(item, index) in newsList" :key="index")
              .scroll-box(:class="item.value === 'false' ? 'scroll-off' : ''")
              |{{item.cretime}}<span style="padding-left: 5px;">{{item.value === 'false' ? '关灯指令' : '开灯指令'}}</span>
        .scrollBtn(@click="showModel") >>>
    .row
      .col-10.offset-1.screen.pr
        .screen-title
          .screen-title_left
            i.fas.fa-calendar-alt(style="line-height: 18pt; padding-right: 5px;")
            |{{justTime}}
          .screen-title_right.float-right
            span(style="padding: 4px;" @click="customDialogModel = true")
              i.fas.fa-wrench
            |NB&nbsp;&nbsp;
            Signal(:size="signalSize")
        .large
          .row
            .col-12.large-title
              ICountUp(:startVal="startVal" :endVal="power" :decimals="decimalsPower" :duration="duration" :options="options")
              | kw/h
            .col-2
              p.large-p
                i.iconfont.icon-dc
            .col-10
              .row
                .col-5
                  p.large-p
                    i.iconfont.icon-dianya1
                    span
                      ICountUp(:startVal="startVal" :endVal="dcvoltageout" :decimals="decimals" :duration="duration" :options="options")
                      |V
                .col-5
                  p.large-p
                    i.iconfont.icon-dianya
                    span
                      ICountUp(:startVal="startVal" :endVal="dccurrentout" :decimals="decimals" :duration="duration" :options="options")
                      |mA
            .col-2
              p.large-p
                i.iconfont.icon-ac
            .col-10
              .row
                .col-5
                  p.large-p
                    i.iconfont.icon-dianya1
                    span
                      ICountUp(:startVal="startVal" :endVal="acvoltagein" :decimals="decimals" :duration="duration" :options="options")
                      |V
                .col-5
                  p.large-p
                    i.iconfont.icon-guanggan
                    span
                      ICountUp(:startVal="startVal" :endVal="lightilluminance" :decimals="decimals" :duration="duration" :options="options")
            .col-2
              p.large-p
                |<span style="padding: 0; font-size: 13px;">参数</span>
            .col-10
              .row
                .col-5
                  p.large-p
                    i.iconfont.icon-dianya1
                    span
                      ICountUp(:startVal="startVal" :endVal="startcurrent" :decimals="decimals" :duration="duration" :options="options")
                      |mA
                .col-5
                  p.large-p
                    i.iconfont.icon-max
                    span
                      ICountUp(:startVal="startVal" :endVal="hightcurrent" :decimals="decimals" :duration="duration" :options="options")
                      |mA
        .settingBtn
          span(@click="timeDialogModel = true")
            q-icon(name="control_camera")
      .col-1
        |
    .button.absolute
      img(src="/statics/images/button.png" width="100%" style="visibility: hidden;")
      canvas(width="100" height="100" ref="cvs" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend").canvas.absolute
      //- q-btn(color="positive" round flat icon="fas fa-power-off" @click="change").onoffbtn
      q-btn(:color="control ? 'positive' : ''" round flat icon="fas fa-power-off" @click="lampSwitch").onoffbtn
    q-modal.lamp-modalCover(v-model="showing" position="top")
        q-card-main
          q-item-tile(style="font-size: 15px;") 指令记录
        .lamp-modalCover_list
          .row
            template(v-for="(item, index) in newsList")
              .col-12
                .lamp-modal-span(:class="item.value === 'false' ? 'lamp-modal-action' : ''") {{item.cretime}} {{item.value === 'false' ? '关灯指令' : '开灯指令'}}
    q-dialog.lamp-dialogCover(v-model="customDialogModel" @ok="onOk" @show="onShow" @hide="onHide")
      span(slot="title" style="font-size: 1.2rem;") 参数修改
      div(slot="body")
        q-input(v-model.number="inputmAmax" float-label="最大电流(mA)" placeholder="请输入最大电流" type="number" dark color="light-blue-12")
        q-input(v-model.number="inputmAstart" float-label="启动电流(mA)" placeholder="请输入启动电流" type="number" dark color="light-blue-12")
      template(slot="buttons" slot-scope="props")
        q-btn(color="light-blue-12" flat label="取消" @click="choose(props.ok, 'no', 'custom')")
        q-btn(color="light-blue-12" flat label="确认" @click="choose(props.ok, 'ok', 'custom')")
    q-dialog.lamp-dialogCover(v-model="timeDialogModel" @ok="onOk" @show="onShow" @hide="onHide")
      span(slot="title" style="font-size: 1.2rem;") 规则设置
      .row(slot="body")
        .col-12(style="margin-bottom: 10px;")
          q-radio(v-model="timeRadio" val="0" label="时钟" dark color="light-blue-12" class="text-white" style="margin-right: 20px;")
          q-radio(v-model="timeRadio" val="1" label="光感" dark color="amber" class="text-white")
        .col-12
          div(v-if="timeRadio === '0'")
            q-datetime(v-model="modelTimeS" format24h dark stack-label="开灯时间" color="light-blue-12" type="time")
            q-datetime(v-model="modelTimeE" format24h dark stack-label="关灯时间" color="light-blue-12" type="time")
          div(v-else)
            q-input(v-model.number="inputlighntS" float-label="开灯值" placeholder="请输入开灯值" type="number" dark color="light-blue-12")
            q-input(v-model.number="inputlighntH" float-label="关灯值" placeholder="请输入关灯值" type="number" dark color="light-blue-12")
      template(slot="buttons" slot-scope="props")
        q-btn(color="light-blue-12" flat label="取消" @click="choose(props.ok, 'no', 'time')")
        q-btn(color="light-blue-12" flat label="确认" @click="choose(props.ok, 'ok', 'time')")
    Loading(ref="loading" :title="loadingTitle")
</template>

<script>
import Loading from '@/components/loading'
import vueSeamless from 'vue-seamless-scroll'
import Signal from '@/components/iconSignal'
import { getInfoList, sendsync, readsync } from '@/api/meter'
import ICountUp from 'vue-countup-v2'
export default {
  components: {
    Signal,
    vueSeamless,
    Loading,
    ICountUp
  },
  data() {
    return {
      cvs: null,
      ctx: null,
      cvswidth: 100,
      cvsheight: 100,
      val: 0,
      r: 0,
      scale: 1,
      bgconvert: null,
      setter: {
        timmer: null,
        dstval: 0,
        currentval: 0
      },
      loadingTitle: '更新中...',
      imei: null,
      devicefk: null,
      showing: false,
      customDialogModel: false,
      timeDialogModel: false,
      timeRadio: '0',
      winWidth: document.body.clientWidth,
      scrollWidth: '',
      newsList: [],
      signalSize: 0,
      justTime: '',
      power: 0,
      lightilluminance: 0,
      startcurrent: 0,
      hightcurrent: 0,
      acvoltagein: 0,
      dcvoltageout: 0,
      dccurrentout: 0,
      luminancectrl: 0,
      // modelTime: new Date()
      dialogType: true,
      decimals: 1,
      decimalsPower: 2,
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
      inputmAmax: '',
      inputmAstart: '',
      modelTimeS: '',
      modelTimeE: '',
      inputlighntS: '',
      inputlighntH: '',
      control: false,
      touchStart: 0
    }
  },
  created() {
    this.iemi = window.sessionStorage.getItem('imei')
    this.devicefk = parseInt(window.sessionStorage.getItem('id'))
    this.wsMonitor(this.iemi)
  },
  mounted() {
    document.title = 'NB-IoT · 物联网电源'
    this.initData()
    // this.$refs.loading.show()
    this.cvs = this.$refs['cvs']
    this.bgconvert = new Image()
    this.bgconvert.src = '/statics/images/buttonconvert.png'
    setTimeout(() => {
      let self = this
      self.ctx = self.cvs.getContext('2d')
      self.ctx.fillStyle = 'rgba(17, 159, 223, 0.5)'
      self.ctx.lineWidth = 1
      self.ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'
      self.cvswidth = self.cvs.offsetWidth
      self.cvsheight = self.cvs.offsetHeight
      self.cvs.width = self.cvswidth
      self.cvs.height = self.cvsheight
      self.scale = self.cvswidth / 643
      self.ctx.translate(0.499 * self.cvswidth, 0.47 * self.cvsheight)
      self.ctx.rotate(Math.PI - Math.PI / 8 + 0.03)
      self.setGradu(0, self.lightilluminance)
      self.pointer = new Image()
      self.pointer.src = '/statics/images/lamppointer.png'
    }, 24)
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2
      }
    }
  },
  methods: {
    wsMonitor(imei) {
      // var es = new EventSource(`/server/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      var es = new EventSource(`/admin/devicecenter/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      // var es = new EventSource(`/server/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      es.addEventListener('dataLog', e => {
        console.log(e, 'ws')
        let data = JSON.parse(e.data)
        this.cretime = this.Timestamps(data.cretime)
        switch (data.name) {
          case 'lightilluminance':
            // 环境光感值
            this.lightilluminance = Number(data.value)
            break
          case 'lightctrl':
            // 开关灯
            this.control = Number(data.value)
            break
          case 'luminancectrl':
            // 亮度调节
            this.getreadsync('luminancectrl')
            break
          default:
            break
        }
      })
    },
    initData() {
      this.getInfoList('lightctrl') // 开关灯
      this.getInfoList('luminancectrl') // 亮度调节%
      this.getInfoList('cumulativepower') // 累计功耗Wh
      this.getInfoList('linkquality') // 信号值
      this.getInfoList('acvoltagein') // 交流输入电压V
      this.getInfoList('dcvoltageout') // 直流输出电压V
      this.getInfoList('dccurrentout') // 直流输入电流mA
      this.getreadsync('startcurrent') // 启动电流mA
      this.getreadsync('hightcurrent') // 最大电流mA
      this.getreadsync('lightilluminance') // 环境光感值
    },
    showModel() {
      this.showing = !this.showing
    },
    scrollInit() {
      this.$nextTick(() => {
        let temp = 0
        if (this.newsList.length === 0) return
        this.$refs.scrollLi.forEach((item, i) => {
          temp = item.offsetWidth + temp
        })
        if (this.winWidth < temp) {
          this.scrollWidth = `${temp + 50}px`
        } else {
          this.scrollWidth = '100vw'
        }
      })
    },
    onOk(data) {
      if (this.dialogType) {
        this.setsendsync('hightcurrent', this.inputmAmax)
        this.setsendsync('startcurrent', this.inputmAstart)
      } else {
        if (this.timeRadio === '0') {
          // 时间
          let value = `${this.TimeMonthDay(this.modelTimeS)},80;${this.TimeMonthDay(this.modelTimeE)},0`
          this.setsendsync('timerule', value)
        } else {
          // 光感
          let value = `00000000,${this.inputlighntS},${this.inputlighntH},5`
          this.setsendsync('illuminancerule', value)
        }
      }
    },
    // 当我们展示给用户时
    onShow() {
      this.inputmAmax = ''
      this.inputmAstart = ''
      this.modelTimeS = new Date()
      this.modelTimeE = ''
      this.inputlighntS = ''
      this.inputlighntH = ''
    },
    // 当它被隐藏时
    onHide() {},
    async choose(okFn, hero, type) {
      if (type === 'custom') {
        this.dialogType = true
      } else {
        this.dialogType = false
      }
      if (hero === 'no') {
        this.customDialogModel = false
        this.timeDialogModel = false
      } else {
        await okFn()
      }
    },
    touchstart(e) {
      if (!this.control) return
      this.touchStart = e.changedTouches[0].clientX
    },
    touchmove(e) {
      if (!this.control) return
      let distance = e.changedTouches[0].clientX - this.touchStart
      this.change(parseInt(distance / 20))
    },
    touchend(e) {
      if (!this.control) return
      let data = 0
      if (this.luminancectrl < 0) {
        data = 0
      } else if (this.luminancectrl > 100) {
        data = 100
      } else {
        data = this.luminancectrl
      }
      this.setsendsync('luminancectrl', data)
    },
    lampSwitch() {
      this.setsendsync('lightctrl', this.control)
      if (this.control) this.change(0, true)
    },
    getInfoList(name) {
      getInfoList({
        imei: this.iemi,
        name: name,
        size: 5
      })
        .then(res => {
          let data = res.data
          switch (name) {
            case 'lightctrl':
              // console.log('开关灯')
              this.newsList = data
              this.justTime = data[0].cretime
              this.control = data[0].value
              this.scrollInit()
              break
            case 'luminancectrl':
              if (data[0]) this.luminancectrl = Number(data[0].value)
              break
            case 'lightilluminance':
              console.log(data[0].value, '环境光感值')
              if (data[0]) this.lightilluminance = Number(data[0].value)
              break
            case 'linkquality':
              console.log(data[0].value, '信号值')
              let value = parseInt(data[0].value)
              if (value > -75) {
                this.signalSize = 4
              } else if (value < -75 && value > -85) {
                this.signalSize = 3
              } else if (value > -85 && value > -95) {
                this.signalSize = 2
              } else {
                this.signalSize = 1
              }
              break
            case 'cumulativepower':
              console.log(data[0].value, '累计功耗Wh')
              if (data[0]) this.power = Number(data[0].value / 1000)
              break
            case 'acvoltagein':
              if (data[0]) this.acvoltagein = Number(data[0].value)
              console.log(data[0].value, '交流输入电压V')
              break
            case 'dcvoltageout':
              if (data[0]) this.dcvoltageout = Number(data[0].value)
              console.log(data[0].value, '直流输出电压V')
              break
            case 'dccurrentout':
              if (data[0]) this.dccurrentout = Number(data[0].value)
              console.log(data[0].value, '直流输入电流mA')
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
    setsendsync(name, value) {
      this.loadingTitle = '命令发送中...'
      this.$refs.loading.show()
      sendsync({
        id: this.devicefk,
        name: name,
        value: value,
        imei: this.iemi
      })
        .then(res => {
          if (res.data.id === '-1') {
            this.$q.notify({
              message: res.data.message,
              type: 'negative',
              position: 'top-left'
            })
          } else {
            setTimeout(() => {
              this.getreadsync(name)
            }, 5000)
          }
          this.$refs.loading.hide()
        })
        .catch(error => {
          this.$refs.loading.hide()
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
    },
    getreadsync(name) {
      readsync({
        id: this.devicefk,
        name: name,
        imei: this.iemi,
        value: 0
      })
        .then(res => {
          if (res.data.id === '-1') {
            this.$q.notify({
              message: res.data.message,
              type: 'negative',
              position: 'top-left'
            })
          } else {
            let data = JSON.parse(res.data.id)
            console.log(data, name, '同步数据')
            switch (name) {
              case 'startcurrent':
                this.startcurrent = Number(data[0].res[0].val)
                break
              case 'hightcurrent':
                this.hightcurrent = Number(data[0].res[0].val)
                break
              case 'luminancectrl':
                this.luminancectrl = Number(data[0].res[0].val)
                break
              default:
                break
            }
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
    TimeMonthDay(string) {
      let date = new Date(string)
      let H = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      let M = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return `${H}${M}`
    },
    animate(val) {
      let ctx = this.ctx
      ctx.globalCompositeOperation = 'copy'
      // 清除当前画布
      ctx.clearRect(-this.cvswidth, -this.cvsheight, this.cvswidth, this.cvsheight)
      ctx.fillStyle = 'rgba(17, 159, 223, 0.7)'

      // 外面的扇形
      let r = 0.278 * this.cvswidth
      this.r = r
      let lg = ctx.createLinearGradient(r, 0, -r, 0)
      lg.addColorStop(0, 'rgba(200, 17, 17, 0.5)')
      lg.addColorStop(0.5, 'rgba(17, 159, 250, 0.6)')
      lg.addColorStop(1, 'rgba(17, 180, 150, 0.7)')

      ctx.fillStyle = lg
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, r, 0, (Math.PI + Math.PI / 4 - 0.06) / 100 * val, false)
      ctx.closePath()
      ctx.fill()

      // 渐变叠加
      ctx.globalCompositeOperation = 'lighter'
      lg = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
      lg.addColorStop(0.95, 'rgba(0, 0, 0, 0.2)')
      // lg.addColorStop(0.85, 'rgba(230, 230, 230, 0.2)')
      lg.addColorStop(1, 'rgba(255, 255, 255, 0.2)')
      ctx.fillStyle = lg
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, r, 0, (Math.PI + Math.PI / 4 - 0.06) / 100 * val, false)
      ctx.closePath()
      ctx.fill()

      // 中间去掉的圆形
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(0, 0, 0.243 * this.cvswidth, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()

      // 画条条
      this.drawPointer(val)

      // 画遮罩
      this.drawConvert(val)
    },
    setGradu(src, val) {
      let self = this
      if (self.setter.timmer) window.clearTimeout(self.setter.timmer)
      self.setter.currentval = src
      self.setter.dstval = val
      let chg = (val - src) / 12
      // let chg = src < val ? 2 : -2
      let chgfunc = function() {
        if ((chg < 0 && self.setter.currentval > self.setter.dstval) || (chg > 0 && self.setter.currentval < self.setter.dstval)) {
          self.setter.currentval += chg
          self.setter.currentval = Math.max(0, Math.min(self.setter.currentval, 100))
          self.animate(self.setter.currentval)
          self.setter.timmer = setTimeout(() => {
            chgfunc()
          }, 24)
        }
      }
      chgfunc()
    },
    change(value, type) {
      if (type) {
        this.setGradu(0, 0)
      } else {
        if (this.val !== value * 10) this.setGradu(this.val, value * 10)
        this.val = value * 10
        this.luminancectrl = value * 10
      }
    },
    drawPointer(val) {
      // if (val != null) return
      let ctx = this.ctx
      val = val / 100
      // 画出pointer
      ctx.globalCompositeOperation = 'source-over'
      if (this.pointer) {
        ctx.save()
        ctx.rotate(-Math.PI / 2)
        ctx.rotate((Math.PI + Math.PI / 4) * val)
        ctx.drawImage(this.pointer, 0, 0, 17, 17, -0.0133 * this.cvswidth, 0.09 * this.cvsheight, 20 * this.scale, 20 * this.scale)
        ctx.restore()
      }
    },
    drawConvert(val) {
      let ctx = this.ctx
      // 没有亮度不画
      if (!val || !this.bgconvert) return
      ctx.globalCompositeOperation = 'source-over'
      ctx.save()
      val = val / 100 + 0.05
      ctx.globalAlpha = val
      ctx.rotate(Math.PI + Math.PI / 8)
      ctx.drawImage(this.bgconvert, 0, 0, 643, 625, -this.cvswidth / 2 + 0.008 * this.cvswidth, -this.cvsheight / 2 + 0.021 * this.cvsheight, this.cvswidth, this.cvsheight)
      ctx.restore()
    },
    Timestamps(time, show) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let date = new Date(time)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="less" scoped>
@blue: #00acff;
@green: #4caf50;
@red: #e53935;
.screen {
  margin-top: 5px;
  padding: 3px;
  height: 200px;
  border-radius: 3px;
  color: #00acff;
  background: rgba(20, 20, 20, 0.2);
  box-shadow: 0px 0px 6px #222;
  font-family: 微软雅黑;
  z-index: 1;
  .screen-title {
    position: relative;
    padding: 0 3px;
    line-height: 28px;
    font-size: 12px;
    .screen-title_left,
    .screen-title_right {
      display: inline-block;
    }
    .screen-title_right {
      font-size: 13px;
    }
    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      box-shadow: 0px 1px 2px #a7a7a7;
      background-color: @blue;
    }
  }
  .large {
    padding: 10px;
    padding-top: 20px;
    .large-title {
      text-align: center;
      font-family: TMBGSTD;
      font-size: 30pt;
    }
    .large-p {
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 30px;
      span {
        padding-left: 5px;
        vertical-align: top;
        font-size: 14px;
        // color: #0C66E8;
      }
    }
    i {
      padding-top: 5px;
      font-size: 20px;
    }
  }
}
.settingBtn {
  position: absolute;
  right: 0;
  bottom: -45px;
  font-size: 26px;
}
.button {
  bottom: 0px;
  background-image: url(/statics/images/button.png);
  background-size: contain;
  width: 100%;
}
.onoffbtn {
  position: absolute;
  bottom: 19%;
  left: 50%;
  margin-left: -21px;
}
.canvas {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #ff0000;
  z-index: 0;
}
// 滚动广告
.seamless-warp {
  overflow: hidden;
  height: 40px;
  width: 100%;
  ul.item {
    float: left;
    width: 100vw;
    color: #fff;
    font-size: 13px;
    li {
      float: left;
      padding-left: 40px;
      list-style-type: none;
    }
  }
}
.scroll-box {
  position: relative;
  box-sizing: border-box;
  &::after {
    position: absolute;
    content: '';
    top: 5px;
    left: -12px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: @green;
  }
}
.scroll-off {
  &::after {
    background-color: @red;
  }
}
.scrollBtn {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background: url(/statics/images/bg.png);
  box-shadow: 0 -3px 5px #222;
}
.lamp-modalCover_list {
  padding-bottom: 10px;
  font-size: 12px;
  line-height: 24px;
  .lamp-modal-span {
    position: relative;
    padding-left: 25px;
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 10px;
      bottom: 0;
      margin: auto 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: @green;
    }
  }
  .lamp-modal-action {
    &::after {
      background-color: @red;
    }
  }
}
</style>

<style lang="less">
@font-face {
  font-family: 'TMBGSTD';
  src: url('/statics/font/TMBGSTD_.TTF');
}
body {
  background: url(/statics/images/bg.png);
}
.lamp-dialogCover {
  .modal-content {
    background-color: #4a4a4a;
  }
  .modal-header {
    color: #fff;
  }
  .q-input {
    color: #fff;
  }
}
.lamp-inputCover {
  width: 240px;
}
.lamp-modalCover {
  .modal-content {
    background-color: #4a4a4a;
    color: #fff;
  }
}
</style>
