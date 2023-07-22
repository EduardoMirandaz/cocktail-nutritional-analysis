<template>
  <div class="descriptionPage">
    <h1 id="nomeDoDrink">{{ this.cocktail.strDrink }} 🍹</h1>
    <div class="containerDaFoto">
      <img id="fotoDoDrink" :src="this.cocktail.strDrinkThumb" alt="Foto do drink"/>
    </div>
    <h1 id="tagsDoDrink" v-if="cocktail && cocktail.strTags && cocktail.strTags.trim() !== ''">
      Tags do drink: <br>
      {{ cocktail.strTags }}
    </h1>
    <div class="indicacaoSeContemAlcoolOuNao">
      <div id="categoriaDoDrink"
      v-if="cocktail && cocktail.strCategory && cocktail.strCategory.trim() !== ''">
      Categoria:
      {{ this.cocktail.strCategory }}
      </div>
      <div id="textoEhAlcoolico"
        v-if="cocktail && cocktail.strAlcoholic && cocktail.strAlcoholic === 'Alcoholic'">
        {{ console.log('temAlcool:::'+this.temAlcool) }}
        Este drink {{this.temAlcool ? '' : 'não'}} contém alcool! <br>
      </div>
      <div class="imagemIndicandoSeEhAlcoolico">
        <img
        id="imagemEhAlcoolico"
        :src="
          this.temAlcool
            ? 'src/assets/TEM_ALCOOL.svg'
            : 'src/assets/NAO_TEM_ALCOOL.png'
        "
        :alt="'Imagem do boneco mostrando que ' + (temAlcool ? '' : 'não') + ' tem alcool!'"
        />
      </div>
    </div>
    <IngredientsList :ingredients=ingredients></IngredientsList>
    <h1 id="recipienteDoDrink">Recipiente : {{ this.cocktail.strGlass }}</h1>
    <h1 id="modoDePreparoDoDrink">Modo de preparo : {{ this.cocktail.strInstructions }}</h1>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import IngredientsList from '../components/IngredientsList.vue';

export default defineComponent({
  name: 'DescriptionPage',

  components: { IngredientsList },

  data() {
    return {
      id: null,
      cocktail: null,
      fotoDoDrink: null,
      temAlcool: true,
      ingredients: [],
    };
  },
  mounted() {
    this.ingredients = this.getIngredients(this.cocktail);
  },
  created() {
    const url = window.location.href;

    // Separa a URL usando '/' como delimitador e pega o último elemento do array resultante
    const partesDaURL = url.split('/');
    const trechoDesejado = partesDaURL[partesDaURL.length - 1];
    console.log(`trecho desejado:${trechoDesejado}`);

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${trechoDesejado}`)
      .then((response) => {
        if (Array.isArray(response.data.drinks) && response.data.drinks.length > 0) {
          this.cocktail = response.data.drinks?.[0];
          console.log(this.cocktail);
          this.id = trechoDesejado;
          this.fotoDoDrink = this.cocktail.strDrinkThumb;
          this.temAlcool = this.cocktail.strAlcoholic === 'Alcoholic';
        } else {
          console.error('Coquetel não encontrado :(');
        }
      })
      .catch((error) => {
        // Trate erros aqui, se necessário
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
  border-color: aqua;
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
  gap: 18rem;

}

#imagemEhAlcoolico {
  max-width: 5rem;
  max-height: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

}

#categoriaDoDrink {
  font-size: 2rem;
}

#textoEhAlcoolico {
  font-size: 2rem;
}

</style>
