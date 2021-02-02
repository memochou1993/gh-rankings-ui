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
    isSameType() {
      return this.type === this.$route.query.type;
    },
    isSameField() {
      return this.field === this.$route.query.field;
    },
  },
  watch: {
    $route() {
      this.retrieve();
    },
    query(after, before) {
      this.updateRoute(after, before);
    },
  },
  created() {
    this.retrieve();
  },
  methods: {
    setType(type) {
      this.type = type;
    },
    setField(field) {
      this.field = field;
    },
    switchField(type) {
      const isOwner = () => type === types.user || type === types.organization;
      const isRepository = () => type === types.repository;
      switch (true) {
        case this.field.includes(fields.stargazers) && isRepository():
          this.setField(fields.stargazers);
          break;
        case this.field.includes(fields.stargazers) && isOwner():
          this.setField(fields.repositories.stargazers);
          break;
        case this.field.includes(fields.forks) && isRepository():
          this.setField(fields.forks);
          break;
        case this.field.includes(fields.forks) && isOwner():
          this.setField(fields.repositories.forks);
          break;
        case this.field.includes(fields.watchers) && isRepository():
          this.setField(fields.watchers);
          break;
        case this.field.includes(fields.watchers) && isOwner():
          this.setField(fields.repositories.watchers);
          break;
        case isRepository():
          this.setField(fields.stargazers);
          break;
        default:
          this.setField(fields.repositories.stargazers);
      }
    },
    retrieve() {
      this.setType(this.$store.state.query.type);
      this.setField(this.$store.state.query.field);
    },
    restore() {
      this.$store.commit('setQuery', {
        type: this.type,
        field: this.field,
      });
    },
    updateRoute(after, before) {
      const { query } = this.$route;
      if (after.type !== before.type) {
        this.switchField(after.type);
        this.restore();
      }
      if (after.field !== before.field) {
        this.restore();
      }
      if (this.isSameType && this.isSameField) {
        return;
      }
      this.$router.push({
        query: {
          ...query,
          type: this.type,
          field: this.field,
          page: '1',
        },
      });
    },
  },
};
</script>
