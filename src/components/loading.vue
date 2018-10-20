<template lang="pug">
  .mask(:class="check ? 'action' : ''")
    .content
      q-spinner-gears(color="light-blue-5" :size="100")
      p {{title}}
</template>

<script>
export default {
  name: 'loading',
  props: ['title'],
  data() {
    return {
      check: false
    }
  },
  methods: {
    show() {
      this.check = true
      let body = document.body
      body.style.cssText = 'overflow: hidden'
    },
    hide() {
      this.check = false
      let body = document.body
      body.style.cssText = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .mask {
    display: none;
  }
  .content {
    position: fixed;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 250px;
    height: 200px;
    text-align: center;
    p {
      margin-top: 18px;
      color: #fff;
    }
  }
  .action {
    position: fixed;
    display: inline-block;
    width: 100%;
    height: 100vh;
    background-color: #0000007d;
    top: 0;
    left: 0;
    z-index: 100;
  }
</style>
