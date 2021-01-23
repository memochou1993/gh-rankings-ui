<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        cols="6"
      >
        <AppList
          title="Repository Ranking"
          :items="ranks"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import AppList from '@/components/AppList';

export default {
  components: {
    AppList,
  },
  created() {
    this.fetchRepositories();
  },
  computed: {
    ...mapState([
      'ranks',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchRepositories',
    ]),
  },
};
</script>
