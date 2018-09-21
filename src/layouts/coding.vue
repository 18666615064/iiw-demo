<template lang="pug">
  q-layout
    //-- Be sure to play with the Layout demo on docs -->

    //-- (Optional) The Header -->
    q-layout-header
      q-toolbar
        //- q-btn(flat round dense icon="menu" @click="leftDrawer = !leftDrawer")
        q-btn(flat round dense icon="fa fa-home" @click="goHome")
        q-toolbar-title
          Header
            span(slot="subtitle") 代码编辑器
      //- q-tabs
      //-   q-route-tab(slot="title" icon="map" to="/your/route" replace label="One Tab")
      //-   q-route-tab(slot="title" icon="assignment" to="/some/other/route" replace label="Other Tab")

    //-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    q-layout-drawer(side="left" v-model="leftDrawer")
      //-- QScrollArea is optional -->
      q-scroll-area(class="fit q-pa-sm")
        //-- Content here -->
    q-page-container
      //-- This is where pages get injected -->
      router-view
</template>

<script>
export default {
  // name: 'LayoutName',
  data() {
    return {
      leftDrawer: false
    }
  },
  methods: {
    goHome() {
      this.$q
        .dialog({
          title: '确认',
          message: '未保存的修改将撤销，是否确认退出编辑？',
          ok: '确认',
          cancel: '取消'
        })
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {})
    }
  },
  mounted() {}
}
</script>

<style>
</style>
