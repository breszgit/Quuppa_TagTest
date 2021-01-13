import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueTimers from 'vue-timers'
 
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueTimers)

Vue.config.productionTip = false
Vue.prototype.$bkURL = "http://localhost:8080/qpe/"

//--Layout--
import DefaultLayout from './layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/TestTag',
    component: DefaultLayout,
    children: [
      {
        path: '/TestTag',
        name: 'TestTag',
        component: () => import('./views/TestTagPage.vue'),
        meta: { title:"Test Tag" }
      }
    ]
  }
]

const router = new Router({routes, mode: 'history'})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})