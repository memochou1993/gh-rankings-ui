<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-text
        class="pa-0"
      >
        <div
          v-text="title"
          class="headline font-weight-light text-center py-4"
        />
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
                    class="title font-weight-regular"
                  >
                    <v-row>
                      <v-col
                        cols="4"
                        class="text-right"
                      >
                        {{ category }}
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-left"
                      >
                        Rank
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-right"
                      >
                        {{ type }}
                      </v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template
              v-for="(rank, i) in ranks"
            >
              <v-divider
                :key="`divider-${i}`"
              />
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
                          v-if="rank.tags.length === 2"
                        >
                          All
                        </span>
                        <span
                          v-for="(tag, i) in rank.tags"
                          :key="i"
                        >
                          <RankingTag
                            v-if="tag.includes('language')"
                            :content="tag.replace('language:', '')"
                          />
                          <RankingTag
                            v-if="tag.includes('location')"
                            :content="tag.replace('location:', '')"
                          />
                        </span>
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-left"
                      >
                        <span
                          v-if="rank.rank > rank.last"
                        >
                          -
                        </span>
                        <span
                          v-else
                        >
                          {{ `${rank.rank}/${rank.last}` }}
                        </span>
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-right"
                      >
                        <RankingTotalCount
                          :rank="rank"
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
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    ranks: {
      type: Array,
      required: true,
    },
  },
};
</script>
