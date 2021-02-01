<template>
  <div>
    <v-card
      :elevation="5"
    >
      <v-card-text
        class="text-center"
      >
        <div
          class="title font-weight-regular text--primary"
          v-text="'Search'"
        />
        <v-card
          outlined
          class="my-2"
        >
          <v-select
            v-model="type"
            :items="types"
            :menu-props="{ offsetY: true }"
            color="primary"
            dense
            flat
            hide-details
            solo
            class="font-weight-light"
          >
            <span
              slot="item"
              slot-scope="{ item }"
              class="font-weight-light"
              v-text="item.text"
            />
          </v-select>
        </v-card>
        <v-card
          outlined
          class="my-2"
        >
          <v-select
            v-model="field"
            :items="fields"
            :menu-props="{ offsetY: true }"
            color="primary"
            dense
            flat
            hide-details
            solo
            class="font-weight-light"
          >
            <span
              slot="item"
              slot-scope="{ item }"
              class="font-weight-light"
              v-text="item.text"
            />
          </v-select>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import types from '@/util/types';
import fields from '@/util/fields';

export default {
  name: 'RankingSearch',
  data: () => ({
    type: types.user,
    types: [
      { text: 'User', value: types.user },
      { text: 'Organization', value: types.organization },
      { text: 'Repository', value: types.repository },
    ],
    field: fields.repositories.stargazers,
  }),
  computed: {
    fields() {
      switch (this.type) {
        case types.user:
          return [
            { text: 'Followers', value: fields.followers },
            { text: 'Repo Stars', value: fields.repositories.stargazers },
            { text: 'Repo Forks', value: fields.repositories.forks },
            { text: 'Repo Watchers', value: fields.repositories.watchers },
            { text: 'Gist Stars', value: fields.gists.stargazers },
            { text: 'Gist Forks', value: fields.gists.forks },
          ];
        case types.organization:
          return [
            { text: 'Repo Stars', value: fields.repositories.stargazers },
            { text: 'Repo Forks', value: fields.repositories.forks },
            { text: 'Repo Watchers', value: fields.repositories.watchers },
          ];
        case types.repository:
          return [
            { text: 'Stars', value: fields.stargazers },
            { text: 'Forks', value: fields.forks },
            { text: 'Watchers', value: fields.watchers },
          ];
        default:
          return [];
      }
    },
    query() {
      return {
        type: this.type,
        field: this.field,
      };
    },
  },
  watch: {
    type(after) {
      // FIXME
      console.log('type changed');
      this.switchField(after);
      this.$store.commit('setQuery', { ...this.$store.state.query, type: after });
      if (after === this.$route.query.type) {
        return;
      }
      this.$router.push({ query: { ...this.$route.query, type: after, page: '1' } });
    },
    field(after) {
      // FIXME
      console.log('field changed');
      this.$store.commit('setQuery', { ...this.$store.state.query, field: after });
      if (after === this.$route.query.field) {
        return;
      }
      this.$router.push({ query: { ...this.$route.query, field: after, page: '1' } });
    },
  },
  created() {
    this.restore();
  },
  methods: {
    setType(type) {
      this.type = type;
    },
    setField(field) {
      this.field = field;
    },
    switchField(field) {
      const isOwner = (type) => type === types.user || type === types.organization;
      const isRepository = (type) => type === types.repository;
      switch (true) {
        case this.field.includes(fields.stargazers) && isRepository(field):
          this.setField(fields.stargazers);
          break;
        case this.field.includes(fields.stargazers) && isOwner(field):
          this.setField(fields.repositories.stargazers);
          break;
        case this.field.includes(fields.forks) && isRepository(field):
          this.setField(fields.forks);
          break;
        case this.field.includes(fields.forks) && isOwner(field):
          this.setField(fields.repositories.forks);
          break;
        case this.field.includes(fields.watchers) && isRepository(field):
          this.setField(fields.watchers);
          break;
        case this.field.includes(fields.watchers) && isOwner(field):
          this.setField(fields.repositories.watchers);
          break;
        case isRepository(field):
          this.setField(fields.stargazers);
          break;
        default:
          this.setField(fields.repositories.stargazers);
      }
    },
    restore() {
      this.setType(this.$store.state.query.type);
      this.setField(this.$store.state.query.field);
    },
  },
};
</script>
