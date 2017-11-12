<template>
  <div id="app">
    <links></links>
    <router-view></router-view>
  </div>
</template>

<script>
  import Links from '@/components/Links';

  export default {
    name: 'app',
    components: { Links }
  };
</script>

<style>
  /* https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
