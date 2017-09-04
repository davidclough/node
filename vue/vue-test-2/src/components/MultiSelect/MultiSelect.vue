<<template>
  <div class='multi-select'>
    <div class='selected-container' @click.self='toggleItemSelectorVisibility'>
      <selected-item v-for='selected in selectedItems' 
                     :value='selected.value' :text='selected.text' 
                     @itemDeselected='itemDeselected' />
    </div>

    <!-- <transition v-on:enter="enterSlidily" v-on:leave="leaveSlidily"> -->
    <!-- <transition name='fade'> -->
    <transition v-on:enter="enterFadily" v-on:leave="leaveFadily">
      <select size='5' v-model='selectedItem' v-if='isItemSelectorVisible' @keyup.27='isItemSelectorVisible = false'>
        <option v-for='item in listItems' :value='{ value: item.value }'
                @click.self='selectValue'>{{ item.text }}</option>
      </select>
    </transition>
  </div>
</template>

<<script>
  import SelectedItem from '@/components/MultiSelect/SelectedItem';
  import Velocity from 'velocity-animate';

  export default {
    name: 'multi-select',
    props: {
    },
    data() {
      return {
        selectedItem: {
          value: 0
        },
        isItemSelectorVisible: false,
        allItems: [
          { value: 1, text: 'aaa' },
          { value: 2, text: 'bbb' },
          { value: 3, text: 'ccc' },
          { value: 4, text: 'ddd' },
          { value: 5, text: 'eee' },
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
        this.isItemSelectorVisible = false;
      },
      deselectValue: function (value) {
        const index = this.selectedValues.indexOf(value);
        this.selectedValues.splice(index, 1);
      },
      toggleItemSelectorVisibility: function () {
        this.isItemSelectorVisible = !this.isItemSelectorVisible;
      },

      enterSlidily: function (el, done) {
        Velocity(el, 'slideDown', { complete: function () {
          el.focus();
          done();
        } });
      },
      leaveSlidily: function (el, done) {
        Velocity(el, 'slideUp', { complete: done });
      },

      enterFadily: function (el, done) {
        Velocity(el, 'fadeIn', { complete: function () {
          // alert('Done animating the scale property.');
          el.focus();
          done();
        } });
      },
      leaveFadily: function (el, done) {
        Velocity(el, 'fadeOut', { complete: done });
      }
    },
    computed: {
      listItems: function () {
        // Of course this is rubbish. We are not overly interested in this
        // side of things at the moment.
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
    text-align: left;
    background-color: #b00;
    position: relative;

    > select {
      width: 100%;
      overflow-y: auto;
      position: absolute;
      // bottom: 0;
    }

    .selected-container {
      position: absolute;
      padding: 0 0 2px 2px;
      background-color: #0b0;
      width: 100%;
      min-height: 22px;
    }



    // The advantage of using Velocity over CSS transitions is we can make it do something at the end, e.g. focus on element.
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
