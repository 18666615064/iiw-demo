const path = require('path')
// Configuration for your app
module.exports = function(ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: ['i18n', 'axios', 'codemirror', 'BaiduMap'],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null, 'material-icons', 'fontawesome' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
        cfg.module.rules.push({
          test: /\.less$/,
          loader: 'less-loader'
        })
      },
      chainWebpack(chain) {
        chain.resolve.alias
          .set('@', path.resolve(__dirname, './src'))
      }
    },
    devServer: {
      // https: true,
      open: false
      // host: '192.168.20.177',
      // port: 8080,
      // open: false, // opens browser window automatically
      // proxy: {
      //   // 将所有以/api开头的请求代理到jsonplaceholder
      //   '/server': {
      //     target: 'http://api.iotdev.top/admin/devicecenter',
      //     // target: 'http://1u5517x920.imwork.net:12028',
      //     // target: 'http://192.168.20.240:8807',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/server': ''
      //     }
      //   }
      // }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: ['QLayout', 'QLayoutHeader', 'QLayoutDrawer', 'QPageContainer', 'QPage', 'QPageSticky', 'QToolbar', 'QTabs', 'QRouteTab', 'QLayoutFooter', 'QScrollArea', 'QToolbarTitle', 'QBtn', 'QIcon', 'QList', 'QListHeader', 'QItem', 'QItemMain', 'QItemSide', 'QCollapsible', 'QCheckbox', 'QWindowResizeObservable', 'QResizeObservable', 'QBtnGroup', 'QCard', 'QCardTitle', 'QCardMain', 'QCardMedia', 'QCardSeparator', 'QCardActions', 'QItemTile', 'QSpinner', 'QSpinnerGears', 'QSpinnerPie', 'QFab', 'QFabAction', 'QTable', 'QTh', 'QTr', 'QTd', 'QToggle', 'QProgress', 'QModal', 'QKnob', 'QTab', 'QTabPane', 'QDialog', 'QInput'],
      directives: ['Ripple', 'CloseOverlay'],
      // Quasar plugins
      plugins: ['Notify', 'Dialog'],
      iconSet: 'fontawesome',
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'zh-hans' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: 'all',
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          'src': 'statics/icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png'
        }, {
          'src': 'statics/icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        }, {
          'src': 'statics/icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png'
        }, {
          'src': 'statics/icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png'
        }, {
          'src': 'statics/icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  }
}
