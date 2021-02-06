<template>
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
          append-icon="mdi-close"
          dense
          flat
          hide-details
          hide-no-data
          item-text="name"
          label="Language"
          solo
          class="font-weight-light pointer"
          @click:append="setLanguage('')"
        >
          <span
            slot="item"
            slot-scope="{ item }"
            class="font-weight-light"
            v-text="item.name"
          />
        </v-autocomplete>
      </v-card>
      <v-card
        outlined
        class="my-2"
      >
        <v-autocomplete
          v-model="location"
          :items="$store.state.locations"
          append-icon="mdi-close"
          dense
          flat
          hide-details
          hide-no-data
          item-text="name"
          label="Location"
          solo
          class="font-weight-light pointer"
          @click:append="setLocation('')"
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
</template>

<script>
import fields from '@/assets/field';
import types from '@/assets/type';

export default {
  name: 'AppSearch',
  data: () => ({
    type: types.user.value,
    types: [
      types.user,
      types.organization,
      types.repository,
    ],
    field: fields.repositoryStars.value,
    language: '',
    location: '',
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
        language: this.language,
        location: this.location,
      };
    },
    isSameQuery() {
      const isSame = (key) => this[key] === (this.$route.query[key] || '');
      return ['type', 'field', 'language', 'location'].every(isSame);
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
    setLanguage(language) {
      this.language = language;
    },
    setLocation(location) {
      this.location = location;
    },
    switchField() {
      const isUser = () => this.type === types.user.value;
      const isOrganization = () => this.type === types.organization.value;
      const isOwner = () => isUser() || isOrganization();
      const isRepository = () => this.type === types.repository.value;
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
    switchLanguage() {
      if (!this.type.includes('repo') && !this.field.includes('repo')) {
        this.setLanguage('');
      }
    },
    retrieve() {
      this.setType(this.$store.state.query.type);
      this.setField(this.$store.state.query.field);
      this.setLanguage(this.$store.state.query.language);
      this.setLocation(this.$store.state.query.location);
    },
    restore() {
      this.$store.commit('setQuery', {
        type: this.type,
        field: this.field,
        language: this.language,
        location: this.location,
      });
    },
    updateRoute(after, before) {
      if (after.type !== before.type) {
        this.switchField();
        this.restore();
      }
      if (after.field !== before.field) {
        this.switchLanguage();
        this.restore();
      }
      if (after.language !== before.language) {
        this.restore();
      }
      if (after.location !== before.location) {
        this.restore();
      }
      if (this.isSameQuery) {
        return;
      }
      const query = {
        ...this.$route.query,
        type: this.type,
        field: this.field,
        language: this.language,
        location: this.location,
        page: '1',
      };
      Object.entries(query).forEach(([key, val]) => !val && delete query[key]);
      this.$router.push({ query });
    },
  },
};
</script>
