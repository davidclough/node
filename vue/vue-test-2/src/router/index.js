import Vue from 'vue';
import Router from 'vue-router';
import Slots from '@/components/Slots/Slots';
import Test from '@/components/Test';
import Users from '@/components/Users';
import ButtonCounter from '@/components/ButtonCounter/ButtonCounter';
import Animations from '@/components/Animations/Animations';
import StateTransitions from '@/components/Animations/StateTransitions';

Vue.use(Router);

export default new Router({
  // DC: I needed to add this to get it to recognise the different route.
  //     Also it took off the "#/" that was being appended on to every URL.
  //     The default if hash mode.
  //     https://router.vuejs.org/en/essentials/history-mode.html
  mode: 'history',

  routes: [
    { path: '/slots', name: 'Slots', component: Slots },
    { path: '/', component: Test },
    { path: '/users', component: Users },
    { path: '/button-counter', component: ButtonCounter },
    { path: '/animations', component: Animations },
    { path: '/state-transitions', component: StateTransitions }
  ],

  base: __dirname
});

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
