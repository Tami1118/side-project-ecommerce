<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";

export default {
  mounted(){
    this.getCart()
  },
  methods: {
    ...mapActions(cartStore, ["getCart"])
  },
  computed: {
    ...mapState(cartStore, ["cartNum"]),
  },
};
</script>

<template>
  <div class="position-fixed top-0 start-0 w-100 z-3">
    <nav class="navbar navbar-expand-lg bg-white bg-opacity-75 filter-blur-5">
      <div class="container">
        <router-link class="text-decoration-none text-primary" to="/" style="font-family: 'OpenFont'; font-size: 20px">甜福園</router-link>
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
              <button class="btn" type="button"><i class="fi fi-ss-shopping-bag"></i></button>
              <span class="position-absolute top-0 start-90 translate-middle bg-primary text-white block rounded-pill px-2 fw-600" style="font-size: 14px">{{ cartNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/util/_helper.scss";

.nav-link {
  position: relative;
  color: $gray-500;

  &.active, &:focus {
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
  &.active, &:focus {
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