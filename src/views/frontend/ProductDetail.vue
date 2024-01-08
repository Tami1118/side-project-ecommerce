<template>
  <div>
    <!-- 1. breadcrumb -->

    <!-- 2. product info -->
    <!-- imageUrl, imagesUrl -->
    <!-- title, category, description, origin_price, price -->
    <!-- addToCart, number -->
    <div class="row">
      <div class="col-md-4">
        <div class="d-flex">
          <ul class="d-flex flex-column list-unstyled">
            <li v-for="(item, key) in product.imagesUrl" :key="key">
              <img :src="item" alt="" style="max-width: 20px">
            </li>
          </ul>
          <img :src="product.imageUrl" alt="" class="w-100">
        </div>
      </div>
      <div class="col-md-8">
        {{product.title}}
        {{product.category}} <br>
        <select name="" id="" v-model="qty" class="form-select">
          <option v-for="i in 50" :value="i" :key="i">{{i}}</option>
        </select>

        <button type="button" @click="addCart(product, qty)" class="btn btn-primary w-100">加入購物車</button>
      </div>
    </div>

    <!-- 3. content -->

    <!-- 4. product swiper -->
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import productStore from "@/stores/productStore";
import cartStore from '@/stores/cartStore';

export default {
  data(){
    return {
      qty: 1
    }
  },
  watch: {
    "qty"(){
      return this.product.qty
    }
  },
  mounted() {
    this.getProductItem(this.$route.params.id);
  },
  methods: {
    ...mapActions(productStore, ["getProductItem"]),
    ...mapActions(cartStore, ["addCart"])
  },
  computed: {
    ...mapState(productStore, ["product"]),
  },
};
</script>