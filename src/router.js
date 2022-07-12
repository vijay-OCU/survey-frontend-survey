import { createWebHistory, createRouter } from 'vue-router';
const routes = [
  {
    path: '/albums',
    alias: '/',
    name: 'albums',
    component: () => import('./views/AlbumsList.vue'),
    props: true,
  },
  {
    path: '/albums/:id/edit',
    name: 'editAlbum',
    component: () => import('./views/EditAlbum.vue'),
    props: true,
  },
  {
    path: '/addAlbum',
    name: 'addAlbum',
    component: () => import('./views/AddAlbum.vue'),
  },
  {
    path: '/albums/:id/tracks',
    name: 'view',
    component: () => import('./views/ViewAlbum.vue'),
    props: true,
  },
  {
    path: '/albums/:albumId/addTrack',
    name: 'addTrack',
    component: () => import('./views/AddTrack.vue'),
    props: true,
  },
  {
    path: '/albums/:albumId/tracks/:trackId/editTrack/',
    name: 'editTrack',
    component: () => import('./views/EditTrack.vue'),
    props: true,
  },
  {
    path: '/artists',
    name: 'artists',
    component: () => import('./views/ArtistsList.vue'),
    props: true,
  },
  {
    path: '/addArtist',
    name: 'addArtist',
    component: () => import('./views/AddArtist.vue'),
  },
  {
    path: '/artists/:id/edit',
    name: 'editArtist',
    component: () => import('./views/EditArtist.vue'),
    props: true,
  },
  {
    path: '/artists/:artistName/:artistId',
    name: 'viewArtist',
    component: () => import('./views/AlbumsList.vue'),
    props: true,
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
