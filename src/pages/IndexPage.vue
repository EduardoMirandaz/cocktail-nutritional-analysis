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
          :key="cocktaill.image"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CocktaillCard from '../components/CocktaillCard.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CocktaillCard },
  data() {
    return {
      cocktaills: [
        {
          title: 'Caipirinha de Acerola',
          image: 'https://i.ytimg.com/vi/MMcM9YkGmqk/maxresdefault.jpg',
          itens: [
            {
              name: 'vodka',
              brName: 'vodka',
            },
            {
              name: 'ice',
              brName: 'gelo',
            },
            {
              name: 'condensed milk',
              brName: 'leite condensado',
              color: '#F3E8D4',
            },
            {
              name: 'acerola',
              brName: 'acerola',
              color: '#FF3D44',
            },
          ],
        },
      ],
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
</style>
