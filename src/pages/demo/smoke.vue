<template lang="pug">
  .smoke-outer(:style="this.infoData.length < 4 ? 'height: 100vh' : ''")
    .row
      .col-12
        div(@click="opened = true")
          .mapBtn
            q-icon(v-if="checked" name="place" color="blue-6")
            i(v-else class="iconfont icon-huo text-red-9")
          span(class="imgTitle")
            |设备状态：<span :class="checked ? 'text-light-green-6' : 'text-deep-orange-13'">{{ checked ? '正常' : '告警' }}</span>
          q-card-media(class="imgBox" style="overflow: inherit;")
            .wave.ripple.danger(v-show="checked ? '' : 'active'")
              .circle
              .circle
              //- .circle
            img(src="../../assets/images/smoke.png")
            .breathe-btn(:class="checked ? '' : 'active'")
          q-card-separator
          //- .current-list
            i(class="iconfont icon-kongzhi text-blue-grey-6")
            | 设备调试
            .current-list_right
              q-toggle(v-model="checked" @onchage="toggleChange")
          .current-list
            i(class="iconfont icon-dianliang text-light-green-6")
            | 剩余电量
            .current-list_right
              q-progress(:percentage="progressBuffer" color="green-5")
              | 74%
          .current-list
            i(class="iconfont icon-shijian text-blue-7")
            | 检测时间
            .current-list_right
              //- q-icon(name="today")
              span(style="padding-left: 5px") {{nowInfo.cretime}}
      .col-12(style="margin-bottom: 10px")
        div
          .list_title 历史记录
          q-list(inset-separator class="list-reset")
            //- q-item
              q-item-side(class="text-light-green-6")
                i(class="iconfont icon-wuxianyangan")
              q-item-main(sublabel-lines="1" class="text-light-green-6") 正常
              q-item-side(right)
                q-item-tile 2018-09-27 13:15:00
            //- q-item
              q-item-side(class="text-deep-orange-13")
                i(class="iconfont icon-wuxianyangan")
              q-item-main(sublabel-lines="1" class="text-deep-orange-13") 告警
              q-item-side(right)
                q-item-tile 2018-09-27 13:15:00
            template(v-for="(item, index) in infoData")
              q-item(:key="index")
                q-item-side(:class="item.value === '1' ? 'text-deep-orange-13' : 'text-light-green-6'")
                  i(class="iconfont icon-wuxianyangan")
                q-item-main(sublabel-lines="1" :class="item.value === '1' ? 'text-deep-orange-13' : 'text-light-green-6'") {{ item.value === '1' ? '告警' : item.value === '2' ? '告警结束' : '正常' }}
                q-item-side(right)
                  q-item-tile {{item.cretime}}
    q-modal(v-model="opened" position="bottom")
      div(:style="checked ? 'padding-bottom: 20px' : 'padding-bottom: 70px'")
        .mapBox
          baidu-map(ref="map" :center="center" :zoom="zoom" @ready="initMap" style="width: 100%; height: 300px;")
            //- bm-marker(:position="center" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: '../../assets/images/smoke-e.png', size: {width: 30, height: 38}}" :offset="{width: 0, height: -20}")
            .geolocation(@click="locateChange")
              q-icon(name="my_location" color="grey-7")
            //- bm-marker(:position="center")
          //- .wave.ripple.danger(style="width: 50px; height: 50px;")
            .circle
            .circle
            .circle
        .current-list
          i(class="iconfont icon-dizhi text-grey-7")
          | {{ checked ? '烟感地址' : '告警地址' }}
          .current-list_right
            | {{address}}
        //- .current-list
          | 火警电话
          .current-list_right
            |<a href="tel:119" class="testa"><q-icon name="call" class="icon-tel-consult"></q-icon></a>
        .current-list
          i(class="iconfont icon-shijian text-blue-7")
          | {{ checked ? '检测时间' : '告警时间' }}
          .current-list_right
            q-icon(name="today")
            span(style="padding-left: 5px") 2018-09-27 13:15:00
        .phoneBtn(v-if="!checked" class="fixed")
          |<a href="tel:119" class="phoneA"><q-icon name="call" class="icon-tel-consult"></q-icon></a>
        //- audio(id='audio' src='http://go.163.com/2018/0209/mengniu/audio/bgm.mp3' loop)
        //- q-btn(class="fixed" style="left: 18px; top: 18px" color="primary" icon="reply" round @click="opened = false")
