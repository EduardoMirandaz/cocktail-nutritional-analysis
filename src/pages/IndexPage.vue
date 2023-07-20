<template>
  <div class="contentHome">
    <q-img
      alt="Banner Caipirinha da Loira"
      src="~assets/banner.svg"
      class="bannerHome"
    />
    <div class="elementsHome">
      <CocktaillCard
        v-for="cocktaill in cocktaills"
          :title="cocktaill.title"
          :itens="cocktaill.itens"
          :image="cocktaill.image"
          :like="cocktaill.like"
          :key="cocktaill.image"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CocktaillCard from '../components/CocktaillCard.vue';
import cocktaillsData from '../data/cocktaills.json';

export default defineComponent({
  name: 'IndexPage',
  components: { CocktaillCard },
  data() {
    return {
      cocktaills: cocktaillsData,
    };
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
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-row-gap: 20px;
  }

  @media screen and (max-width: 1350px) {
    .elementsHome {
        grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 850px) {
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
