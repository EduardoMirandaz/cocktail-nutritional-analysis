<template>
  <div class="tagsContainer">
      <h2 id="tituloTags">Drink Tags 📌</h2>
      <div class="tagsList" >
        <span class="itemTagsList"
            v-for="tag in tags" :key="tag">
            <div class="tag" @click="redirecionarParaBusca(tag)">{{ tag }}</div>
        </span>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TagsList',
  props: {
    tags: {
      type: Array,
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
    redirecionarParaBusca(item) {
      const pesquisa = encodeURIComponent(item);
      const url = `https://www.google.com/search?q=${pesquisa}`;
      window.open(url, '_blank');
    },
  },
});
</script>

<style scoped>

#tituloTags {
  display: flex;
  margin: 0;
  padding: 2rem;
  justify-content: center;
  background-image: url('src/assets/separadorTituloIngredientes.svg');
  max-height: 118px;
  color: white;
  border-bottom: 2px double black;

}

@media (max-width: 490px) {
  #tituloTags {
    font-size: 2.5rem;
  }
}

.tagsList {
  align-items: center;
  font-size: 2rem;
  display: grid;
  text-align: center;
  gap: 0.1rem;
  margin: 0 1rem;
  padding-bottom: 1rem;
}

.tag{
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: white;
  background-color: #222 ;
  padding: 1rem;
  border-radius: 1rem;
  min-width: 4rem;
  min-height: 4rem;
  margin-top: 1rem;
  box-shadow: 0 0 0 0.5rem rgba(34, 34, 34, 0.8);
}

.tagsContainer {
  background-color: rgba(34, 34, 34, 0.8);
}

</style>
