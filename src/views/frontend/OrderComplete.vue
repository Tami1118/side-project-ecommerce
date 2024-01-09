<template>
  <div class="container">
    <div class="d-flex">
      <router-link to="/" class="btn btn-outline-primary">回首頁</router-link>
      <router-link to="/products" class="btn btn-primary">繼續購物</router-link>
    </div>
    <div class="row">
      <div class="col-6">
        <order-products></order-products>
      </div>
      <div class="col-6">
        <order-user></order-user>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import orderProducts from "@/components/frontend/orderProducts.vue";
import orderUser from "@/components/frontend/orderUser.vue";

export default {
  components: {
    RouterLink,
    orderProducts,
    orderUser,
  },
};
</script>
