<template>
  <div class="ingredientsContainer">
    <h2 id="tituloIngredientes">Ingredients 📗</h2>
    <div class="ingredientsList" >
      <span class="itemIngredientsList"
          v-for="item in ingredients" :key="item">
          <div class="item" @click="redirecionarParaBusca(item)">{{ item }}</div>
      </span>
    </div>
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
    redirecionarParaBusca(item) {
      const pesquisa = encodeURIComponent(item);
      const url = `https://www.google.com/search?q=${pesquisa}`;
      window.open(url, '_blank');
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
  background-image: url('src/assets/separadorTituloIngredientes.svg');
  max-height: 118px;
  color: white;
  border-bottom: 2px double black;

}

@media (max-width: 490px) {
  #tituloIngredientes {
    font-size: 2.5rem;
  }
}

.ingredientsList {
  align-items: center;
  font-size: 2rem;
  display: grid;
  text-align: center;
  gap: 0.1rem;
  margin: 0 1rem;
  padding-bottom: 1rem;

}

.item{
  display: flex;
  justify-content: center;
  color: white;
  background-color: #222 ;
  padding: 1rem;
  border-radius: 1rem;
  min-width: 4rem;
  min-height: 4rem;
  margin-top: 1rem;
  box-shadow: 0 0 0 0.5rem rgba(34, 34, 34, 0.8);
  cursor: pointer;
}

.ingredientsContainer {
  background-color: (rgba34, 34, 34, 0.8);
}

</style>
