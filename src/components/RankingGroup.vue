<template>
  <div>
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
                        :cols="4"
                        class="text-right"
                      >
                        <span
                          v-if="rank.tags.length < 3"
                          v-text="'Global'"
                        />
                        <template
                          v-for="(tag) in rank.tags"
                        >
                          <span
                            v-if="tag.includes('language')"
                            :key="tag"
                            v-text="tag.replace('language:', '')"
                          />
                          <span
                            v-if="tag.includes('location')"
                            :key="tag"
                            v-text="tag.replace('location:', '')"
                          />
                        </template>
                      </v-col>
                      <v-col
                        :cols="4"
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
                        :cols="4"
                        class="text-right"
                      >
                        <RankingCount
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
import fields from '@/assets/field';
import RankingCount from '@/components/RankingCount';
import RankingTitle from '@/components/RankingTitle';

export default {
  name: 'RankingGroup',
  components: {
    RankingCount,
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
};
</script>
