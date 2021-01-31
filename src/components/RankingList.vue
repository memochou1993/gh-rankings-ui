<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-text
        class="pa-0"
      >
        <div
          class="headline font-weight-light text-center py-4"
          v-text="title"
        />
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
                class="body-1 font-weight-light"
              >
                <v-list-item-icon
                  class="my-2"
                >
                  <v-avatar
                    rounded
                  >
                    <v-img
                      :alt="rank.name"
                      :src="rank.imageUrl"
                      lazy-src="@/assets/avatar.jpg"
                    />
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${rank.rank}. ${rank.name}`"
                  />
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
  </div>
</template>

<script>
import RankingTotalCount from '@/components/RankingTotalCount';

export default {
  name: 'RankingList',
  components: {
    RankingTotalCount,
  },
  props: {
    ranks: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
