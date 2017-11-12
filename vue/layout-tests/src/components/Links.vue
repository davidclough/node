<template>
  <ul class='links'>
    <li v-for='link in linkDetails'><router-link v-bind:to='link.route'>{{link.text}}</router-link></li>
  </ul>
</template>

<script>
  export default {
    name: 'links',
    data() {
      return {
        linkDetails: [
          { route: '/without-grid', text: 'Without Grid' },
        ]
      };
    }
  };
</script>

<style scoped lang="less">
  .links {
    padding: 20px;
    margin: 0;
    background-color: #333;
    font-size: 120%;

    li {
      display: inline;
      list-style: none;
      padding: 5px 10px;
      border: 0 solid #999;
      border-width: 0 1px 0 0;

      a {
        color: #fff;
        text-decoration: none;
      }
    }
    li:last-of-type {
      border: none;
    }
  }
</style>
