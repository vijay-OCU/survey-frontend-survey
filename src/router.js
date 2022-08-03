import { createWebHistory, createRouter } from 'vue-router';
const routes = [
  //login
  {
    path: '/login',
    alias: '/',
    name: 'login',
    component: () => import('./views/Login.vue'),
    props: true,
  },
  //Users list for admin
  {
    path: '/users',
    name: 'users',
    component: () => import('./views/UserList.vue'),
    props: true,
  },
  //Surveys list for admin and user
  {
    path: '/surveys',
    name: 'surveys',
    component: () => import('./views/SurveyList.vue'),
    props: true,
  },
  //Create user
  {
    path: '/addUser',
    name: 'addUser',
    component: () => import('./views/AddUser.vue'),
    props: true
  },
  //Edit user
  {
    path: '/users/:id/edit',
    name: 'editUser',
    component: () => import('./views/EditUser.vue'),
    props: true,
  },

  //Create Survey
  {
    path: '/addSurvey',
    name: 'addSurvey',
    component: () => import('./views/AddSurvey.vue'),
    props: true
  },

  //View Survey
  {
    path: '/viewSurvey/:id',
    name: 'viewSurvey',
    component: () => import('./views/ViewSurvey.vue'),
    props: true
  },
  {
    path: '/submitted/:id',
    name: 'submitted-survey',
    component: () => import('./views/CompletedSurvey.vue'),
    props: true
  },
  //View Report
  {
    path: '/viewReport/:id',
    name: 'viewReport',
    component: () => import('./views/ViewReport.vue'),
    props: true
  },

];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;