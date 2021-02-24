<template>
  <v-menu
    :close-delay="100"
    :disabled="disabled"
    :max-height="5 * (48 + 1)"
    :max-width="240"
    :nudge-right="6"
    :nudge-bottom="1"
    content-class="elevation-3"
    offset-x
    open-on-hover
  >
    <template
      v-slot:activator="{ on, attrs }"
    >
      <div
        v-bind="attrs"
        v-on="on"
      >
        <slot
          name="activator"
        />
      </div>
    </template>
    <slot
      name="list"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
