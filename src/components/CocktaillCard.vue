<template>
  <div class="content">

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CocktaillCard',
  props: {
    title: {
      type: String,
      required: true,
    },

    itens: {
      type: Array,
      required: true,
    },

    image: {
      type: String,
      required: false
    },
  },
});
</script>

<style>
  .content{
    background-color: yellowgreen;
  }
</style>
