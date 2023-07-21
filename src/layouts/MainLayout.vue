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
          Análise Nutricional
        </q-toolbar-title>

        <div>SSC0961</div>
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
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [

  {
    title: 'Caipirinhas favoritas',
    caption: '@quasarframework',
    icon: 'favorite',
    link: '#',
  },
  {
    title: 'Documentação do projeto',
    caption: 'Documentação utilizada',
    icon: 'school',
    link: 'https://github.com/EduardoMirandaz/cocktail-nutritional-analysis#readme',
  },
  {
    title: 'Github',
    caption: 'github.com/EduardoMirandaz/cocktail-nutritional-analysis',
    icon: 'code',
    link: 'https://github.com/EduardoMirandaz/cocktail-nutritional-analysis',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.com',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
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
});
</script>
