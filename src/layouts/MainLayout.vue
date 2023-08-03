<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Gudu Cocktails
        </q-toolbar-title>

        <div style="margin-right: 2rem;font-size: 1rem;">{{usuarioLogado}}</div>
        <span @click="logout">
          <img src="../assets/LOGOUT.png" alt="Logout image" style="width: 2rem;">
        </span>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-grey-9 text-white"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Opções:
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <div class="footer">
    <h5 id="nomeDesenvolvedores">Desenvolvido por
      <span class="linkToGithubName" @click="navegarPara('https://github.com/EduardoMirandaz')">
        Eduardo Miranda
      </span>
      e
      <span class="linkToGithubName" @click="navegarPara('https://github.com/GustavoOM')">
        Gustavo Martins
      </span>
    </h5>
    <h5 id="nomeDisciplina">Desenvolvimento Web e Mobile - SSC0961</h5>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [

  {
    title: 'Back home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Project documentation',
    icon: 'school',
    link: 'https://github.com/EduardoMirandaz/cocktail-nutritional-analysis#readme',
  },
  {
    title: 'Project repository',
    caption: 'Github',
    icon: 'code',
    link: 'https://github.com/EduardoMirandaz/cocktail-nutritional-analysis',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },
  data() {
    return {
      usuarioLogado: '',
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    this.recuperarUsuarioLogado();
  },
  methods: {
    recuperarUsuarioLogado() {
      this.usuarioLogado = localStorage.getItem('usuarioLogado');
    },
    navegarPara(url) {
      window.open(url, '_blank');
    },
    logout() {
      localStorage.clear();
      window.location.href = '/auth';
    },
  },
});
</script>

<style scoped>

.footer {
  background-color: #222;
  color: white;
  margin: 0;
  padding-top: 0;
  text-align: center;
}

#nomeDesenvolvedores {
  margin: 0;
  padding: 0;
}

#nomeDisciplina {
  margin: 0;
}

.linkToGithubName {
  text-decoration: underline;
  font-style: italic;
  cursor: pointer;
}
</style>
