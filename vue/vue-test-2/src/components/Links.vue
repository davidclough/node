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
          { route: '/users', text: 'Users' },
          { route: '/', text: 'Test' },
          { route: '/slots', text: 'Slots' },
          { route: '/game', text: 'Game' }
        ]
      };
    }
  };
</script>

<style scoped>
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
  a {
      display: inline-block;
      transform: rotate(7deg);
  }
</style>
