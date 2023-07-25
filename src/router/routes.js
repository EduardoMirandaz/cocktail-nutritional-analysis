function isUsuarioLogado() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  return usuarioLogado !== null;
}

function authGuard(to, from, next) {
  if (to.path !== '/auth') {
    if (isUsuarioLogado()) {
      next();
    } else {
      next('/auth');
    }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: authGuard,
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/cocktail/:parametro', component: () => import('pages/DescriptionPage.vue') },
    ],
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import('pages/AuthPage.vue'),
    props: true,
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
