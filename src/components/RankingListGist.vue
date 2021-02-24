<template>
  <v-list
    class="py-0"
  >
    <v-list-item-group
      v-model="selections"
      multiple
    >
      <template
        v-for="(gist, i) in gists"
      >
        <v-list-item
          :key="i"
          class="body-1 font-weight-light"
          @click="explore(gist)"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="((gist.files || [])[0] || {}).name || gist.name"
            />
          </v-list-item-content>
          <v-list-item-action>
            <RankingItemCount
              :field="field"
              :item-count="gist[field].totalCount"
            />
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="i < gists.length - 1"
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
  name: 'RankingListGist',
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
    gists() {
      return this.profile.gists
        .filter((gist) => gist[this.field].totalCount > 0)
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
    explore(gist) {
      open(`https://gist.github.com/${this.profile.login}/${gist.name}`);
    },
  },
};
</script>
