<template>
  <div class="contentCocktaillCard">
    <h1 class="titleCocktaillCard">{{ title }}</h1>
    <img class="imageCocktaillCard" :src="image" alt="cocktaill">
    <div class="itensCocktaillCard">
      <h2 class="itenCocktaillCard" v-for="iten in itens" :key="iten">{{ iten }}</h2>
    </div>
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
      required: false,
    },
  },
});
</script>

<style scoped>
  .contentCocktaillCard{
    width: 245px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid aliceblue;
    border-radius: 20px;
    background-color: #111;
  }

  .titleCocktaillCard{
    color: aliceblue;
    font-size: 20px;
    text-align: center;
  }

  .imageCocktaillCard{
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .itensCocktaillCard{
    display: flex;
    flex-direction: row;
  }

  .itenCocktaillCard{
    font-size: 12px;
    color: aliceblue;
  }
</style>
