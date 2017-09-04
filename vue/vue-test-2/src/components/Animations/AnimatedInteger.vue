<<template>
  <span>{{ tweeningValue }}</span>
</template>

<<script>
// https://vuejs.org/v2/guide/transitioning-state.html#Organizing-Transitions-into-Components

// npm install --save tween
// import TWEEN from 'tween';
// npm install tween.js@16.3.4
import TWEEN from 'tween.js';

export default {
  name: 'animated-integer',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue);
    }
  },
  mounted: function () {
    this.tween(0, this.value);
  },
  methods: {
    tween: function (startValue, endValue) {
      const vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();
      animate();
    }
  }
};
</script>

<style scoped>
</style>
