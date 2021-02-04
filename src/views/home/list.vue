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
              :key="i"
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
                <RankingCount
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
import fields from '@/assets/field';
import types from '@/assets/type';
import RankingAvatar from '@/components/RankingAvatar';
import RankingCount from '@/components/RankingCount';
import RankingTitle from '@/components/RankingTitle';

export default {
  name: 'RankingList',
  components: {
    RankingAvatar,
    RankingCount,
    RankingTitle,
  },
  computed: {
    type() {
      return Object
        .values(types)
        .find((type) => type.value === this.$store.state.query.type);
    },
    field() {
      return Object
        .values(fields)
        .find((field) => field.value === this.$store.state.query.field);
    },
    title() {
      const type = this.type.text;
      const field = this.field.text.replace('Repo', 'Repository');
      return `${type} ${field} Ranking`;
    },
  },
};
</script>
