<template>
  <v-fade-transition>
    <v-btn
      v-show="showScrollToTop"
      class="scroll-gradient"
      dark
      fab
      right
      bottom
      color="indigo darken-3"
      fixed
      elevation="10"
      @click="top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        class="v-icon__svg"
      >
        <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
      </svg>
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
    showScrollToTop() {
      return this.scrollHeight > 400;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) return;
      if (Math.abs(currentScrollPosition - this.scrollHeight) < 60) return;
      this.scrollHeight = currentScrollPosition;
    },
  },
};
</script>

<style scoped>
.scroll-gradient {
  background-image: linear-gradient(to right bottom, #061D30, #2C4C68);
}
</style>
