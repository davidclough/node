<<template>
  <div class='test'>
    <h1>{{title}}</h1>
    <input type='text' v-model='title' />
    <input type='checkbox' v-model='showUser' />
    <!-- <transition name="fade">
      <p v-if="showUser">{{user.firstName}}</p>
    </transition> -->
    <transition name="slide">
      <div class='sausages' v-if="showUser">{{user.firstName}}{{user.firstName}}</div>
    </transition>
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
    const [meat, potatoes] = [']Meat', 'Potatoes'];

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
    };
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
    // fullName: () => this.user.firstName + ' ' + this.user.lastName
    fullName: function () { return `${this.user.firstName} ${this.user.lastName}`; }
  }
};
</script>

<style scoped lang='less'>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .sausages {
    overflow: hidden;
  }
  .slide-enter-active {
    transition: all 0.3s;// ease;
  }
  .slide-leave-active {
    transition: all 0.3s;// cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-enter, .slide-leave-to {
    height: 0;
  }  
  .slide-leave, .slide-enter-to {
    height: 18px;   // Problem is this is a hard-coded height.
  }  






  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }  
</style>
