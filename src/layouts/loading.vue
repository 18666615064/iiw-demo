<template lang="pug">
  .row
    .col-12(class="fixed-center text-center")
      q-spinner-gears(v-if="loading" color="primary" :size="100")
      div(v-else)
        p
          img(src="~assets/sad.svg" style="width:30vw;max-width:150px;")
        p(class="text-faded")
          |{{msg}}<strong>(404)</strong>
</template>

<script>
import { getInfoImei } from '../api/meter'
export default {
  data() {
    return {
      loading: true,
      msg: ''
    }
  },
  created() {
    this.getInfoImei()
  },
  methods: {
    getInfoImei() {
      getInfoImei(this.$route.params.id).then(res => {
        let data = res.data
        data.imei = this.$route.params.id
        if (data.id !== undefined && data.id === '-1') {
          this.msg = data.message
          this.loading = false
        } else {
          switch (data.product.name) {
            case 'NB-Water':
              this.$router.push({ name: 'waterMeter', params: data })
              break
            default:
              this.msg = '找不到改设备'
              this.loading = false
              break
          }
        }
      }).catch(error => {
        this.loading = false
        this.msg = error.message
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .loadingBox {
    height: 100vh;
    text-align: center;
    line-height: 100vh
  }
</style>
