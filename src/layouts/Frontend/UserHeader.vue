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
      <router-link to="/admin/products">後台產品</router-link>
    </nav>

    <div class="position-relative">
      <button class="btn p-0" style="cursor: pointer;">購物車</button>
      <span class="badge bg-danger position-absolute top-100 start-100 translate-middle z-3">{{cartNum}}</span>
    </div>
  </div>
</template>