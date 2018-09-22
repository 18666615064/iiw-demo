<template lang="pug">
  //- q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu")
          q-icon(name="menu")
        q-toolbar-title
          |{{productData.alias}}
          div(slot="subtitle") {{productData.name}}
    q-layout-drawer(v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null")
      q-list(no-border link inset-delimiter)
        q-list-header Essential Links
        q-item(@click.native="openHome")
          q-item-side(icon="school")
          q-item-main(label="Home" sublabel="Sample system home page")
    q-page-container
      router-view
  div
    router-view
</template>

<script>

export default {
  name: 'transfer',
  data() {
    return {
      leftDrawerOpen: false,
      productData: {}
    }
  },
  created() {
    this.productData = this.$route.params.product
  },
  methods: {
    openHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
</style>
