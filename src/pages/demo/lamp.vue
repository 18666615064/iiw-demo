<template lang="pug">
  div.q-pa
    .row
      .col-1
        |
      .col-10.screen.q-mt-lg
        span.ico
          i.fas.fa-signal.q-mr-sm
            |&nbsp;NB
          i.fas.fa-wrench
          i.fas.fa-calendar-alt.float-right(style="line-height: 18pt;")
            |&nbsp;2018-10-16 12:30:00
        hr.ico(style="border: none;border-top: 1px solid;box-shadow: 0px 1px 2px #a7a7a7;background-color: white;")
        div.large(style="text-align: center;")
          | 17 Kw·h
      .col-1
        |
    .button.absolute
      img(src="/statics/images/button.png" width="100%" style="visibility: hidden;")
      q-btn(color="positive" round flat icon="fas fa-power-off").onoffbtn
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {
    document.title = 'NB-IoT · 物联网电源'
  }
}
</script>

<style lang="less" scoped>
.screen {
  height: 200px;
  border-radius: 3px;
  color: #00acff;
  background: rgba(20, 20, 20, 0.2);
  box-shadow: 0px 0px 6px #222;
  padding: 3px;
  font-family: 微软雅黑;
  .ico {
    font-size: 9pt;
  }
  .large {
    font-family: TMBGSTD;
    font-size: 30pt;
  }
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
</style>
<style lang="less">
@font-face {
  font-family: 'TMBGSTD';
  src: url('/statics/font/TMBGSTD_.TTF');
}
body {
  background: url(/statics/images/bg.png);
}
</style>
