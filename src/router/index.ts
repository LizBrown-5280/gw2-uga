import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import GW2HomeView from '../pages/GW2HomeView.vue'
import { WalletComponent, InventoriesComponent } from '../components/gw2/containers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gw2Home',
      name: 'gw2Home',
      component: GW2HomeView,
      children: [
        {
          path: 'wallet',
          name: 'wallet',
          component: WalletComponent,
        },
        {
          path: 'inventories',
          name: 'inventories',
          component: InventoriesComponent,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutView.vue'),
    },
  ],
})

export default router
