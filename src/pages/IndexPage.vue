<template>
  <div class="contentHome">
    <q-img
      alt="Banner Caipirinha da Loira"
      src="~assets/banner.svg"
      class="bannerHome"
    />
    <div class="elementsHome">
      <CocktaillCard
        v-for="cocktaill in getCocktailsWithSelectedFilter(cocktaills)"
          :title="cocktaill.strDrink"
          :image="cocktaill.strDrinkThumb"
          :items="getIngredients(cocktaill)"
          :id="cocktaill.idDrink"
          :key="cocktaill.strDrinkThumb"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import CocktaillCard from '../components/CocktaillCard.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CocktaillCard },
  data() {
    return {
      cocktaills: [],
      showOnlyLikedCocktails: false,
    };
  },
  mounted() {
    const alphabet = 'abcdefghijklmnopqrstvwyz';

    const promises = alphabet.split('').map((letter) => (
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then((response) => response.data.drinks)
    ));

    Promise.all(promises)
      .then((results) => {
        this.cocktaills = results.flat();
      });
  },
  methods: {
    getIngredients(cocktaill) {
      const ingredients = Object.keys(cocktaill)
        .filter((key) => key.startsWith('strIngredient'))
        .map((key) => cocktaill[key])
        .filter((ingredient) => ingredient && ingredient.trim());
      return ingredients;
    },
    getCocktailsWithSelectedFilter(cocktails) {
      return cocktails;
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
