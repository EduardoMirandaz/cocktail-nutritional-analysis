<template>
  <h2 id="tituloIngredientes">Ingredientes 🍸</h2>
  <div class="ingredientsList" >
    <span class="itenCocktaillCard"
        v-for="item in ingredients" :key="item">
        <div>{{ item }}</div>
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

#tituloIngredientes {
  display: flex;
  margin: 0;
  padding: 2rem;
  justify-content: center;
  background-color: aqua;
  background-image: url('src/assets/separadorTituloIngredientes.svg');
  max-height: 118px;
  color: white;
}

.ingredientsList {
  align-items: center;
  font-size: 2rem;
}

</style>
