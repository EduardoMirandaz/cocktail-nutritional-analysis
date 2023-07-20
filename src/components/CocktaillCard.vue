<template>
  <div class="contentCocktaillCard" :style="{ borderColor: pixelColor }">
    <p class="titleCocktaillCard">{{ title }}</p>
    <img class="imageCocktaillCard" :src="image" alt="cocktaill" ref="imageRef">
    <p class="itensCocktaillCard">
      <span class="itenCocktaillCard"
        v-for="iten in itens" :key="iten.brName" :style="{ borderColor: pixelColor }">
        {{ iten.brName }}
      </span>
    </p>
    <div class="buttonContainerCocktaillCard">
      <q-btn class="infoButtonCocktaillCard" :style="{ backgroundColor: pixelColor }">
        acessar informações
      </q-btn>
      <div class="likeButtonContentCocktaillCard"
        :style="{ backgroundColor: pixelColor }"
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
    itens: {
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
  },
  data() {
    return {
      pixelColor: null,
      isLiked: this.like,
      isImageLoaded: false,
    };
  },
  methods: {
    arredonda(v) {
      return 5 * (Math.round(v / 5));
    },

    componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    },

    rgbToHex(r, g, b) {
      return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
    },

    getImageColor() {
      // carrega uma imagem
      const img = new Image();
      img.src = this.image;

      // cria um canvas invisível
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');

      // desenha a imagem no canvas
      context.drawImage(img, 0, 0);

      // recupera vetor de cores
      const map = context.getImageData(0, 0, img.width, img.height).data;

      // monta histograma
      let hex;
      let r;
      let g;
      let b;
      const histograma = {};
      for (let i = 0, len = map.length; i < len; i += 4) {
        // recupera componentes de um ponto
        r = this.arredonda(map[i]);
        g = this.arredonda(map[i + 1]);
        b = this.arredonda(map[i + 2]);
        // alpha = map[i+2]; //ignora canal alpha

        // valor em hexadecimal
        hex = this.rgbToHex(r, g, b);

        // adiciona no histograma ou incrementa se já existir
        if (histograma[hex] === undefined) {
          histograma[hex] = 1;
        } else {
          histograma[hex] += 1;
        }
      }

      // recupera cor mais comum
      let corMaisComum = null;
      let frequenciaCorMaisComum = 0;
      const keys = Object.keys(histograma);
      for (let i = 0; i < keys.length; i += 1) {
        const cor = keys[i];
        if (frequenciaCorMaisComum < histograma[cor]) {
          corMaisComum = cor;
          frequenciaCorMaisComum = histograma[cor];
        }
      }

      this.pixelColor = corMaisComum;
    },
  },
  mounted() {
    const image = this.$refs.imageRef;
    if (image && image.complete) {
      this.isImageLoaded = true;
      this.getImageColor();
    } else {
      image.onload = () => {
        this.isImageLoaded = true;
        this.getImageColor();
      };
    }
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
    border-radius: 10px;
    background-color: #111;
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
    border: 1px solid;
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
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
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
