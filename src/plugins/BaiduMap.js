// import something here
import BaiduMap from 'vue-baidu-map'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: 'Y8f6BSmnqIGFguUx4Y9Ax8uG4U8hSGZw'
  })
}
