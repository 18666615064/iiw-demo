<template lang="pug">
  q-layout
    q-page-container
      q-page(padding)
        div.text-center.text-weight-bold(style="font-size: 22pt;").text-amber-9
          i.fa.fa-code
          span
            |&nbsp;欢迎使用示例系统
        div(style="max-width: 600px;margin: 20px auto;")
          div
            q-collapsible(icon="fas fa-edit" label="模板编辑器" :popup="true" group="item" @show="open('Editor')")
            q-collapsible(icon="fas fa-edit" label="示例中心" :popup="true" group="item" @show="open('Demo')")
            q-collapsible(icon="fas fa-edit" label="水表" :popup="true" group="item" @show="open('Water')")
            q-collapsible(icon="fas fa-edit" label="烟感" :popup="true" group="item" @show="open('Smoke')")
            q-collapsible(icon="fas fa-edit" label="路灯" :popup="true" group="item" @show="open('Lamp')")
            q-collapsible(icon="fas fa-edit" label="NB-IoT 信号探测仪" :popup="true" group="item" @show="open('Detection')")
            q-collapsible(icon="fas fa-list" label="支持设备" :popup="true" group="item")
              q-list(hightlight inset-separator no-border)
                q-item(v-for="item in product" :key="item.id")
                  q-item-side(:icon="item.icon" color="teal-5")
                  q-item-main
                    q-btn(:label="item.label" flat align="left" dense @click="openEditor(item)" :code="item.code").full-width.product
                  q-item-side(right)
                    q-checkbox(:label="item.version" v-model="item.hastemplate" readonly left-label)
</template>

<script>
export default {
  data() {
    return {
      hastemplate: true,
      notemplate: false,
      product: [
        {
          id: '1',
          icon: 'fas fa-swimming-pool',
          label: '物联网水表',
          code: 'water',
          version: '1.0',
          hastemplate: true
        },
        {
          id: '2',
          icon: 'fas fa-lightbulb',
          label: '物联网路灯',
          code: 'lamp',
          version: '1.0',
          hastemplate: true
        },
        {
          id: '3',
          icon: 'fas fa-exclamation-circle',
          label: '物联网烟感',
          code: 'alarm',
          version: '无',
          hastemplate: false
        }
      ]
    }
  },
  methods: {
    open(name) {
      switch (name) {
        case 'Editor':
          this.$router.push({ path: '/code' })
          break
        case 'Demo':
          this.$router.push({ path: '/lamp' })
          break
        case 'Water':
          this.$router.push({ path: '/loading/869664030006491' })
          break
        case 'Smoke':
          this.$router.push({ path: '/loading/869664030000510' })
          break
        case 'Detection':
          // this.$router.push({ path: '/detection' })
          this.$router.push({ path: '/loading/868194030006524' })
          break
        case 'Lamp':
          this.$router.push({ path: '/loading/868194030004271' })
          break
        default:
          break
      }
    },
    openEditor(item) {
      this.$store.commit('code/setEditingItem', item)
      this.$router.push({ path: '/code' })
    }
  }
}
</script>
<style lang="less" scoped>
.product {
  font-size: 12pt;
}
</style>
