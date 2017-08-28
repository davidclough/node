<template>
  <div class='test'>
    <h1>{{title}}</h1>
    <input type='text' v-model='title' />
    <input type='checkbox' v-model='showUser' />

    <transition v-on:enter="enterSlidily" v-on:leave="leaveSlidily">
      <div class='' v-if="showUser">{{user.firstName}}{{user.firstName}}{{user.firstName}}{{user.firstName}}{{user.firstName}}</div>
    </transition>

    <transition v-on:enter="enter" v-on:leave="leave">
      <div class='' v-if="showUser">{{user.firstName}}{{user.firstName}}{{user.firstName}}{{user.firstName}}</div>
    </transition>

    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled"
                v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave" v-on:leave-cancelled="leaveCancelled">
      <div class='' v-if="showUser">{{user.firstName}}{{user.firstName}}{{user.firstName}}</div>
    </transition>

    <transition name="slide-css">
      <div class='thing-being-slid' v-if="showUser">{{user.firstName}}{{user.firstName}}</div>
    </transition>

    <transition name="fade">
      <p v-if="showUser">{{user.firstName}}</p>
    </transition>
    <ul>
      <li v-for="item in items">{{item.title}}</li>
    </ul>
    <button v-on:click='greet'>Greet</button>
    <button v-on:click='greet("Hello")'>Greet</button>
    <br />
    <input type='text' @keyup='press' @keyup.enter='enterHit' />
    <hr />
    <label>LAZY First Name:</label><input type='text' v-model.lazy='user.firstName' />
    <label>Last Name:</label><input type='text' v-model='user.lastName' />
    <h3>{{fullName}}</h3>
    <h2>{{msg}}</h2>

    <input type='date' />
    <input type='time' /><br />

    <!-- checkbox not bound to a bool: https://vuejs.org/v2/guide/forms.html#Multiline-text -->
    <label>toggleAB:</label>
    <input type="checkbox" v-model='toggleAB' v-bind:true-value='a' v-bind:false-value='b' /> {{toggleAB}}
  </div>
</template>

<script>
import Velocity from 'velocity-animate';

export default {
  name: 'test',
  props: {
    msg: {
      type: String,
      default: 'Foobar'
    }
  },
  data() {
    const [meat, potatoes] = ['Meat', 'Potatoes'];

    return {
      title: 'Test',
      user: {
        firstName: 'John',
        lastName: 'Smith'
      },
      showUser: true,
      items: [
        { title: 'React' },
        { title: 'Angular' },
        { title: 'Vue' }
      ],
      toggleAB: meat,
      a: meat,
      b: potatoes
    };
  },
  methods: {
    greet: function (greeting) {
      alert(greeting);
    },
    press: function (e) {
      console.log(e.target.value);
    },
    enterHit: function (e) {
      console.log('enterHit');
    },

    // JavaScript Hooks - https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks
    // Also see my test: https://jsfiddle.net/davidclough/pxtz350p/5/

    // --------
    // ENTERING
    // --------
    beforeEnter: function (el) {
      // ...
    },
    // the done callback is optional when
    // used in combination with CSS
    enter: function (el, done) {
      // ...
      // done()
      Velocity(el, { rotateZ: '360deg' }, { loop: 2, complete: done });
    },
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },
    // --------
    // LEAVING
    // --------
    beforeLeave: function (el) {
      // ...
    },
    // the done callback is optional when
    // used in combination with CSS
    leave: function (el, done) {
      // ...
      // done()
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 });
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done });
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled only available with v-show
    leaveCancelled: function (el) {
      // ...
    },

    enterSlidily: function (el, done) {
      Velocity(el, 'slideDown', { complete: done });
    },
    leaveSlidily: function (el, done) {
      Velocity(el, 'slideUp', { complete: done });
    }
  },
  computed: {
    // this in arrow functions is bound to the parent context, not the object we are currently in.
    // fullName: () => this.user.firstName + ' ' + this.user.lastName
    fullName: function () { return `${this.user.firstName} ${this.user.lastName}`; }
  }
};
</script>

<style scoped lang='less'>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .thing-being-slid {
    overflow: hidden;
  }
  .slide-css-enter-active {
    transition: all 0.3s;// ease;
  }
  .slide-css-leave-active {
    transition: all 0.3s;// cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-css-enter, .slide-css-leave-to {
    height: 0;
  }
  .slide-css-leave, .slide-css-enter-to {
    height: 18px;   // Problem is this is a hard-coded height.
  }






  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }  
</style>
