<template lang="pug">
  .smoke-outer
    .row
      .col-12
        div(@click="opened = true")
          .mapBtn
            i(class="iconfont icon-huo text-red-9")
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
          .current-list
            i(class="iconfont icon-kongzhi text-blue-grey-6")
            | 设备强控
            .current-list_right
              q-toggle(v-model="checked" @onchage="toggleChange")
          .current-list
            i(class="iconfont icon-dianliang text-light-green-6")
            | 剩余电量
            .current-list_right
              q-progress(:percentage="progressBuffer" color="green-5")
              | 30%
          .current-list
            i(class="iconfont icon-shijian text-blue-7")
            | 最后上报
            .current-list_right
              //- q-icon(name="today")
              span(style="padding-left: 5px") 2018-09-27 13:15:00
      .col-12
        div
          .list_title 历史记录
          q-list(inset-separator style="border-width: 0;")
            q-item
              q-item-side(class="text-light-green-6")
                i(class="iconfont icon-wuxianyangan")
              q-item-main(sublabel-lines="1" class="text-light-green-6") 正常
              q-item-side(right)
                q-item-tile(stamp="2018-09-27 13:15:00") 2018-09-27 13:15:00
            q-item
              q-item-side(class="text-deep-orange-13")
                i(class="iconfont icon-wuxianyangan")
              q-item-main(sublabel-lines="1" class="text-deep-orange-13") 告警
              q-item-side(right)
                q-item-tile(stamp="2018-09-27 13:15:00") 2018-09-27 13:15:00
            template(v-for="(item, index) in infoData")
              q-item(:key="index")
                q-item-side(:class="item.value === '0' ? 'text-light-green-6' : 'text-deep-orange-13'")
                  i(class="iconfont icon-wuxianyangan")
                q-item-main(sublabel-lines="1" :class="item.value === '0' ? 'text-light-green-6' : 'text-deep-orange-13'") {{ item.value === '0' ? '正常' : '告警' }}
                q-item-side(right)
                  q-item-tile(stamp="item.cretime")
    q-modal(v-model="opened" position="bottom")
      div(style="padding-bottom: 70px")
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
          | 告警地址
          .current-list_right
            | {{address}}
        //- .current-list
          | 火警电话
          .current-list_right
            |<a href="tel:119" class="testa"><q-icon name="call" class="icon-tel-consult"></q-icon></a>
        .current-list
          i(class="iconfont icon-shijian text-blue-7")
          | 告警时间
          .current-list_right
            q-icon(name="today")
            span(style="padding-left: 5px") 2018-09-27 13:15:00
        .phoneBtn(class="fixed")
          |<a href="tel:13539440237" class="phoneA"><q-icon name="call" class="icon-tel-consult"></q-icon></a>
        //- audio(id='audio' src='http://go.163.com/2018/0209/mengniu/audio/bgm.mp3' autoplay loop)
        //- q-btn(class="fixed" style="left: 18px; top: 18px" color="primary" icon="reply" round @click="opened = false")
</template>

<script>
// import AMap from 'AMap'
/* eslint-disable */
import { getInfoList } from '@/api/meter'
export default {
  data() {
    return {
      checked: true,
      progressBuffer: 30,
      infoData: [],
      opened: true,
      map: null,
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 3,
      marker: null,
      address: ''
    }
  },
  created() {
    this.getInfoList()
  },
  methods: {
    toggleChange(val) {
      console.log(val, 'val')
    },
    initMap({BMap, map}) {
      console.log(map)
      this.center.lng = 113.354457
      this.center.lat = 23.070887
      this.zoom = 19
      this.map = map
      
      let point = new BMap.Point(113.354457, 23.070887)
      let icon = new BMap.Icon(require('../../assets/images/smoke-e.png'), new BMap.Size(30, 38))
      let marker = new BMap.Marker(point, { icon: icon})
      map.addOverlay(marker)
      this.marker = marker

      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(point, (res) => {
        console.log(res, 'res')
        this.address = res.address
      })
    },
    locateChange(e) {
      console.log(e, '222')
      console.log(window)
      this.map.centerAndZoom(new BMap.Point(113.354457, 23.070887), 19)
    },
    getInfoList() {
      let query = {
        imei: this.$route.params.imei,
        name: 'alarm',
        size: 24
      }
      getInfoList(query).then(res => {
        this.infoData = res.data
      }).catch(error => {
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
  height: 100vh;
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
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#21ba45),
    to(#2bc54f)
  );
  animation-timing-function: ease-in-out;
  animation-name: breathe;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.breathe-btn.active {
  border-color: #db2828;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#db2828),
    to(#f70b0b)
  );
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
  content: "TEL";
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
  0%,90%,100% {
    transform: rotate(0) scale(1);
  }
  20%,40% {
    transform: rotate(-15deg) scale(1.1);
  }
  30%,50% {
  transform: rotate(15deg) scale(1.1);
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}
</style>
