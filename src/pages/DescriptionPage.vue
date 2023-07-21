<template>
  <div class="contentHome">
    <h1>DESCRIPTION PAGE {{ this.id }}</h1>
    {{console.log("DESCRIPTION PAGE "+ this.id)}}
    {{'cocktail:-->' + console.log(this.cocktail) }}
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
// import CocktaillCard from '../components/CocktaillCard.vue';

export default defineComponent({
  name: 'DescriptionPage',

  data() {
    return {
      id: null,
      cocktail: null,
    };
  },
  mounted() {
    const url = window.location.href;

    // Separa a URL usando '/' como delimitador e pega o último elemento do array resultante
    const partesDaURL = url.split('/');
    const trechoDesejado = partesDaURL[partesDaURL.length - 1];

    this.cocktail = axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${trechoDesejado}`)
      .then((response) => response.data);

    this.id = trechoDesejado;
  },
  methods: {
    getIngredients(cocktaill) {
      const ingredients = Object.keys(cocktaill)
        .filter((key) => key.startsWith('strIngredient'))
        .map((key) => cocktaill[key])
        .filter((ingredient) => ingredient && ingredient.trim());
      return ingredients;
    },
  },
});
</script>

<style scoped>
  .contentHome{
    background-color: #000;
  }
  .bannerHome{
    width: 100%;
    border-bottom: 2px solid aliceblue;
  }
  .elementsHome{
    justify-items: center;
    align-items: center;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    grid-row-gap: 20px;
  }

  @media screen and (max-width: 1650px) {
    .elementsHome {
        grid-template-columns: repeat(4, 1fr);
    }
  }

  @media screen and (max-width: 1350px) {
    .elementsHome {
        grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1100px) {
    .elementsHome {
        grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 600px) {
      .elementsHome {
          grid-template-columns: repeat(1, 1fr);
      }
  }
</style>
