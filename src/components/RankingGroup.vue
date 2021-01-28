<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-title
        v-text="title"
        class="font-weight-light"
      />
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
                <v-list-item-content>
                  <v-list-item-title
                    class="title font-weight-light text-right"
                  >
                    <v-row>
                      <v-col
                        cols="4"
                      >
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
                        cols="8"
                        class="title font-weight-light text-left"
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
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
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
};
</script>

<style lang="scss" scoped>
.v-list-item__action {
  width: 120px;
}
</style>
