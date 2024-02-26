<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore.js";
import orderStep from "@/components/frontend/orderStep.vue"
import cartList from "@/components/frontend/cartList.vue";
import orderForm from "@/components/frontend/orderForm.vue";
import orderCoupon from "@/components/frontend/orderCoupon.vue";
import productSwiper from "@/components/frontend/productSwiper.vue";

export default {
  components: {
    orderStep,
    cartList,
    orderForm,
    orderCoupon,
    productSwiper,
  },
  methods: {
    ...mapActions(cartStore, ["clearCart"]),
    address(){
      const url = 'https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json'
      this.$http.get(url)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(cartStore, ["cartNum"]),
  },
};
</script>

<template>
  <div class="bg-gray-100">
    <div class="container py-10">
      <button @click="address">取得地址</button>
      <div class="row g-0">
        <div class="col-12 p-12">
          <order-step></order-step>
        </div>
        <div v-if="cartNum !== 0" class="col-12 col-lg-6 h-fit-content">
          <div class="p-0 p-md-8 p-lg-12 mb-6 mb-md-0">
            <div class="d-flex flex-column gap-3">
              <h2 class="fs-4h fs-md-5 mb-2">確認購物車內容</h2>
              <cart-list></cart-list>
              <button class="btn p-0 text-gray-500 ms-auto text-decoration-underline" @click="clearCart">清空購物車</button>
              <order-coupon></order-coupon>
            </div>
          </div>
        </div>
        <div v-if="cartNum !== 0" class="col-12 col-lg-6 h-fit-content">
          <div class="p-0 p-md-8 p-lg-12">
            <div class="d-flex flex-column gap-3">
              <h2 class="fs-4h fs-md-5 mb-2">填寫訂購人資料</h2>
              <order-form></order-form>
            </div>
          </div>
        </div>
        <div v-else class="col-12">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <i class="fi fi-ss-shopping-bag text-gray-400" style="font-size: 64px"></i>
            <h2 class="fs-5 mb-4">您的購物車沒有東西唷！</h2>
            <router-link to="/products" class="btn btn-primary">去購物</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="container py-10 py-lg-20">
      <div class="d-flex flex-column align-items-center justify-content-center mb-8 mb-md-10">
        <h2 class="fs-6 fs-md-8 order-1">推薦商品</h2>
        <span class="fs-3 fs-md-3h fw-500 mb-2">Recommended Products</span>
      </div>
      <product-swiper></product-swiper>
    </div>
  </div>
</template>