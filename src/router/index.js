import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        meta: { title: '首頁' },
        component: () => import('../views/frontend/HomeView.vue')
      },
      {
        path: 'products',
        meta: { title: '商品介紹' },
        component: () => import('../views/frontend/ProductsView.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        meta: { title: '' },
        component: () => import('../views/frontend/ProductDetail.vue')
      },
      {
        path: 'articles',
        meta: { title: '最新消息' },
        component: () => import('../views/frontend/ArticlesView.vue')
      },
      {
        path: 'article/:id',
        name: 'article',
        meta: { title: '' },
        component: () => import('../views/frontend/ArticleDetail.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        meta: { title: '購物車' },
        component: () => import('../views/frontend/CartView.vue'),
      },
      {
        path: 'order-pay/:id',
        name: 'order-pay',
        meta: { title: '確認付款' },
        component: () => import('../views/frontend/OrderPay.vue')
      },
      {
        path: 'order-complete/:id',
        name: 'order-complete',
        meta: { title: '訂單已成立' },
        component: () => import('../views/frontend/OrderComplete.vue')
      },
      {
        path: 'about',
        name: 'about',
        meta: { title: '商店介紹' },
        component: () => import('../views/frontend/AboutView.vue')
      },
      {
        path: 'faq',
        name: 'faq',
        meta: { title: '常見問題' },
        component: () => import('../views/frontend/FaqView.vue')
      },
      {
        path: 'guideline',
        name: 'guideline',
        meta: { title: '測試頁面' },
        component: () => import('../views/frontend/GuidelineView.vue')
      },
      {
        path: 'login',
        name: 'login',
        meta: { title: '登入' },
        component: () => import('../views/LoginView.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        meta: { title: '錯誤頁面' },
        component: () => import('../views/NotFound.vue')
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        meta: { title: '商品管理' },
        component: () => import('../views/admin/ProductsAdmin.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        meta: { title: '訂單管理' },
        component: () => import('../views/admin/OrdersAdmin.vue')
      },
      {
        path: 'articles',
        name: 'articles',
        meta: { title: '文章管理' },
        component: () => import('../views/admin/ArticlesAdmin.vue')
      },
      {
        path: 'coupons',
        name: 'coupons',
        meta: { title: '優惠券管理' },
        component: () => import('../views/admin/CouponsAdmin.vue')
      },
      {
        path: 'test',
        name: 'test',
        meta: { title: '測試頁面' },
        component: () => import('../views/admin/TestAdmin.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
})

router.beforeEach((to) => {
  document.title = `${to.meta.title}-甜福園` || '甜福園';
})

export default router
