import { createRouter, createWebHistory } from 'vue-router'
import CategoryQueryView from '../views/CategoryQueryView.vue'
import SelectCategoryView from '../views/SelectCategoryView.vue'

const routes = [
  {
    path: '/',
    component: SelectCategoryView
  },
  {
    path: '/:category',
    component: CategoryQueryView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