</template>

<script>
// import AMap from 'AMap'
import { getInfoList } from '@/api/meter'
export default {
  data() {
    return {
      checked: true,
      progressBuffer: 74,
      infoData: [],
      nowInfo: {},
      opened: false,
      map: null,
      center: {
        lng: 113.413206,
        lat: 23.158174
      },
      zoom: 19,
      marker: null,
      address: '',
      iconUrl: {
        error: require('../../assets/images/smoke-e.png'),
        normal: require('../../assets/images/smoke-n.png')
      }
    }
  },
  created() {
    this.getInfoList()
    this.wsMonitor(this.$route.params.imei)
  },
  mounted() {
    // let audio = document.getElementById('audio')
    // console.log(audio, 'audio')
    // document.addEventListener('DOMcontentLoaded', () => {
    //   this.$q.notify({
    //     message: 'DOMcontentLoaded',
    //     type: 'positive',
    //     position: 'bottom-left'
    //   })
    //   document.addEventListener('WeixinJSBridgeReady', () => {
    //     this.$q.notify({
    //       message: 'WeixinJSBridgeReady',
    //       type: 'positive',
    //       position: 'bottom-left'
    //     })
    //     audio.play()
    //   }, false)
    // })
    // document.addEventListener('touchstart', () => {
    //   this.$q.notify({
    //     message: 'touchstart',
    //     type: 'positive',
    //     position: 'bottom-left'
    //   })
    //   audio.play()
    // })
  },
  methods: {
    toggleChange(val) {
      console.log(val, 'val')
    },
    wsMonitor(imei) {
      // var es = new EventSource(`/server/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      var es = new EventSource(`/admin/devicecenter/es/listen?events=${encodeURI('["dataLog"]')}&imei=${imei}`)
      es.addEventListener('dataLog', e => {
        this.getInfoList()
      })
    },
    getInfoList() {
      getInfoList({
        imei: this.$route.params.imei,
        name: 'alarm',
        size: 10
      })
        .then(res => {
          let data = res.data
          data.forEach((item, i) => {
            if (i !== 0) {
              this.infoData.push(item)
            }
          })
          if (data[0].value === '1') {
            this.checked = false
          } else {
            this.checked = true
          }
          this.nowInfo = data[0]
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            type: 'negative',
            position: 'top-left'
          })
        })
    },
    /* eslint-disable */
    initMap({ BMap, map }) {
      console.log(map.getZoom())
      this.map = map
      let point = new BMap.Point(this.center.lng, this.center.lat)
      let iconurl = null
      if (this.checked) {
        iconurl = this.iconUrl.normal
      } else {
        iconurl = this.iconUrl.error
      }
      let icon = new BMap.Icon(iconurl, new BMap.Size(30, 38))
      let marker = new BMap.Marker(point, { icon: icon })
      map.addOverlay(marker)
      this.marker = marker

      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(point, res => {
        this.address = res.address
      })
    },
    locateChange(e) {
      this.map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 19)
    }
  }
}
</script>

