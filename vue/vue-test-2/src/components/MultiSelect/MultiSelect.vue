<<template>
  <div class='butt0-counter'>
    <p>{{ total }}</p>
    <select size='5'>
      <option v-for='item in listItems' value='item.value'>{{ item.text }}</option>
    </select>
    <div v-for='selected in selectedValues'>
      <selected-item v-on:increment="incrementTotal" />
    </div>
  </div>
</template>

<<script>
  import SelectedItem from '@/components/MultiSelect/SelectedItem';

  export default {
    name: 'multi-select',
    props: {
    },
    data() {
      return {
        listItems: [
          { value: 1, text: 'aaa' },
          { value: 2, text: 'bbb' },
          { value: 3, text: 'ccc' },
          { value: 4, text: 'ddd' },
          { value: 5, text: 'eee' },
          { value: 6, text: 'fff' },
          { value: 7, text: 'ggg' }
        ],
        selectedValues: [1, 3],
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
    components: { SelectedItem }
  };
</script>

<style scoped lang="less">
</style>
