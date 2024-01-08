<template>
  <!-- 1. breadcrumb => component -->

  <div class="row">
    <div class="col-md-3">
      <product-nav></product-nav>
    </div>

    <div class="col-md-9">
      <product-sort></product-sort>
      <product-list></product-list>
      <page-component :pagination="pagination" :get-pages="getProducts"></page-component>
    </div>
  </div>

  <cart-list></cart-list>
</template>


<script>
import { mapActions, mapState } from "pinia";
import productStore from "@/stores/productStore.js";
import productNav from "@/components/frontend/productNav.vue";
import productSort from "@/components/frontend/productSort.vue";
import productList from "@/components/frontend/productList.vue";
import pageComponent from "@/components/pageComponent.vue";
import cartList from "@/components/frontend/cartList.vue";

export default {
  components: {
    pageComponent,
    productNav,
    productSort,
    productList,
    cartList
  },
  mounted() {
    this.getProducts();
    this.getProductAll();
  },
  methods: {
    ...mapActions(productStore, ["getProducts", "getProductAll"]),
  },
  computed: {
    ...mapState(productStore, ["products", "pagination"]),
  },
};
</script>