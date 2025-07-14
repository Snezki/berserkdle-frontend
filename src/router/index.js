import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Classic from '../views/ClassicView.vue';
import Quote from '../views/QuoteView.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/classic', name: 'classic', component: Classic },
  { path: '/quote', name: 'quote', component: Quote }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;