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
          :disabled="isLanguageDisabled"
          :items="$store.state.languages"
          clearable
          clear-icon="mdi-close"
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
      <v-card
        outlined
        class="my-2"
      >
        <v-autocomplete
          v-model="location"
          :disabled="isLocationDisabled"
          :items="$store.state.locations"
          clearable
          clear-icon="mdi-close"
          dense
          flat
          hide-details
          hide-no-data
          item-text="name"
          label="Location"
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
      <v-card
        outlined
        class="my-2"
      >
        <v-text-field
          v-model="name"
          autocomplete="off"
          clearable
          clear-icon="mdi-close"
          dense
          flat
          hide-details
          label="Name"
          solo
          class="font-weight-light"
        />
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  types,
  fields,
} from '@/assets';

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
    name: '',
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
        name: this.name,
      };
    },
    isLanguageDisabled() {
      return !this.isRepositoryField || !!this.location;
    },
    isLocationDisabled() {
      return !this.isOwnerType || !!this.language;
    },
    isOwnerType() {
      return [
        types.user.value,
        types.organization.value,
      ].includes(this.type);
    },
    isRepositoryField() {
      return [
        fields.repositoryStars.value,
        fields.repositoryForks.value,
        fields.repositoryWatchers.value,
        fields.stars.value,
        fields.forks.value,
        fields.watchers.value,
      ].includes(this.field);
    },
    isSameQuery() {
      const isSame = (key) => this[key] === (this.$route.query[key] || '');
      return ['type', 'field', 'language', 'location', 'name'].every(isSame);
    },
  },
  watch: {
    $route() {
      this.retrieve();
    },
    language(after) {
      if (after === null) {
        this.setLanguage('');
      }
    },
    location(after) {
      if (after === null) {
        this.setLocation('');
      }
    },
    name(after) {
      if (after === null) {
        this.setName('');
      }
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
    setName(name) {
      this.name = name;
    },
    switchType() {
      if (this.name.includes('/')) {
        this.setType(types.repository.value);
      }
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
      if (this.isLanguageDisabled) {
        this.setLanguage('');
      }
    },
    switchLocation() {
      if (this.isLocationDisabled) {
        this.setLocation('');
      }
    },
    retrieve() {
      this.setType(this.$store.state.query.type);
      this.setField(this.$store.state.query.field);
      this.setLanguage(this.$store.state.query.language);
      this.setLocation(this.$store.state.query.location);
      this.setName(this.$store.state.query.name);
    },
    restore() {
      this.$store.commit('setQuery', {
        type: this.type,
        field: this.field,
        language: this.language,
        location: this.location,
        name: this.name,
      });
    },
    updateRoute(after, before) {
      const isSame = (key) => after[key] === before[key];
      if (!isSame('type')) {
        this.switchField();
        this.switchLocation();
        this.restore();
      }
      if (!isSame('field')) {
        this.switchLanguage();
        this.restore();
      }
      if (!isSame('language')) {
        this.restore();
      }
      if (!isSame('location')) {
        this.restore();
      }
      if (!isSame('name')) {
        this.switchType();
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
        name: this.name,
        page: '1',
      };
      Object.entries(query).forEach(([key, val]) => !val && delete query[key]);
      this.$router.push({ query });
    },
  },
};
</script>
