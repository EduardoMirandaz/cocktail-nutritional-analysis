<template>
  <div class="contentCocktaillCard" :style="{ borderColor: cardColor }">
    <p class="titleCocktaillCard">{{ title }}</p>
    <img class="imageCocktaillCard" :src="image" alt="cocktaill">
    <p class="itensCocktaillCard">
      <span class="itenCocktaillCard"
        v-for="iten in itens" :key="iten.brName" :style="{ borderColor: cardColor }">
        {{ iten.brName }}
      </span>
    </p>
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
  data() {
    return {
      cardColor: '#ffffff',
    };
  },
  mounted() {
    this.cardColor = this.calculateAverageColor(
      this.itens.reduce((cores, item) => (item.color ? [...cores, item.color] : cores), []),
    );
  },
  methods: {
    calculateAverageColor(colors) {
      const rgbValues = colors.map((color) => this.hexToRgb(color));
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      rgbValues.forEach((rgb) => {
        totalRed += rgb.r;
        totalGreen += rgb.g;
        totalBlue += rgb.b;
      });

      const averageRed = Math.round(totalRed / rgbValues.length);
      const averageGreen = Math.round(totalGreen / rgbValues.length);
      const averageBlue = Math.round(totalBlue / rgbValues.length);

      const averageColor = this.rgbToHex(averageRed, averageGreen, averageBlue);

      return averageColor;
    },

    hexToRgb(hex) {
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);

      return { r, g, b };
    },

    rgbToHex(r, g, b) {
      const redHex = r.toString(16).padStart(2, '0');
      const greenHex = g.toString(16).padStart(2, '0');
      const blueHex = b.toString(16).padStart(2, '0');

      return `#${redHex}${greenHex}${blueHex}`;
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
    border: 4px solid;
    border-radius: 20px;
    background-color: #111;
  }

  .titleCocktaillCard{
    color: aliceblue;
    font-size: 20px;
    text-align: center;
    margin: 10px;
  }

  .imageCocktaillCard{
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .itensCocktaillCard {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 200px;
    margin: 10px 0;
    justify-content: center;
    row-gap: 6px; /* Espaçamento vertical entre as linhas */
  }

  .itenCocktaillCard {
    flex: 0 0 auto;
    font-size: 12px;
    color: aliceblue;
    border: 1px solid;
    border-radius: 5px;
    margin: 0 2px;
    padding: 2px 4px;
  }
</style>
