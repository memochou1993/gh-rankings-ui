<template>
  <v-list
    class="py-0"
  >
    <v-list-item-group
      v-model="selections"
      multiple
    >
      <template
        v-for="(repository, i) in repositories"
      >
        <v-list-item
          :key="i"
          class="body-1 font-weight-light"
          @click="explore(repository)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ repository.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <RankingItemCount
              :field="field"
              :item-count="repository[field].totalCount"
            />
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="i < repositories.length - 1"
          :key="`divider-${i}`"
        />
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import {
  open,
} from '@/helpers';
import RankingItemCount from '@/components/RankingItemCount';

export default {
  name: 'RankingListRepository',
  components: {
    RankingItemCount,
  },
  props: {
    rank: {
      type: Object,
      required: true,
    },
    profile: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selections: [],
  }),
  computed: {
    field() {
      return this.rank.field.split('.').pop();
    },
    repositories() {
      return this.profile.repositories
        .filter((repository) => repository.primaryLanguage.name === this.rank.language)
        .filter((repository) => repository[this.field].totalCount > 0)
        .sort((a, b) => b[this.field].totalCount - a[this.field].totalCount);
    },
  },
  watch: {
    selections(after) {
      if (after.length > 0) {
        this.setSelections([]);
      }
    },
  },
  methods: {
    setSelections(selections) {
      this.selections = selections;
    },
    explore(repository) {
      open(`https://github.com/${this.$route.params.name}/${repository.name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  cursor: inherit;
}
.v-btn::before {
  background-color: transparent;
}
</style>
