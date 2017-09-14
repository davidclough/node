<template>
  <div class='butt0-counter'>
    <h1>{{ title }}</h1>
    <p>{{ total }}</p>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    <counting-button v-on:increment="incrementTotal"></counting-button>
    
    <multi-select />
  </div>
</template>

<<script>
import CountingButton from '@/components/ButtonCounter/CountingButton';
import MultiSelect from '@/components/MultiSelect/MultiSelect';

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
  components: { CountingButton, MultiSelect }
};
</script>

<style scoped>
</style>
