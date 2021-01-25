<template>
  <div>
    <v-card>
      <v-card-title
        v-text="title"
      />
      <v-card-text
        class="pa-0"
      >
        <v-list
          class="py-0"
        >
          <v-list-item-group>
            <template
              v-for="(rank, i) in ranks"
            >
              <v-list-item
                :key="i"
                :to="`/${rank.name}`"
              >
                <v-list-item-icon
                  class="my-2"
                >
                  <v-avatar
                    rounded
                  >
                    <v-img
                      :src="rank.imageUrl"
                      :alt="rank.name"
                    />
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${rank.rank}. ${rank.name}`"
                  />
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    :ripple="false"
                    text
                  >
                    <span
                      v-text="rank.totalCount.toLocaleString()"
                    />
                    <v-icon
                      v-text="getIcon(rank.tags)"
                      right
                    />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="i < ranks.length - 1"
                :key="`divider-${i}`"
              />
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    ranks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getIcon(tags) {
      switch (true) {
        case tags.join(',').includes('watchers'):
          return 'mdi-eye-outline';
        case tags.join(',').includes('stargazers'):
          return 'mdi-star';
        case tags.join(',').includes('forks'):
          return 'mdi-source-fork';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list {
  .v-btn {
    cursor: inherit;
  }
  .v-btn::before {
    background-color: transparent !important;
  }
}
</style>
