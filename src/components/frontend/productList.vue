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
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col" v-for="item in filterProducts" :key="item.id">
        <router-link :to="`/product/${item.id}`" class="card" style="text-decoration: none;">
          <img :src="item.imageUrl" style="height: 180px" class="card-img-top object-fit-cover" :alt="item.title">
          <div class="card-body">
            <h3 class="card-title">{{item.title}}</h3>
            <span class="badge bg-theme-primary text-primary">{{item.category}}</span>
            <div class="d-flex gap-3">
              <div class="text-danger fw-bold">NT$ {{item.price}}</div>
              <div class="text-decoration-line-through text-muted">{{item.origin_price}}</div>
            </div>
            <a href="#" @click.prevent="addCart(item)" class="btn btn-primary w-100">加入購物車</a>
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
