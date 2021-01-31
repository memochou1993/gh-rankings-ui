<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-text
        class="text-center"
      >
        <div
          class="title text--primary pointer"
        >
          <span
            v-text="'Search'"
          />
          <v-select
            v-model="type"
            :items="types"
            dense
            flat
            hide-details
            solo
            class="font-weight-light"
          />
          <v-select
            v-model="field"
            :items="fields"
            dense
            flat
            hide-details
            solo
            class="font-weight-light"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const TYPE_USER = 'user';
const TYPE_ORGANIZATION = 'organization';
const TYPE_REPOSITORY = 'repository';
const FIELD_FOLLOWERS = 'followers';
const FIELD_REPOSITORIES_STARGAZERS = 'repositories.stargazers';
const FIELD_REPOSITORIES_FORKS = 'repositories.forks';
const FIELD_REPOSITORIES_WATCHERS = 'repositories.watchers';
const FIELD_GISTS_STARGAZERS = 'gists.stargazers';
const FIELD_GISTS_FORKS = 'gists.forks';
const FIELD_STARGAZERS = 'stargazers';
const FIELD_FORKS = 'forks';
const FIELD_WATCHERS = 'watchers';

export default {
  name: 'RankingSearch',
  data: () => ({
    type: TYPE_USER,
    types: [
      { text: 'User', value: TYPE_USER },
      { text: 'Organization', value: TYPE_ORGANIZATION },
      { text: 'Repository', value: TYPE_REPOSITORY },
    ],
    field: FIELD_REPOSITORIES_STARGAZERS,
  }),
  computed: {
    fields() {
      switch (this.type) {
        case TYPE_USER:
          return [
            { text: 'Followers', value: FIELD_FOLLOWERS },
            { text: 'Repo Stars', value: FIELD_REPOSITORIES_STARGAZERS },
            { text: 'Repo Forks', value: FIELD_REPOSITORIES_FORKS },
            { text: 'Repo Watchers', value: FIELD_REPOSITORIES_WATCHERS },
            { text: 'Gist Stars', value: FIELD_GISTS_STARGAZERS },
            { text: 'Gist Forks', value: FIELD_GISTS_FORKS },
          ];
        case TYPE_ORGANIZATION:
          return [
            { text: 'Repo Stars', value: FIELD_REPOSITORIES_STARGAZERS },
            { text: 'Repo Forks', value: FIELD_REPOSITORIES_FORKS },
            { text: 'Repo Watchers', value: FIELD_REPOSITORIES_WATCHERS },
          ];
        case TYPE_REPOSITORY:
          return [
            { text: 'Stars', value: FIELD_STARGAZERS },
            { text: 'Forks', value: FIELD_FORKS },
            { text: 'Watchers', value: FIELD_WATCHERS },
          ];
        default:
          return [];
      }
    },
    query() {
      return {
        type: `type:${this.type}`,
        field: `field:${this.field}`,
      };
    },
  },
  watch: {
    type(after) {
      this.switchField(after);
    },
    query(after) {
      this.$store.commit('setQuery', after);
    },
  },
  created() {
    this.$store.commit('setQuery', this.query);
  },
  methods: {
    setField(field) {
      this.field = field;
    },
    switchField(field) {
      const isOwner = (type) => type === TYPE_USER || type === TYPE_ORGANIZATION;
      const isRepository = (type) => type === TYPE_REPOSITORY;
      switch (true) {
        case this.field.includes(FIELD_STARGAZERS) && isRepository(field):
          this.setField(FIELD_STARGAZERS);
          break;
        case this.field.includes(FIELD_STARGAZERS) && isOwner(field):
          this.setField(FIELD_REPOSITORIES_STARGAZERS);
          break;
        case this.field.includes(FIELD_FORKS) && isRepository(field):
          this.setField(FIELD_FORKS);
          break;
        case this.field.includes(FIELD_FORKS) && isOwner(field):
          this.setField(FIELD_REPOSITORIES_FORKS);
          break;
        case this.field.includes(FIELD_WATCHERS) && isRepository(field):
          this.setField(FIELD_WATCHERS);
          break;
        case this.field.includes(FIELD_WATCHERS) && isOwner(field):
          this.setField(FIELD_REPOSITORIES_WATCHERS);
          break;
        case isRepository(field):
          this.setField(FIELD_STARGAZERS);
          break;
        default:
          this.setField(FIELD_REPOSITORIES_STARGAZERS);
      }
    },
  },
};
</script>
