<template>
  <div>
    <v-row
      justify="center"
    >
      <v-col
        cols="6"
      >
        <AppRanking
          title="Repository Ranking"
          :ranks="ranks"
          class="my-5"
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
import AppRanking from '@/components/AppRanking';

export default {
  components: {
    AppRanking,
  },
  created() {
    this.fetch({
      tags: [
        'user',
        'repositories.stargazers',
      ],
      limit: 100,
    });
  },
  computed: {
    ...mapState([
      'ranks',
    ]),
  },
  methods: {
    ...mapActions([
      'fetch',
    ]),
  },
};
</script>
