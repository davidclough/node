<<template>
  <div class='butt0-counter'>
    <h1>{{ title }}</h1>
    <p>{{ total }}</p>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
  </div>
</template>

<<script>
import CountingButton from '@/components/ButtonCounter/CountingButton';

export default {
  name: 'button-counter',
  props: {
  },
  data() {
    return {
      title: 'Counter Event Example',
      total: 0
    };
  },
  methods: {
    incrementTotal: function () {
      this.total += 1;
    }
  },
  computed: {
  },
  components: { CountingButton }
};
</script>

<style scoped>
</style>
