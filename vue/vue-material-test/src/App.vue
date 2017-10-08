<template>
  <div id="app">
    <md-card>
      <md-card-header>
        <div class="md-title">
          Material Design with Vue.js 2 Demo
        </div>
        <div class="md-subhead">
          Walk-though of <a href="https://www.youtube.com/watch?v=1j8xTOmR8pw" target="_blank">Using Material Design with Vue.js 2</a> video
        </div>
      </md-card-header>
      <md-card-content>
        <md-button class="md-raised md-primary" @click="fillTable()">Fill Table</md-button>
        <md-button class="md-raised md-primary" @click="clearTable()">Clear Table</md-button>
      </md-card-content>
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>First Name</md-table-head>
            <md-table-head>Last Name</md-table-head>
            <md-table-head>Email</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-for="contact in contacts" :key="contact.firstName">
            <md-table-cell>{{contact.firstName}}</md-table-cell>
            <md-table-cell>{{contact.lastName}}</md-table-cell>
            <md-table-cell>{{contact.email}}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-card>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
  },
  data: function () {
    return {
      contacts: []
    }
  },
  methods: {
    fillTable() {
      this.contacts.push({ firstName: "Sebastian", lastName: "Eschweiler", email: "s.eschweiler@gmai.com" })
      this.contacts.push({ firstName: "David", lastName: "Clough", email: "dc@gmail.com" })
      this.contacts.push({ firstName: "Fred", lastName: "Flinstone", email: "f.flinstone@gmail.com" })
    },
    clearTable: function () {
      this.contacts.splice(0, this.contacts.length)
    }
  }
}
</script>

<style>
#app {
  margin: 60px 30px;
}
</style>
