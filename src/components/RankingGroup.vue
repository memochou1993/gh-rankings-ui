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
          <v-list-item
            :ripple="false"
            inactive
          >
            <v-list-item-content>
              <v-list-item-title
                class="title font-weight-regular"
              >
                <v-row>
                  <v-col
                    :cols="4"
                    class="text-right"
                  >
                    <span
                      v-text="category"
                    />
                  </v-col>
                  <v-col
                    :cols="4"
                    class="text-left"
                  >
                    <span
                      v-text="'Rank'"
                    />
                  </v-col>
                  <v-col
                    :cols="4"
                    class="text-right"
                  >
                    <span
                      v-text="field"
                    />
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <template
            v-for="(rank, i) in filter(sort(ranks))"
          >
            <v-divider
              :key="`divider-${i}`"
            />
            <v-list-item
              :key="i"
            >
              <v-list-item-content
                @click="search(rank)"
              >
                <v-list-item-title
                  class="body-1 font-weight-light"
                >
                  <v-row>
                    <v-col
                      :cols="4"
                      class="text-right"
                    >
                      <RankingTag
                        :rank="rank"
                      />
                    </v-col>
                    <v-col
                      :cols="4"
                      class="text-left"
                    >
                      <RankingRank
                        :rank="rank"
                      />
                    </v-col>
                    <v-col
                      :cols="4"
                      class="text-right"
                    >
                      <RankingRepositoryMenu
                        v-if="rank.language !== '' && rank.field.includes('repositories')"
                        :rank="rank"
                        :profile="profile"
                      />
                      <RankingItemCount
                        v-else
                        :field="rank.field"
                        :item-count="rank.itemCount"
                      />
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import fields from '@/assets/field';
import RankingItemCount from '@/components/RankingItemCount';
import RankingRank from '@/components/RankingRank';
import RankingRepositoryMenu from '@/components/RankingRepositoryMenu';
import RankingTag from '@/components/RankingTag';
import RankingTitle from '@/components/RankingTitle';

export default {
  name: 'RankingGroup',
  components: {
    RankingItemCount,
    RankingRank,
    RankingRepositoryMenu,
    RankingTag,
    RankingTitle,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    ranks: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    field() {
      switch (true) {
        case this.title.includes(fields.followers.text):
          return fields.followers.text;
        case this.title.includes(fields.stars.text):
          return fields.stars.text;
        case this.title.includes(fields.forks.text):
          return fields.forks.text;
        case this.title.includes(fields.watchers.text):
          return fields.watchers.text;
        default:
          return '';
      }
    },
  },
  methods: {
    sort(ranks) {
      return ranks.sort((a, b) => {
        const value = (rank) => (rank.location === '' ? 1 : Number(!rank.location.includes(', ')) - 1);
        return value(b) - value(a);
      });
    },
    filter(ranks) {
      return ranks.filter((rank) => rank.language === '' || rank.itemCount > 0);
    },
    reset() {
      this.$store.commit('setRanks', []);
      this.$store.commit('setQuery', {
        ...this.$route.query,
        type: '',
        field: '',
        language: '',
        location: '',
        name: '',
      });
    },
    search(rank) {
      this.reset();
      const query = {
        type: rank.type,
        field: rank.field,
        language: rank.language,
        location: rank.location,
      };
      Object.entries(query).forEach(([key, val]) => !val && delete query[key]);
      this.$router.push({
        name: 'home',
        query,
      });
    },
  },
};
</script>
