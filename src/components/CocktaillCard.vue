<template>
  <div class="contentCocktaillCard" :style="{ borderColor: cardColor }">
    <p class="titleCocktaillCard">{{ title }}</p>
    <img class="imageCocktaillCard" :src="image" alt="cocktaill">
    <p class="itensCocktaillCard">
      <span class="itenCocktaillCard"
        v-for="item in items" :key="item">
        {{ item }}
      </span>
    </p>
    <div class="buttonContainerCocktaillCard">
      <router-link :to="`cocktail/${id}`">
        <q-btn class="infoButtonCocktaillCard">
          acessar informações
        </q-btn>
      </router-link>
      <div class="likeButtonContentCocktaillCard"
        @click="toggleLike"
      >
        <img class="likeButtonCocktaillCard"
          :src="isLiked ? 'https://cdn-icons-png.flaticon.com/128/833/833472.png' : 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'"
          alt="botão de like"
        >
      </div>
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

    items: {
      type: Array,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    like: {
      type: Boolean,
      required: true,
    },

    id: {
      type: String,
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
  .contentCocktaillCard{
    width: 245px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #222;
  }

  .titleCocktaillCard{
    color: aliceblue;
    font-size: 20px;
    text-align: center;
    margin: 10px;
    height: 60px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 3.6em;
    line-height: 1.8em;
  }

  .imageCocktaillCard{
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  .itensCocktaillCard {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 200px;
    margin: 10px 0;
    justify-content: center;
    row-gap: 6px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 70px;
    line-height: 1.8em;
  }

  .itenCocktaillCard {
    flex: 0 0 auto;
    font-size: 12px;
    height: 30px;
    color: aliceblue;
    border: 1px solid aliceblue;
    border-radius: 5px;
    margin: 0 2px;
    padding: 2px 4px;
  }

  .buttonContainerCocktaillCard{
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 50px;
    padding: 0 10px;
  }

  .infoButtonCocktaillCard{
    height: 40px;
    font-size: 10px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    color: aliceblue;
  }

  .likeButtonContentCocktaillCard{
    height: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    cursor: pointer;
  }

  .likeButtonCocktaillCard{
    height: 25px;
    height: 25px;
  }
</style>
