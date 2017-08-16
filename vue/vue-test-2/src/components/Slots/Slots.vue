<<template>
  <div class='board'>
    <h1>{{title}}</h1>

    <named-slots>
      <h1 class="headfoot" slot="header">Here's the Header content</h1>
      <p>A paragraph for the main content.</p>
      <p>A paragraph for the main content.</p>
      <p>A paragraph for the main content.</p>
      <p class="headfoot" slot="footer">Here's some Footer content</p>
      <p>And another one.</p>
      <p>And another one.</p>
    </named-slots>
  </div>
</template>

<<script>
  import NamedSlots from '@/components/Slots/NamedSlots';

  export default {
    name: 'slots',
    props: {
    },
    data() {
      return {
        title: 'Named Slots and Default Slot'
      };
    },
    methods: {
    },
    computed: {
    },
    components: { NamedSlots }
  };
</script>

<style scoped lang="less">
  .headfoot {
    color: #050;
  }
</style>
