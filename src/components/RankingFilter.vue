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
        <v-card
          outlined
          class="my-2"
        >
          <v-autocomplete
            v-model="language"
            :disabled="!type.includes('repo') && !field.includes('repo')"
            :items="$store.state.languages"
            dense
            flat
            hide-details
            hide-no-data
            item-text="name"
            label="Language"
            solo
            class="font-weight-light pointer"
          >
            <span
              slot="item"
              slot-scope="{ item }"
              class="font-weight-light"
              v-text="item.name"
            />
          </v-autocomplete>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import fields from '@/assets/field';
import types from '@/assets/type';

export default {
  name: 'RankingFilter',
  data: () => ({
    type: types.user.value,
    types: [
      types.user,
      types.organization,
      types.repository,
    ],
    field: fields.repositoryStars.value,
    language: '',
  }),
  computed: {
    fields() {
      switch (this.type) {
        case types.user.value:
          return [
            fields.followers,
            fields.repositoryStars,
            fields.repositoryForks,
            fields.repositoryWatchers,
            fields.gistStars,
            fields.gistForks,
          ];
        case types.organization.value:
          return [
            fields.repositoryStars,
            fields.repositoryForks,
            fields.repositoryWatchers,
          ];
        case types.repository.value:
          return [
            fields.stars,
            fields.forks,
            fields.watchers,
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
      const isOwner = () => type === types.user.value || type === types.organization.value;
      const isRepository = () => type === types.repository.value;
      switch (true) {
        case this.field.includes(fields.stars.value) && isRepository():
          this.setField(fields.stars.value);
          break;
        case this.field.includes(fields.stars.value) && isOwner():
          this.setField(fields.repositoryStars.value);
          break;
        case this.field.includes(fields.forks.value) && isRepository():
          this.setField(fields.forks.value);
          break;
        case this.field.includes(fields.forks.value) && isOwner():
          this.setField(fields.repositoryForks.value);
          break;
        case this.field.includes(fields.watchers.value) && isRepository():
          this.setField(fields.watchers.value);
          break;
        case this.field.includes(fields.watchers.value) && isOwner():
          this.setField(fields.repositoryWatchers.value);
          break;
        case isRepository():
          this.setField(fields.stars.value);
          break;
        default:
          this.setField(fields.repositoryStars.value);
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
