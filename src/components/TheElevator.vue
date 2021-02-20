<template>
  <v-fade-transition>
    <v-btn
      v-show="!hidden"
      :class="['primary-gradient', 'scroll', sticky]"
      bottom
      dark
      fab
      fixed
      right
      small
      @click="scroll"
    >
      <v-icon>
        mdi-arrow-up
      </v-icon>
    </v-btn>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'TheElevator',
  data: () => ({
    scrollHeight: 0,
  }),
  computed: {
    hidden() {
      return this.scrollHeight < 400;
    },
    sticky() {
      return Math.abs(document.body.scrollHeight - window.innerHeight - this.scrollHeight) < 40 ? 'mb-10' : '';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    setScrollHeight(scrollHeight) {
      this.scrollHeight = scrollHeight;
    },
    scroll() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this.setScrollHeight(scrollTop);
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  transition: margin .2s ease;
}
</style>
