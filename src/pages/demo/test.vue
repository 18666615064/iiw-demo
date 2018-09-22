<template>
  <!-- <div class="testBox">
    <q-spinner />
    <q-spinner-gears color="primary" :size="30" />
    <div class="container">
      <div class="wave ripple danger">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="content">
          <i class="fa fa-bell"></i>
        </div>
      </div>
      <div class="spliter"></div>
      <div class="wave solid warning">
        <div class="circle"></div>
        <div class="content">
          <i class="fa fa-bell"></i>
        </div>
      </div>
    </div>
  </div> -->
  <div>
    123
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
export default {
  name: 'test',
  components: {
    ICountUp
  },
  data() {
    return {
      stars: 1,
      startVal: 0,
      endVal: 120500,
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
      showSimulatedReturnData: false,
      visible: true
    }
  },
  methods: {
    onReady(instance, CountUp) {
      const that = this
      instance.update(that.endVal + 100)
    }
  }
}
</script>

<style lang='less' scoped>
.testBox {
  margin: 10px;
  // border: 1px solid #000;
  .q-card {
    margin-bottom: 10px;
  }
}
.iCountUp {
  font-size: 12em;
  margin: 0;
  color: #4d63bc;
}
.container {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
}
.spliter {
  width: 100%;
  height: 20px;
}
/************以下为具体实现************/
.wave {
  position: relative;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
}
.wave .circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
}
/* 波纹效果 */
.wave.ripple .circle {
  width: calc(100% - 6px); /* 减去边框的大小 */
  height: calc(100% - 6px); /* 减去边框的大小 */
  border: 3px solid #fff;
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
  border-color: red;
}
.wave.ripple.warning {
  color: orange;
}
.wave.ripple.warning .circle {
  border-color: orange;
}
/* 波动效果 */
.wave.solid .circle {
  width: 100%;
  height: 100%;
  background: #fff;
}
.wave.solid .circle:first-child {
  animation: circle-opacity 2s infinite;
}
.wave.solid.danger {
  color: red;
}
.wave.solid.danger .circle {
  background: red;
}
.wave.solid.warning {
  color: orange;
}
.wave.solid.warning .circle {
  background: orange;
}
@keyframes circle-opacity {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
