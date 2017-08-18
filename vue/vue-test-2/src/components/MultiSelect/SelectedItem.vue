<<template>
  <button v-on:click="incrementCounter">{{ counter }}</button>
</template>

<<script>
export default {
  name: 'selected-item',
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      this.$emit('increment');
    }
  }
};
</script>

<style scoped lang="less">
</style>
