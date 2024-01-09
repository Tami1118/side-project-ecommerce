<script>
import { mapState } from "pinia";
import cartStore from "@/stores/cartStore";

export default {
  computed: {
    ...mapState(cartStore, ["cartNum"]),
  },
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <nav class="d-flex gap-3">
      <router-link to="/">首頁</router-link>
      <router-link to="/products">全部產品</router-link>
      <router-link to="/about">商店介紹</router-link>
      <router-link to="/articles">最新消息</router-link>
      <router-link to="/faq">常見問題</router-link>
      <router-link to="/guideline">Guideline</router-link>
      <router-link to="/admin/products">後台產品</router-link>
    </nav>

    <div class="position-relative">
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        購物車
      </button>
      <span class="badge bg-danger position-absolute top-100 start-100 translate-middle z-3">{{cartNum}}</span>
    </div>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      
      <router-link to="/cart" class="btn btn-primary" style="cursor: pointer;">購物車</router-link>
    </div>
  </div>
</template>