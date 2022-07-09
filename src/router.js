import { createWebHistory, createRouter } from 'vue-router';
const routes = [
  {
    path: '/login',
    alias: '/',
    name: 'login',
    component: () => import('./views/Login.vue'),
    props: true,
  },
  {
    path: '/users',
    //alias: '/',
    name: 'users',
    component: () => import('./views/UserList.vue'),
    props: true,
  },
  {
    path: '/users/:id/edit',
    name: 'editUser',
    component: () => import('./views/EditUser.vue'),
    props: true,
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: () => import('./views/AddUser.vue'),
  },
  {
    path: '/users/:id/surveys',
    name: 'view',
    component: () => import('./views/SurveyList.vue'),
    props: true,
  },
  
  {
    path: '/surveys',
    name: 'surveys',
    component: () => import('./views/SurveyList.vue'),
    props: true,
  },
  
  {
    path: '/surveys/:surveyName/:summary',
    name: 'viewArtist',
    component: () => import('./views/SurveyList.vue'),
    props: true,
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/user-frontend/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;