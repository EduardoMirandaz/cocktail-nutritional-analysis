<template>
  <div class="ingredientsList" >
    <h2>Ingredientes</h2>
    <span class="itenCocktaillCard"
        v-for="item in ingredients" :key="item">
        <h4>{{ item }}</h4>
      </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IngredientsList',
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cardColor: '#ffffff',
      isLiked: this.like,
    };
  },
  methods: {
    toggleLike() {
      this.$emit('update:like', !this.isLiked);
      this.isLiked = !this.isLiked;
    },
  },
});
</script>

<style scoped>

</style>
