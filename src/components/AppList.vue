<template>
  <div>
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text
        class="pa-0"
      >
        <v-list>
          <v-list-item-group>
            <template v-for="(item, i) in items">
              <v-list-item
                :key="item.id">
                <v-list-item-icon
                  class="my-2"
                >
                  <v-avatar
                    tile
                  >
                    <img
                      :src="item.image"
                      :alt="item.id"
                    />
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${item.rank.rank}. ${item.id}`"
                  />
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    :ripple="false"
                    text
                  >
                    <span
                      v-text="item.rank.totalCount.toLocaleString()"
                    />
                    <v-icon
                      right
                    >
                      mdi-star
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="i < items.length - 1"
                :key="i"
              />
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn::before {
  background-color: transparent !important;
}
</style>
