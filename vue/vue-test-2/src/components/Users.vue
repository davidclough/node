<<template>
  <div class='users'>
    <form v-on:submit.prevent='addUser'>
      <input type='text' v-model='newUser.name' placeholder='Name of new user' /><br />
      <input type='text' v-model='newUser.email' placeholder='Email of new user' /><br />
      <input type='submit' text='Add New User' />
    </form>
    <ul>
    <transition-group v-on:enter="enterSlidily" v-on:leave="leaveSlidily" v-bind:css="false"
                      appear appear-active-class="custom-appear-class">
      <li v-for='user in users' :key='user.name'>
        <input type='checkbox' v-model='user.contacted' />
        <span :class='{contacted: user.contacted}'>
          {{user.name}}: {{user.email}}
        </span>
        <button v-on:click='deleteUser(user)'>X</button>
      </li>
    </transition-group>
    </ul>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';

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
    };
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
    },
    enterSlidily: function (el, done) {
      Velocity(el, 'slideDown', { duration: 1000, easing: 'easeInSine', complete: done });
    },
    leaveSlidily: function (el, done) {
      Velocity(el, 'slideUp', { complete: done });
    }
  },
  created: function () {
    this.$http.get('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        // OBSERVATION: If do this on this.users, after setting that, the toggling does not work.
        response.data.forEach((user) => {
          user.contacted = false;
        });

        this.users = response.data;
        // this.users = response.data.concat(response.data).concat(response.data);
      });
  }
};
</script>

<style scoped>
  .contacted {
    text-decoration: line-through;
  }
  .custom-appear-class {
    color: crimson;
  }
</style>
