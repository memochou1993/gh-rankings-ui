<template>
  <div>
    <v-card
      :elevation="0"
    >
      <v-card-title
        v-text="title"
        class="pb-0 headline"
      />
      <v-card-text
        class="px-0"
      >
        <v-list
          class="py-0"
        >
          <v-list-item-group>
            <template>
              <v-list-item
                :ripple="false"
                inactive
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="title font-weight-light"
                  >
                    <v-row>
                      <v-col
                        cols="4"
                        class="text-center"
                      >
                        Rank
                      </v-col>
                      <v-col
                        cols="8"
                        class="text-center"
                      >
                        Tags
                      </v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                  style="width: 120px"
                  class="title font-weight-light text-right"
                >
                  <v-row>
                    <v-col
                      class="text-right"
                    >
                      Total Count
                    </v-col>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </template>
            <template
              v-for="(rank, i) in ranks"
            >
              <v-list-item
                :key="i"
                :ripple="false"
                inactive
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="title font-weight-light"
                  >
                    <v-row>
                      <v-col
                        cols="4"
                        class="text-right"
                      >
                        <span
                          v-if="rank.rank > rank.last"
                        >
                          N/A
                        </span>
                        <span
                          v-else
                        >
                          {{ `${rank.rank}/${rank.last}` }}
                        </span>
                      </v-col>
                      <v-col
                        cols="8"
                      >
                        <RankingTag
                          v-if="isGists(rank.tags)"
                          :content="'Gists'"
                        />
                        <RankingTag
                          v-if="isRepositories(rank.tags)"
                          :content="'Repositories'"
                        />
                        <RankingTag
                          v-if="getLocation(rank.tags)"
                          :content="getLocation(rank.tags)"
                        />
                        <RankingTag
                          v-if="getLanguage(rank.tags)"
                          :content="getLanguage(rank.tags)"
                        />
                      </v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                  style="width: 120px"
                  class="text-right"
                >
                  <v-row>
                    <v-col
                      class="text-right"
                    >
                      <RankingTotalCount
                        :rank="rank"
                      />
                    </v-col>
                  </v-row>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import RankingTag from '@/components/RankingTag';
import RankingTotalCount from '@/components/RankingTotalCount';

export default {
  name: 'RankingGroup',
  components: {
    RankingTag,
    RankingTotalCount,
  },
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
    isGists(tags) {
      return tags.find((tag) => tag.includes('gists'));
    },
    isRepositories(tags) {
      return tags.find((tag) => tag.includes('repositories'));
    },
    getLocation(tags) {
      return tags.find((tag) => tag.includes('location'))?.replace('location:', '');
    },
    getLanguage(tags) {
      return tags.find((tag) => tag.includes('language'))?.replace('language:', '');
    },
  },
};
</script>
