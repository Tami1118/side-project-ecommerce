<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";
import cartList from '@/components/frontend/cartList.vue';

export default {
  components: {
    cartList
  },
  data() {
    return {
      isCart: false,
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    ...mapActions(cartStore, ["getCart","updateCartItem","deleteCartItem","clearCart",]),
    toggleCart() {
      this.isCart = !this.isCart;
    },
  },
  computed: {
    ...mapState(cartStore, ["cartNum", "carts", "total"]),
    transformValue() {
      return this.isCart ? "translateX(0%)" : "translateX(100%)";
    },
  },
};
</script>

<template>
  <div class="position-fixed top-0 start-0 w-100" style="z-index: 100">
    <nav class="navbar navbar-expand-lg bg-white bg-opacity-75 filter-blur-5">
      <div class="container">
        <router-link class="text-decoration-none text-primary" to="/" style="font-size: 20px">甜福園</router-link>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fi fi-br-menu-burger"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav gap-3 m-auto mb-2 mb-lg-0">
            <li class="nav-item"><router-link class="nav-link" :class="{'active': $route.path === '/products'}" to="/products">商品介紹</router-link></li>
            <li class="nav-item"><router-link class="nav-link" :class="{'active': $route.path === '/articles'}" to="/articles">最新消息</router-link></li>
            <li class="nav-item"><router-link class="nav-link" :class="{'active': $route.path === '/faq'}" to="/faq">常見問題</router-link></li>
            <li class="nav-item"><router-link class="nav-link" :class="{'active': $route.path === '/guideline'}" to="/guideline">Guideline</router-link></li>
            <li class="nav-item"><router-link class="nav-link" :class="{'active': $route.path === '/admin/products'}" to="/admin/products">後台產品</router-link></li>
          </ul>

          <div class="d-flex gap-3">
            <button class="btn" type="button"><i class="fi fi-br-search"></i></button>
            <div class="position-relative">
              <button class="btn" type="button" data-bs-toggle="offcanvas" href="#cartOffcanvas" role="button" aria-controls="cartOffcanvas">
                <i class="fi fi-ss-shopping-bag"></i>
              </button>
              <span class="position-absolute top-0 start-90 translate-middle bg-danger text-white block rounded-pill px-2 fw-600" style="font-size: 14px">{{ cartNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- 待處理：跨頁時， offcavans 無法關閉 -->
  <div class="offcanvas offcanvas-end bg-gray-800" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-gray-400 fs-4" id="cartOffcanvasLabel">購物車</h5>
      <button type="button" class="btn p-0 d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
        <span class="material-symbols-outlined text-gray-400 fs-6">close</span>
      </button>
    </div>
    <div class="offcanvas-body">
      <template v-if="cartNum !== 0">
        <div class="text-white">
          <cart-list></cart-list>
        </div>
        
        <div class="d-flex flex-column">
          <router-link to="/cart" @click="toggleCart" class="btn btn-primary w-100 mt-3 py-3">前往結帳</router-link>
          <button class="link-gray-400 text-decoration-underline btn mt-3 me-auto" @click="clearCart">清空購物車</button>
        </div>
      </template>
      <template v-else>
        <div class="text-white d-flex flex-column align-items-center pt-10">
          <i class="fi fi-ss-shopping-bag fs-6"></i>
          購物車內沒有商品
          <router-link class="btn btn-outline-primary mt-10" to="/products">來去挑選商品</router-link>
        </div>
      </template>
    </div>
  </div>
</template>



<style lang="scss">
@import "../../assets/scss/util/_helper.scss";

.block {
  display: block;
}

.nav-link {
  position: relative;
  color: $gray-500;

  &.active,
  &:focus {
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 4px;
      width: 60%;
    }
  }
  &.active,
  &:focus {
    font-weight: 600;
    &:after {
      background-color: $primary;
    }
  }

  &:hover {
    color: $primary;
    font-weight: 600;
  }
}

.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show {
  color: $primary;
}
</style>