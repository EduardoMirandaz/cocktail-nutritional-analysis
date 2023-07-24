<template>
  <div class="descriptionPage">
    <h1 id="nomeDoDrink">{{ this.cocktail.strDrink }} 🍹</h1>
    <div class="indicacaoSeContemAlcoolOuNao">
      <div id="categoriaDoDrink"
      v-if="cocktail && cocktail.strCategory && cocktail.strCategory.trim() !== ''">
      Category:
      {{ this.cocktail.strCategory }}
      </div>
      <div id="textoEhAlcoolico"
        v-if="cocktail && cocktail.strAlcoholic">
        This drink
        <span v-if="!this.temAlcool">doesn't</span>
        contains alcohol! <br>
      </div>
      <div class="imagemIndicandoSeEhAlcoolico">
        <img
        id="imagemEhAlcoolico"
        :src="
          this.temAlcool
            ? 'src/assets/TEM_ALCOOL.svg'
            : 'src/assets/NAO_TEM_ALCOOL.png'
        "
        :alt="'Imagem do boneco mostrando que ' + (this.temAlcool ? '' : 'não') + ' tem alcool!'"
        />
      </div>
    </div>
    <div class="containerDaFoto">
      <img id="fotoDoDrink" :src="this.cocktail.strDrinkThumb" alt="Foto do drink"/>
    </div>

    <div class="tagsAndIngredientsContainer">
      <span v-if="cocktail && cocktail.strTags && cocktail.strTags.trim() !== ''">
        <TagsList :tags=getTags() ></TagsList>
      </span>
      <IngredientsList :ingredients=ingredients></IngredientsList>

    </div>

    <div class="containerModoDePreparo" v-if="this.cocktail.strInstructions.trim() !== ''">
      <h2 id="tituloModoDePreparoDoDrink">Directions | Preparation method</h2>
      <span v-for="linha in this.cocktail.strInstructions.split('.')" :key="linha">
          <span v-if="linha.trim() !== ''">
            <p class="linhaModoDePreparo">{{ linha }}.</p>
          </span>
      </span>
      <div class="containerRecipiente"
      v-if="cocktail && cocktail.strGlass && cocktail.strGlass.trim() !== ''">
        <p id="recipienteDoDrink" class="linhaModoDePreparo">
          Commonly served in:
          <span id="recipienteBusca"
          @click="redirecionarParaBusca(this.cocktail.strGlass)">{{ this.cocktail.strGlass }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import IngredientsList from '../components/IngredientsList.vue';
import TagsList from '../components/TagsList.vue';

export default defineComponent({
  name: 'DescriptionPage',

  components: { IngredientsList, TagsList },

  data() {
    return {
      id: null,
      cocktail: null,
      fotoDoDrink: null,
      temAlcool: true,
      ingredients: [],
      tags: [],
    };
  },
  mounted() {
    this.ingredients = this.getIngredients(this.cocktail);
    window.scrollTo(0, 0);
  },
  created() {
    const url = window.location.href;

    // Separa a URL usando '/' como delimitador e pega o último elemento do array resultante
    const partesDaURL = url.split('/');
    const trechoDesejado = partesDaURL[partesDaURL.length - 1];

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${trechoDesejado}`)
      .then((response) => {
        if (Array.isArray(response.data.drinks) && response.data.drinks.length > 0) {
          this.cocktail = response.data.drinks?.[0];
          this.id = trechoDesejado;
          this.fotoDoDrink = this.cocktail.strDrinkThumb;
          this.temAlcool = this.cocktail.strAlcoholic === 'Alcoholic';
        } else {
          console.error('Coquetel não encontrado :(');
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação: ', error);
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
    getTags() {
      this.tags = this.cocktail.strTags.split(',');
      return this.tags;
    },
    redirecionarParaBusca(item) {
      const pesquisa = encodeURIComponent(item);
      const url = `https://www.google.com/search?q=${pesquisa}`;
      window.open(url, '_blank');
    },
  },
});
</script>

<style scoped>

#nomeDoDrink{
  background-color: #222;
  justify-content: center;
  display: flex;
  color: antiquewhite;
  padding: 1rem;
  margin: 0;
}

.containerDaFoto {
  display: flex;
  background-color: rgba(34, 34, 34, 0.8);
  justify-content: center;
  padding: 2rem;
}

#fotoDoDrink{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 0;
  border-radius: 3rem;

}

.indicacaoSeContemAlcoolOuNao {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  color: antiquewhite;
  gap: 6rem;
  border-top: 2px ridge black;

}

@media (max-width: 1014px) {
  #nomeDoDrink {
    font-size: 4rem;
  }
  .indicacaoSeContemAlcoolOuNao {
    padding: 3rem;
    display: grid;
    gap: 2rem;
    text-align: center;
  }
}

@media (max-width: 725px) {
  #fotoDoDrink {
    max-width: 20rem;
  }
}

#imagemEhAlcoolico {
  max-width: 5rem;
  max-height: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

}

#categoriaDoDrink {
  font-size: 2rem;
  text-align: center;
}

#textoEhAlcoolico {
  font-size: 2rem;
}

#recipienteBusca {
  cursor: pointer;
  text-decoration: underline;
  font-style: italic;
  font-size: 2rem;
}

#tituloModoDePreparoDoDrink {
  background-color: #222;
  padding-top: 2rem;
  text-align: center;
  padding-bottom: 2rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;
}

.containerModoDePreparo {
  background-color: rgba(34, 34, 34, 0.8);
  text-align: center;
  color: white;
}

.containerRecipiente {
  padding-bottom: 2rem;
}

.linhaModoDePreparo {
  text-align: left;
  padding-left: 2rem;
  margin-bottom: 0;
  font-size: 2rem;
  padding-left: 5rem;
}

</style>
