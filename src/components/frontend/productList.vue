<script>
import { mapActions, mapState } from "pinia";
import productStore from "@/stores/productStore";
import cartStore from "@/stores/cartStore";

export default {
  methods: {
    ...mapActions(productStore, ["getProducts"]),
    ...mapActions(cartStore, ["addCart"]),
  },
  computed: {
    ...mapState(productStore, ["products", "filterProducts"]),
  },
};
</script>

<template>
  <template v-if="Array.isArray(products)">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 mt-0">
      <div class="col" v-for="item in filterProducts" :key="item.id">
        <router-link :to="`/product/${item.id}`" class="product-card card border-0 h-100">
          <div class="position-relative overflow-hidden">
            <div style="height: 296px" class="img-gradient overflow-hidden">
              <img class="h-100 w-100 object-fit-cover object-position-center" :src="item.imageUrl" :alt="item.title">
            </div>
            <a href="#" @click.prevent="addCart(item)" class="btn-add position-absolute start-0 w-100 btn btn-primary py-2 z-3">
              <i class="fi fi-ss-shopping-bag-add me-2"></i>加入購物車
            </a>
          </div>
          <div class="p-4">
            <h3 class="fs-5 text-center mb-2">{{item.title}}</h3>
            <div class="d-flex flex-column align-items-center">
              <div class="fs-4 fw-600 text-secondary">NT$ {{item.price}}</div>
              <del v-if="item.price !== item.origin_price" class="fs-3h fw-400 text-gray-500">NT$ {{item.origin_price}}</del>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </template>

  <template v-else>
    <div>
      商品上架中，請敬請期待！
    </div>
  </template>
</template>