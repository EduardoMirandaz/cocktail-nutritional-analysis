const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/cocktail/:parametro', component: () => import('pages/DescriptionPage.vue') },
    ],
  },
  {
    path: '/cocktail/:parametro',
    name: 'DescriptionPage',
    component: () => import('pages/DescriptionPage.vue'),
    props: true,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;
