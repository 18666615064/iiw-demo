<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu")
          q-icon(name="menu")
        q-toolbar-title
          |示例中心
          div(slot="subtitle") Running on Quasar v{{ $q.version }}
    q-layout-drawer(v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null")
      q-list(no-border link inset-delimiter)
        q-list-header Essential Links
        q-item(@click.native="openURL('http://quasar-framework.org')")
          q-item-side(icon="school")
          q-item-main(label="Docs" sublabel="quasar-framework.org")
    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'transfer',
  data() {
    return {
      leftDrawerOpen: false
    }
  },
  created() {
    // console.log(this.$q, '$q$q$q')
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
