<template>
  <div class='test'>
    <h1>Hello from {{ title }}</h1>

    <!-- https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes -->
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <div id="example-3">
      <button @click="show = !show">
        Toggle Render
      </button>
      <transition name="custom-classes-transition"
                  enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
        <p v-if="show">hello</p>
      </transition>
    </div>

    <!-- https://vuejs.org/v2/guide/transitions.html#Transition-Modes -->
    <div style="position:relative; height:30px;">
      <transition name="fade" mode="out-in">
        <button v-bind:key="docState" @click="toggleState"
                style="position:absolute; width:100px; left: 50%; margin-left:-50px;">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>

    <!-- https://vuejs.org/v2/guide/transitions.html#Transitioning-Between-Components -->
    <div @click="switchComponent" class="component-container">
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
    </div>

    <!-- https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions 1st one -->
    <div id="flip-list-demo" class="demo" style="padding: 20px 0;">
      <button v-on:click="shuffle">Shuffle</button>
      <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" v-bind:key="item">
          {{ item }}
        </li>
      </transition-group>
    </div>

    <!-- https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions 2nd one -->
    <div id="list-complete-demo" class="demo">
      <button v-on:click="shuffle">Shuffle</button>
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="item in items"
          v-bind:key="item"
          class="list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>

    <!-- https://vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions -->
    <div id="staggered-list-demo" style="padding: 30px 0 0;">
      <input v-model="query">
      <transition-group name="staggered-fade" tag="ul" :css="false"
                        @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <li v-for="(item, index) in computedList" :key="item.msg" :data-index="index">
          {{ item.msg }}
        </li>
      </transition-group>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
// import * as _ from 'lodash';
import Velocity from 'velocity-animate';

export default {
  name: 'animations',
  props: {
  },
  data() {
    return {
      title: 'Animations',
      show: true,
      docState: 'saved',
      view: 'v-a',

      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,

      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    };
  },
  methods: {
    toggleState: function () {
      this.docState = this.docState === 'saved' ? 'edited' : 'saved';
    },
    switchComponent: function () {
      this.view = this.view === 'v-a' ? 'v-b' : 'v-a';
    },

    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum);
      this.nextNum += 1;
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
    shuffle: function () {
      this.items = _.shuffle(this.items);
    },

    // https://vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions
    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function (el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(el, { opacity: 1, height: '1.6em' }, { complete: done });
      }, delay);
    },
    leave: function (el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    }

  },
  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved': return 'Edit';
        case 'edited': return 'Save';
        default: return 'Cancel';
      }
    },

    // https://vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions
    computedList: function () {
      const vm = this;
      return this.list.filter(item =>
        item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1);
    }
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
};
</script>

<style scoped lang='less'>
  .test {
    color: #a00;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .component-container {
    cursor: pointer;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }

</style>
