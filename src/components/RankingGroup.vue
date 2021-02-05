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
                      <RankingItemCount
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
</template>

<script>
import fields from '@/assets/field';
import RankingItemCount from '@/components/RankingItemCount';
import RankingTag from '@/components/RankingTag';
import RankingTitle from '@/components/RankingTitle';
import RankingRank from '@/components/RankingRank';

export default {
  name: 'RankingGroup',
  components: {
    RankingItemCount,
    RankingTag,
    RankingTitle,
    RankingRank,
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