<style lang="less" scoped>
.col-12 {
  padding: 0 10px;
  box-sizing: border-box;
  > div {
    position: relative;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.45098039215686275);
    border-radius: 5px;
  }
}
.mapBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
  .icon-huo {
    font-size: 30px;
  }
}
.mapBox {
  position: relative;
  padding: 4px;
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
.smoke-outer {
  // height: 100vh;
  background-color: #efefef;
  // background: linear-gradient(#6195A2,#CCE9D6);
}
.imgTitle {
  display: inline-block;
  padding-top: 5px;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.imgBox {
  position: relative;
  margin: 0 auto;
  padding: 20px 0;
  width: 200px;
}
.list_title {
  display: inline-block;
  padding-top: 8px;
  padding-left: 12px;
  font-size: 14px;
}
.list-reset {
  margin: 8px 0;
  padding: 0;
  border-width: 0;
  max-height: 230px;
  overflow: overlay;
}
.current-list {
  padding: 5px 10px;
  font-size: 14px;
  line-height: 30px;
  .current-list_right {
    float: right;
    width: 60%;
    text-align: right;
    color: #757575;
    .q-progress {
      float: left;
      margin: 10px 0;
      height: 10px !important;
      width: 80%;
      border-radius: 5px;
    }
  }
}
.iconfont {
  padding-right: 5px;
}
// 呼吸灯
.breathe-btn {
  position: absolute;
  margin: auto 0;
  top: 0;
  left: 7%;
  bottom: 0;
  width: 10px;
  height: 10px;
  border: 1px solid #21ba45;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#21ba45), to(#2bc54f));
  animation-timing-function: ease-in-out;
  animation-name: breathe;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.breathe-btn.active {
  border-color: #db2828;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#db2828), to(#f70b0b));
  animation-name: breatheAction;
  animation-duration: 500ms;
}
@keyframes breathe {
  0% {
    opacity: 0.3;
    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  }
  100% {
    opacity: 1;
    border: 1px solid #21ba45;
    box-shadow: 0 1px 30px #21ba45;
  }
}
@keyframes breatheAction {
  0% {
    opacity: 0.3;
    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  }
  100% {
    opacity: 1;
    border: 1px solid #db2828;
    box-shadow: 0 1px 30px #db2828;
  }
}

// 波纹扩散
.wave {
  position: absolute;
  top: 0;
  left: -50px;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 300px;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
  .circle {
    position: absolute;
    top: 0;
    right: 0;
    margin: auto 0;
    border-radius: 50%;
    opacity: 0;
  }
  .fa {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto 0;
    line-height: 100px;
    vertical-align: middle;
  }
}
.wave.ripple .circle {
  width: 100%;
  height: 100%;
  // border: 3px solid #fff;
}
.wave.ripple .circle:first-child {
  animation: circle-opacity 2s infinite;
}
.wave.ripple .circle:nth-child(2) {
  animation: circle-opacity 2s infinite;
  animation-delay: 0.3s;
}
.wave.ripple .circle:nth-child(3) {
  animation: circle-opacity 2s infinite;
  animation-delay: 0.6s;
}
.wave.ripple.danger {
  color: red;
}
.wave.ripple.danger .circle {
  // border-color: red;
  background: radial-gradient(white, #e84747);
}
.wave.ripple.warning {
  color: orange;
}
.wave.ripple.warning .circle {
  border-color: orange;
}
@keyframes circle-opacity {
  from {
    opacity: 1;
    transform: scale(0);
    // transform: scale(0.48);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}
.phoneBtn {
  left: 0;
  right: 0;
  bottom: 18px;
  margin: auto;
  text-align: center;
  .phoneA {
    display: inline-block;
    color: #ff2626;
    width: 100%;
    text-align: center;
    vertical-align: middle;
  }
}
.icon-tel-consult:before {
  position: absolute;
  content: 'TEL';
  top: 0;
  left: -20px;
  font-size: 12px;
}
.icon-tel-consult {
  position: relative;
  font-size: 2em;
  animation: msClock 1.2s linear infinite;
  animation: msClock 1.2s linear infinite;
}
@keyframes msClock {
  0%,
  90%,
  100% {
    transform: rotate(0) scale(1);
  }
  20%,
  40% {
    transform: rotate(-15deg) scale(1.1);
  }
  30%,
  50% {
    transform: rotate(15deg) scale(1.1);
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}
</style>
