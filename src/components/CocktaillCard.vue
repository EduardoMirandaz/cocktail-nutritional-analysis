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
import { supabase } from '../lib/supabaseClient';

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
      likedBy: [],
    };
  },
  mounted() {
    this.populateLikedBy();
  },
  methods: {
    toggleLike() {
      this.$emit('update:like', !this.isLiked);
      this.isLiked = !this.isLiked;
      try {
        // Start the logic recovering the likes
        supabase
          .from('cocktail_likes')
          .select('*')
          .eq('cocktail_id', this.id)
          .then((response) => {
            const { data, error } = response;
            if (error) {
              console.error('Impossible to recover cocktail likes');
            } else {
              let tmpLikedBy = data[0].liked_by;
              if (tmpLikedBy.trim() !== '') {
                tmpLikedBy = tmpLikedBy.split(';');
                // If the user just liked the cocktail:
                if (this.isLiked) {
                  const newLikedBy = `${data[0].liked_by};${localStorage.getItem('usuarioLogado')}`;
                  supabase
                    .from('cocktail_likes')
                    .update({ liked_by: newLikedBy })
                    .eq('cocktail_id', this.id)
                    .then((response_) => {
                      if (response_.error) {
                        console.error("Couldn't update liked by list.", error);
                      } else {
                        console.log("Success, you've liked another cocktail!", data);
                        this.likedBy = newLikedBy.split(';');
                        console.log('likedBy após ter curtido uma caipirinha!');
                        console.log(this.likedBy);
                      }
                    });
                } else {
                  // If the user just unliked a cocktail
                  console.log('Antes de remover o like:');
                  console.log(tmpLikedBy);
                  const newLikedBy = tmpLikedBy.filter((user) => user !== localStorage.getItem('usuarioLogado'));
                  supabase
                    .from('cocktail_likes')
                    .update({ liked_by: `${newLikedBy.join(';')}` })
                    .eq('cocktail_id', this.id)
                    .then((response_) => {
                      if (response_.error) {
                        console.error("Couldn't update liked by list.", error);
                      } else {
                        console.log("Success, you've liked another cocktail!", data);
                        this.likedBy = data[0].liked_by.split(';');
                        console.log('Depois de remover o like:');
                        console.log(this.likedBy);
                      }
                    });
                }
                // Here, there was no likes in the cocktail yet
              } else {
                const newLikedBy = `${localStorage.getItem('usuarioLogado')}`;
                supabase
                  .from('cocktail_likes')
                  .update({ liked_by: newLikedBy })
                  .eq('cocktail_id', this.id)
                  .then((response_) => {
                    if (response_.error) {
                      console.error("Couldn't update liked by list.", error);
                    } else {
                      console.log("Success, you've liked another cocktail!", data);
                      this.likedBy = [newLikedBy];
                    }
                  });
              }
            }
          });
      } catch (error) {
        console.error('Error trying to update database', error);
      }
    },
    verifyLikesFromCard() {
      if (this.likedBy.includes(localStorage.getItem('usuarioLogado'))) {
        this.isLiked = true;
      }
    },
    populateLikedBy() {
      supabase
        .from('cocktail_likes')
        .select('*')
        .eq('cocktail_id', this.id)
        .then((response) => {
          if (response.data[0] === undefined) {
            supabase
              .from('cocktail_likes')
              .insert({ cocktail_id: this.id, liked_by: '' })
              .then((response_) => {
                const { error } = response_;
                this.likedBy = [];
                if (error) {
                  console.error('Impossible to insert the cocktail', error);
                }
              });
          } else {
            this.likedBy = response.data[0].liked_by.split(';');
            if (this.likedBy.includes(localStorage.getItem('usuarioLogado'))) {
              this.isLiked = true;
            }
          }
        });
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
