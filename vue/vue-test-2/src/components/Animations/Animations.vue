<template>
  <div class='test'>
    <h1>Hello from {{ title }}</h1>

    <!-- https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes -->
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <div id="example-3">
      <button @click="show = !show">
        Toggle render
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

  </div>
</template>

<script>
export default {
  name: 'animations',
  props: {
  },
  data() {
    return {
      title: 'Animations',
      show: true,
      docState: 'saved',
      view: 'v-a'
    };
  },
  methods: {
    toggleState: function () {
      this.docState = this.docState === 'saved' ? 'edited' : 'saved';
    },
    switchComponent: function () {
      this.view = this.view === 'v-a' ? 'v-b' : 'v-a';
    }
  },
  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved': return 'Edit';
        case 'edited': return 'Save';
        default: return 'Cancel';
      }
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
</style>
