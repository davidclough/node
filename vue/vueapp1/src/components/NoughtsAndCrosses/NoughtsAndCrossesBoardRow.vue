<<template>
  <div class='row'>
    <!-- <h1>{{title}}</h1> -->
    <ul class='squares'>
      <li v-for='i in squares.length' v-bind:key='"square" + rowNumber + i'
          v-bind:id='"square" + rowNumber + i' v-on:click='enterHit'>
        <span>{{squares[i - 1]}}</span>
        <input type='hidden' v-model:value='squares[i - 1]' />
      </li>
    </ul>
  </div>
</template>

<<script>
export default {
  name: 'noughts-and-crosses-board-row',
  props: {
    squares: {
      type: Array,
      default: () => [null, null, null]
    },
    rowNumber: {
      type: Number
    }
  },
  data() {
    return {
      title: 'Noughts and Crosses Row',
      // pieces: [
      //   null, 'X', 'O'
      // ]
    }
  },
  methods: {
    enterHit: function (e) {
      this.squares[0] = 'X';
      //console.log('enterHit');
    }
  }
}
</script>

<style scoped lang="less">
  .row {
    display: inline-block; 
    /*float: left;
    clear: both;*/
  }
  .squares {
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      list-style: none;
      border: 0 solid #999;
      border-width: 0 4px;
      width: 25vw;
      height: 25vh;
      text-align: central;
      line-height: 25vh;
      font-size: 22vh;
      font-weight: bold;
      /* https://stackoverflow.com/questions/4053575/inline-block-element-with-no-text-renders-differently */
      vertical-align: bottom;
      
      &:first-of-type {
        border-left: none;
      }
      &:last-of-type {
        border-right: none;
      }
    }
  }
</style>
