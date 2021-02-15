<template>
  <v-card
    :elevation="5"
  >
    <v-card-text
      class="pa-0"
    >
      <RankingTitle
        :title="title"
      />
      <v-list
        class="py-0"
      >
        <v-list-item-group>
          <template
            v-for="(rank, i) in $store.state.ranks"
          >
            <v-list-item
              :key="rank.name"
              :to="`/${rank.name}`"
              class="body-1 font-weight-light"
            >
              <v-list-item-icon
                class="my-2"
              >
                <RankingAvatar
                  :alt="rank.name"
                  :src="rank.imageUrl"
                />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="`${rank.rank}. ${rank.name}`"
                />
              </v-list-item-content>
              <v-list-item-action>
                <RankingItemCount
                  :rank="rank"
                />
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="i < $store.state.ranks.length - 1"
              :key="`divider-${i}`"
            />
          </template>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  types,
  fields,
} from '@/assets';
import RankingAvatar from '@/components/RankingAvatar';
import RankingItemCount from '@/components/RankingItemCount';
import RankingTitle from '@/components/RankingTitle';

export default {
  name: 'AppRanking',
  components: {
    RankingAvatar,
    RankingItemCount,
    RankingTitle,
  },
  computed: {
    type() {
      const finder = (type) => type.value === this.$store.state.query.type;
      return Object.values(types).find(finder).title;
    },
    field() {
      const finder = (field) => field.value === this.$store.state.query.field;
      return Object.values(fields).find(finder).title;
    },
    title() {
      return `${this.type} ${this.field} Ranking`;
    },
  },
};
</script>
