import Vue from 'vue'
import Router from 'vue-router'
import WithoutGrid from '@/components/WithoutGrid/WithoutGrid'

Vue.use(Router)

export default new Router({
  // DC: I needed to add this to get it to recognise the different route.
  //     Also it took off the "#/" that was being appended on to every URL.
  //     The default if hash mode.
  //     https://router.vuejs.org/en/essentials/history-mode.html
  mode: 'history',

  routes: [
    { path: '/', name: 'Root', component: WithoutGrid },
    { path: '/without-grid', name: 'WithoutGrid', component: WithoutGrid },
  ]
})
