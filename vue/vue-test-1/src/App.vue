<template>
  <div id="app">
    <img class='logo' src="./assets/logo.png">
    <links></links>

    <router-view msg='msg via <router-view>'></router-view>
    <!-- <test msg='msg via <test>'></test> -->
  </div>
</template>

<script>
  import Links from '@/components/Links'
  //import Test from '@/components/Test'

  export default {
    name: 'app'
    //, components: { Test }
    , components: { Links }
  }
</script>

<style src="./test.less" lang="less"></style>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .logo {
    position: absolute;
    margin: 0 auto;
    top: 0; left: 0; bottom: 0; right: 0;
    z-index: -10;
    opacity: 0.3;
  }
  .links {
    padding: 0;
  }
  .links li {
    display: inline;
    list-style: none;
    padding: 0 10px;
    border: 0 solid #999;
    border-width: 0 1px 0 0;
  }
  .links li:last-of-type {
    border: none;
  }
</style>
