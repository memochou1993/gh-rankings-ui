<template>
  <v-fade-transition>
    <v-btn
      v-show="!hidden"
      bottom
      dark
      fab
      fixed
      right
      class="scroll-btn primary"
      :class="sticky"
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
      return this.scrollHeight <= 400;
    },
    sticky() {
      const pageScrollHeight = document.body.scrollHeight - window.innerHeight;
      return Math.abs(pageScrollHeight - this.scrollHeight) < 160 ? 'mb-10' : '';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
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
      if (scrollTop < 0) return;
      if (Math.abs(scrollTop - this.scrollHeight) < 60) return;
      this.setScrollHeight(scrollTop);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-btn {
  transition: margin-bottom .2s ease;
}
.primary {
  background-image: linear-gradient(to right, #2C4C68, #2C4C68);
}
</style>
