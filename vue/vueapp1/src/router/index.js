import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Test from '@/components/Test'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  // DC: I needed to add this to get it to recognise the different route.
  //     Also it took off the "#/" that was being appended on to every URL.
  //     The default if hash mode.
  //     https://router.vuejs.org/en/essentials/history-mode.html
  mode: 'history',

  routes: [
    { path: '/hello', name: 'Hello', component: Hello },
    { path: '/', component: Test },
    { path: '/users', component: Users }
  ],

  
  base: __dirname
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'test',
//       component: Test
//     },



//     {
//       path: '/hello',
//       name: 'Hello',
//       component: Hello
//     }
//   ]
// })
