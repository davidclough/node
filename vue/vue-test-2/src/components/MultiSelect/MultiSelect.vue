<<template>
  <div class='multi-select'>
    <select size='5' v-model='selectedItem'>
      <option v-for='item in listItems' :value='{ value: item.value }'
              @click.self='selectValue'>{{ item.text }}</option>
    </select>
    <div class='selected-container'>
      <selected-item v-for='selected in selectedItems' 
                     :value='selected.value' :text='selected.text' 
                     @itemDeselected='itemDeselected' />
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
        selectedItem: {
          value: 0
        },
        allItems: [
          { value: 1, text: 'aaa' },
          { value: 2, text: 'bbb' },
          { value: 3, text: 'ccc' },
          { value: 5, text: 'eee' },
          { value: 4, text: 'ddd' },
          { value: 6, text: 'fff' },
          { value: 7, text: 'ggg' }
        ],
        selectedValues: [1, 3]
      };
    },
    methods: {
      itemDeselected: function (evt) {
        this.deselectValue(evt.value);
      },
      selectValue: function () {
        // Provide a model for the <select> and give the <option>s a value with same structure.
        // https://jsfiddle.net/cfks5npw/1/
        this.selectedValues.push(this.selectedItem.value);
      },
      deselectValue: function (value) {
        const index = this.selectedValues.indexOf(value);
        this.selectedValues.splice(index, 1);
      }
    },
    computed: {
      listItems: function () {
        return this.allItems
                   .filter(x => this.selectedValues.indexOf(x.value) === -1)
                   .sort((x, y) => (x.text < y.text ? -1 : 1));
      },
      selectedItems: function () {
        return this.allItems.filter(x => this.selectedValues.indexOf(x.value) > -1);
      }
    },
    components: { SelectedItem }
  };
</script>

<style scoped lang='less'>
  .multi-select {
    width: 200px;
    box-sizing: border-box;
    text-align: left;
    background-color: #b00;
    position: relative;

    > select {
      width: 100%;
    }

    .selected-container {
      padding: 0 0 2px 2px;
      background-color: #0b0;
      width: 100%;
      min-height: 22px;
    }
  }
</style>
