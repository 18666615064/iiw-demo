<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import VueWebsocket from '../src/utils/eventsource'
Vue.use(VueWebsocket, '/devicecenter/es/listener')

export default {
  name: 'App',
  created() {
    console.log(VueWebsocket, 'url')
  }
}
</script>

<style>
@import './style/index.less';
</style>
