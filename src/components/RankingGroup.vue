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
                        <span
                          v-text="category"
                        />
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-left"
                      >
                        <span
                          v-text="'Rank'"
                        />
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-right"
                      >
                        <span
                          v-text="type"
                        />
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
                          <span
                            v-if="category === 'Language'"
                            v-text="'All'"
                          />
                          <span
                            v-if="category === 'Location'"
                            v-text="'Global'"
                          />
                        </span>
                        <span
                          v-for="(tag) in rank.tags"
                          :key="tag"
                        >
                          <span
                            v-if="tag.includes('language')"
                            v-text="tag.replace('language:', '')"
                          />
                          <span
                            v-if="tag.includes('location')"
                            v-text="tag.replace('location:', '')"
                          />
                        </span>
                      </v-col>
                      <v-col
                        cols="4"
                        class="text-left"
                      >
                        <span
                          v-if="rank.rank > rank.last"
                          v-text="'-'"
                        />
                        <span
                          v-else
                          v-text="`${rank.rank.toLocaleString()} / ${rank.last.toLocaleString()}`"
                        />
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
import RankingTotalCount from '@/components/RankingTotalCount';

export default {
  name: 'RankingGroup',
  components: {
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
