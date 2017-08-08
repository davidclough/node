<<template>
  <div class='test'>
    <h1>{{title}}</h1>
    <input type='text' v-model='title' />
    <input type='checkbox' v-model='showUser' />
    <p v-if="showUser">{{user.firstName}}</p>
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

<<script>
export default {
  name: 'test',
  props: {
    msg: {
      type: String,
      default: 'Foobar'
    }
  },
  data() {
    let meat = 'Meat', potatoes = 'Potatoes';

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
    }
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
    }
  },
  computed: {
    // this in arrow functions is bound to the parent context, not the object we are currently in.
    ////fullName: () => this.user.firstName + ' ' + this.user.lastName
    fullName: function () { return this.user.firstName + ' ' + this.user.lastName; }
  }
}
</script>

<style scoped>

</style>
