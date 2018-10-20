<template lang="pug">
  .signal(:class="size === 0 ? 'signal0' : size === 1 ? 'signal1' : size === 2 ? 'signal2' : size === 2 ? 'signal3' : ''")
    span
    span
    span
    span
    .check(v-if="size === 0")
      .piece1
      .piece2
</template>
<script>
export default {
  props: ['size'],
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.signal {
  position: relative;
  display: inline-block;
  padding-top: 2px;
  width: 20px;
  height: 20px;
  span {
    display: inline-block;
    margin-right: 2px;
    background-color: #00acff;
    width: 3px;
    height: 5px;
  }
  span:nth-child(2) {
    height: 8px;
  }
  span:nth-child(3) {
    height: 11px;
  }
  span:nth-child(4) {
    height: 14px;
  }
  .check {
    position: absolute;
    top: 5px;
    left: 2px;
    .piece1, .piece2 {
      position: absolute;
      display: inline-block;
      width: 2px;
      height: 7px;
      background-color: red;
    }
    .piece1 {
      transform: rotate(45deg)
    }
    .piece2 {
      transform: rotate(-45deg)
    }
  }
}
.signal0 {
  span {
    opacity: .3;
  }
}
.signal1 {
  span:nth-child(2), span:nth-child(3), span:nth-child(4) {
    opacity: .3;
  }
}
.signal2 {
  span:nth-child(3), span:nth-child(4) {
    opacity: .3;
  }
}
.signal3 {
  span:nth-child(4) {
    opacity: .3;
  }
}
</style>
