import Vue from 'vue'
import App from './App.vue'
import vueXlsxTable from 'vue-xlsx-table'
import axios from 'axios'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(vueXlsxTable, {rABS: false}) //Browser FileReader API have two methods to read local file readAsBinaryString and readAsArrayBuffer, default rABS false
Vue.use(axios)