<template lang="pug">
  q-layout(view="hHr LpR lFf")
      q-layout-header
        q-toolbar
          q-btn(flat round dense icon="fas fa-chevron-left")
          q-toolbar-title
            |路灯Demo
      q-page-container(color="black")
        q-page(padding)
          QBtn(v-if="lighting" @click="onoff(true)" color="positive" icon="fas fa-lightbulb") &nbsp;开灯
          QBtn(v-else @click="onoff(false)" color="negative" icon="far fa-lightbulb") &nbsp;关灯
          q-card-media
            image(src="../statics/light-off.png")
</template>
<script>
export default {
  data() {
    return {
      lighting: false,
      offimg: null
    }
  },
  methods: {
    onoff(flag) {
      this.lighting = !this.lighting
    }
  },
  mounted() {
    //this.$axios.get()
  }
}
</script>