<<template>
  <div class='board'>
    <h1>{{title}}</h1>
    <!-- <noughts-and-crosses-board-row v-for='row in rows' :squares='row' class='row' /> -->
    <noughts-and-crosses-board-row v-for='row in rows.length' :squares='rows[row-1]' v-bind:data-row='row - 1' v-bind:key='"row" + row'
                                   v-bind:rowNumber='row' class='row' />
  </div>
</template>

<<script>
import NoughtsAndCrossesBoardRow from '@/components/NoughtsAndCrosses/NoughtsAndCrossesBoardRow';

export default {
  name: 'noughts-and-crosses-board',
  props: {
  },
  data() {
    return {
      title: 'Noughts and Crosses',
      rows: [
        [null, 'X', 'O'],
        [null, null, 'X'],
        ['X', null, null]
      ]
    };
  },
  methods: {
    // greet: function (greeting) {
    //   alert(greeting);
    // },
    // press: function (e) {
    //   console.log(e.target.value);
    // },
    // enterHit: function (e) {
    //   console.log('enterHit');
    // }
  },
  computed: {
    // this in arrow functions is bound to the parent context, not the object we are currently in.
    // fullName: () => this.user.firstName + ' ' + this.user.lastName
    // fullName: function () { return this.user.firstName + ' ' + this.user.lastName; }
  },
  components: { NoughtsAndCrossesBoardRow }
};
</script>

<style scoped>
  .board {
    margin: 0 auto;
  }
  .row {
    border: 0 solid #999;
    border-width: 4px 0;
  }
  .row:first-of-type {
    border-top: none;
  }
  .row:last-of-type {
    border-bottom: none;
  }
</style>
