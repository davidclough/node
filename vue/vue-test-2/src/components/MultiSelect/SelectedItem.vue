<<template>
  <div class='selected-item' :value='value'>
    <span>{{ text }}</span>
    <span @click.self="deselectItem" class='deselect-button'>X</span>
  </div>
</template>

<<script>
export default {
  name: 'selected-item',
  data() {
    return {
    };
  },
  props: {
    value: {
      // type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    deselectItem: function () {
      this.$emit('itemDeselected', { value: this.value, text: this.text });
    }
  }
};
</script>

<style scoped lang='less'>
  .selected-item {
    display: inline-block;
    display: relative;
    margin: 2px 0 0 2px;
    border: 1px solid #888;
    padding: 2px;
    background-color: #eee;
    border-radius: 4px;

    .deselect-button {
      color: aaa;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        color: #a00;
      }
    }
  }
</style>
