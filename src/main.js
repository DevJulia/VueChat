import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { rtdbPlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import VModal from 'vue-js-modal'

//Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPaperPlane)
library.add(faPhone)
library.add(faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(rtdbPlugin)
Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

firebase.auth().onAuthStateChanged(() => {
  if (!App) {
    App = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});