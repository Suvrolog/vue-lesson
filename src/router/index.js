import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../App.vue'

const routes = [
  {
    path: '/',
    name: 'null',
    redirect:'/home',
    component: HomeComponent
  },
  {
    path: '/home',
    name: 'home',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/HomePage.vue')
  },
  {
    path: '/products/:id',
    name: 'Item',
    params: {},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TaskList" */ '../pages/ItemPage.vue')
  },
  {
    path: '/category',
    name: 'Category',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TaskList" */ '../pages/CategoryPage.vue')
  },
  {
    path: '/basket',
    name: 'Basket',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TaskList" */ '../pages/BasketPage.vue')
  },
  {
    path: '/about',
    name: 'About',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/AboutPage.vue')
  },
  {
    path: '/news',
    name: 'News',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/NewsPage.vue')
  },
  {
    path: '/productNumber',
    name: 'Product',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TaskList" */ '../pages/ProductNumber.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "error404" */ '../pages/Error404Page.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
