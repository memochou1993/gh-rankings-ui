<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        xs="12"
        sm="3"
      >
        <v-card>
          <v-card-title
            class="headline"
          >
            <v-avatar
              rounded
              size="100%"
            >
              <v-img
                :src="imageUrl"
                :alt="name"
              />
            </v-avatar>
          </v-card-title>
          <v-card-text>
            <div
              class="title text-center"
            >
              {{ name }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        xs="12"
        sm="9"
      >
        <v-card>
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
                    :ripple="false"
                    inactive
                  >
                    <v-list-item-icon
                      class="my-2"
                    />
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="`${rank.rank}/${rank.last}`"
                        class="title"
                      />
                      {{ rank.tags }}
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
                          right
                          v-text="getIcon(rank.tags)"
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    ranks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return this.ranks[0]?.imageUrl;
    },
    name() {
      return this.ranks[0]?.name;
    },
  },
  methods: {
    getIcon(tags) {
      switch (true) {
        case tags.join(',')
          .includes('followers'):
          return 'mdi-account-supervisor';
        case tags.join(',')
          .includes('watchers'):
          return 'mdi-eye-outline';
        case tags.join(',')
          .includes('stargazers'):
          return 'mdi-star';
        case tags.join(',')
          .includes('forks'):
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
