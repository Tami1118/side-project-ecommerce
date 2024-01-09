import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/frontend/ProductsView.vue')
      },
      {
        path: 'product/:id',
        meta: {title: 'product'},
        name: 'product',
        component: () => import('../views/frontend/ProductDetail.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/frontend/ArticlesView.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/frontend/ArticleDetail.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/CartView.vue'),
      },
      {
        // path: 'order/:id',
        path: 'order-pay/:id',
        component: () => import('../views/frontend/OrderPay.vue')
      },
      {
        path: 'order-complete/:id',
        component: () => import('../views/frontend/OrderComplete.vue')
      },
      {
        path: 'about',
        component: () => import('../views/frontend/AboutView.vue')
      },
      {
        path: 'faq',
        component: () => import('../views/frontend/FaqView.vue')
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsAdmin.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersAdmin.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/admin/ArticlesAdmin.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponsAdmin.vue')
      },
      {
        path: 'test',
        component: () => import('../views/admin/TestAdmin.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
