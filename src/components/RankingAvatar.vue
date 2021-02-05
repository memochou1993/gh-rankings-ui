<template>
  <v-avatar
    :size="size"
    rounded
  >
    <v-img
      :aspect-ratio="1"
      :src="src"
      class="grey lighten-2"
    >
      <template
        v-slot:placeholder
      >
        <v-row
          align="center"
          justify="center"
          class="fill-height ma-0"
        >
          <v-progress-circular
            :indeterminate="!loaded"
            :width="1"
            color="grey lighten-4"
          />
        </v-row>
      </template>
    </v-img>
  </v-avatar>
</template>

<script>
export default {
  name: 'RankingAvatar',
  props: {
    alt: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: '48',
    },
    src: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loaded: false,
  }),
  mounted() {
    setTimeout(() => {
      this.setLoaded(true);
    }, 1000);
  },
  methods: {
    setLoaded(loaded) {
      this.loaded = loaded;
    },
  },
};
</script>
