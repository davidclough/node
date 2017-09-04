<<template>
  <div id="example-8">
    <div>
      <h1>{{title}}</h1>
    </div>

    <input v-model.number="firstNumber" type="number" step="20"> +
    <input v-model.number="secondNumber" type="number" step="20"> =
    {{ result }}
    <p>
      <animated-integer v-bind:value="firstNumber"></animated-integer> +
      <animated-integer v-bind:value="secondNumber"></animated-integer> =
      <animated-integer v-bind:value="result"></animated-integer>
    </p>
  </div>  
</template>

<<script>
  import AnimatedInteger from '@/components/Animations/AnimatedInteger';

  export default {
    name: 'state-transitions',
    props: {
    },
    data() {
      return {
        title: 'State Transitions',
        firstNumber: 20,
        secondNumber: 40
      };
    },
    methods: {
    },
    computed: {
      result: function () {
        return this.firstNumber + this.secondNumber;
      }
    },
    components: {
      AnimatedInteger
    }
  };
</script>

<style scoped lang="less">
</style>
