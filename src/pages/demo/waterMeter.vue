<template lang="pug">
  .row
    .col-xs-12.col-md-8
      q-card-media
        img(src="../../assets/images/waterMeter.jpg")
      q-card-title
        | {{data.name}}<span style="padding-left: 5px; font-size: 14px;">{{data.code}}</span>
        div(slot="right" class="row items-center")
          q-icon(name="today")
          span(style="padding-left: 5px") 2018-09-19
      q-card-main
        q-item-tile(label lines="1")
          | 当月读表数 <span style="padding-left: 5px; font-size: 12px;">m³</span>
        p(class="text-faded" style="font-size: 50px;")
          ICountUp(:startVal="waterData[0].startVal" :endVal="waterData[0].endVal" :decimals="decimals" :duration="duration" :options="options" @ready="onReady")
          i(class="iconfont icon-water" style="font-size: 24px; color: #338edc")
      q-card-separator
    .col-12
      template(v-for="(item, index) in waterData")
        q-item(v-if="index !== 0" multiline class="water-lint" :key="index")
          q-item-side
            i(class="iconfont icon-shuibiao")
          q-item-main
            q-item-tile(label)
              ICountUp(style="color: #0c0c0c" :startVal="item.startVal" :endVal="item.endVal" :decimals="decimals" :duration="duration" :options="options" @ready="onReady")
              | <span style="padding-left: 5px; font-size: 12px;">m³</span>
            //- q-item-tile(sublabel lines="1")
              | 读表数
          q-item-side(right)
            q-item-tile(stamp) 2018-09-19
            //- q-item-tile(icon="star" color="yellow")
    .col-12
      canvas(id="myChart" height="260" style="width: 100%")
</template>

<script>
import ICountUp from 'vue-countup-v2'
import { getInfoImei } from '../../api/meter'
const F2 = require('@antv/f2')
export default {
  components: {
    ICountUp
  },
  name: 'waterMeter',
  data() {
    return {
      data: {
        name: '*****',
        code: ''
      },
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
      waterData: [{
        startVal: 0,
        endVal: 12633
      }, {
        startVal: 12300,
        endVal: 12300
      }, {
        startVal: 10200,
        endVal: 10200
      }, {
        startVal: 11000,
        endVal: 11000
      }, {
        startVal: 10000,
        endVal: 10000
      }, {
        startVal: 9200,
        endVal: 9200
      }],
      chartData: [{
        year: 6,
        age: 9200
      }, {
        year: 7,
        age: 10000
      }, {
        year: 8,
        age: 10100
      }, {
        year: 9,
        age: 10200
      }, {
        year: 10,
        age: 12300
      }, {
        year: 11,
        age: 12633
      }],
      defs: {
        // year: {
        //   range: [0, 1],
        //   max: 2020
        // },
        age: {
          tickCount: 5
        }
      }
    }
  },
  created() {
    this.getInfoImei()
  },
  mounted() {
    this._initChat()
  },
  methods: {
    onReady(instance, CountUp) {
      // const that = this
      // setTimeout(() => {
      //   instance.update(that.waterData[0].endVal + 100)
      // }, 5000)
    },
    _initChat() {
      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })
      chart.axis('year', {
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
        showCrosshairs: true
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
      chart.line().position('year*age').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      chart.area().position('year*age').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      chart.render()
      // // Step 2: 载入数据源
      // chart.source(this.data)

      // // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      // chart.interval().position('genre*sold').color('genre')

      // // Step 4: 渲染图表
      // chart.render()
    },
    getInfoImei() {
      getInfoImei('869664030006491').then(res => {
        let data = res.data
        this.data = data.device
        console.log(data, 'data')
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
</style>

<style lang="less">
  .water-lint {
    .q-item-label {
      line-height: 2.0;
    }
  }
</style>
