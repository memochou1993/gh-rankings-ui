<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        xs="12"
        sm="3"
      >
        <v-card
          :elevation="5"
        >
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
        <v-card
          :elevation="5"
        >
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
                      <RankingTotalCount
                        :rank="rank"
                      />
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
import RankingTotalCount from '@/components/RankingTotalCount';

export default {
  name: 'RankingProfile',
  components: {
    RankingTotalCount,
  },
  props: {
    ranks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return this.ranks[0]?.imageUrl || '';
    },
    name() {
      return this.ranks[0]?.name || '';
    },
  },
};
</script>
