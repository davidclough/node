<<template>
  <div class='users'>
    <form v-on:submit.prevent='addUser'>
      <input type='text' v-model='newUser.name' placeholder='Name of new user' /><br />
      <input type='text' v-model='newUser.email' placeholder='Email of new user' /><br />
      <input type='submit' text='Add New User' />
    </form>
    <ul>
      <li v-for='user in users'>
        <input type='checkbox' v-model='user.contacted' />
        <span :class='{contacted: user.contacted}'>
          {{user.name}}: {{user.email}}
        </span>
        <button v-on:click='deleteUser(user)'>X</button>
      </li>
    </ul>
  </div>
</template>

<<script>
export default {
  name: 'users',
  props: {
  },
  data() {
    return {
      newUser: {},
      users: [
        // {
        //   name: 'Rupert Bear',
        //   email: 'r@b.com',
        //   contacted: false
        // },
        // {
        //   name: 'Bill Badger',
        //   email: 'b@b.com',
        //   contacted: false
        // },
        // {
        //   name: 'Edward Elephant',
        //   email: 'e@e.com',
        //   contacted: false
        // }
      ]
    }
  },
  methods: {
    addUser: function (e) {
      // e.preventDefault();
      this.users.push({
        name: this.newUser.name,
        email: this.newUser.email,
        contacted: false
      });
    },
    deleteUser: function (user) {
      this.users.splice(this.users.indexOf(user), 1);
    }
  },
  created: function () {
    this.$http.get('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        // OBSERVATION: If do this on this.users, after setting that, the toggling does not work.
        response.data.forEach(function (user) {
          user.contacted = false;
        });

        this.users = response.data;
        // this.users = response.data.concat(response.data).concat(response.data);
      });
  }
}
</script>

<style scoped>
  .contacted {
    text-decoration: line-through;
  }
</style>
