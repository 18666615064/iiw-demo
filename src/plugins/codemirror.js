// import something here
import codemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(codemirror)
}
