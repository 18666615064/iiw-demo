<template lang="pug">
  .row
    .col-12(class="fixed-center text-center")
      q-spinner-gears(v-if="loading" color="primary" :size="100")
      div(v-else)
        p
          img(src="~assets/sad.svg" style="width:30vw;max-width:150px;")
        p(class="text-faded")
          |{{msg}}
</template>

<script>
import { getInfoImei } from '@/api/meter'
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
  mounted() {
    document.title = '加载中...'
  },
  methods: {
    getInfoImei() {
      getInfoImei(this.$route.params.id)
        .then(res => {
          let data = res.data
          data.imei = this.$route.params.id
          window.sessionStorage['imei'] = this.$route.params.id
          window.sessionStorage['id'] = data.device.id
          if (data.id !== undefined && data.id === '-1') {
            this.msg = data.message
            this.loading = false
          } else {
            switch (data.product.name) {
              case 'NB-Water':
                this.$router.push({ name: 'waterMeter', params: data })
                break
              case 'NB-Smoke':
                this.$router.push({ name: 'smoke', params: data })
                break
              case 'NB-Detector':
                this.$router.push({ name: 'detection', params: data })
                break
              case 'NB-Lamp3.0':
              case 'NB-Lamp':
                this.$router.push({ name: 'lamp', params: data })
                break
              default:
                this.msg = '找不到该设备'
                this.loading = false
                break
            }
          }
        })
        .catch(error => {
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
  line-height: 100vh;
}
</style>
