<template>
  <div class="">
    <!-- 1. breadcrumb -->
    <!-- <div class="bg-gray-100">
      <div class="container py-2 fs-3">
        首頁 / 商品介紹 / {{product.title}}
      </div>
    </div> -->

    <div class="bg-gray-100">
      <div class="container py-12 py-md-20">
        <div class="row g-0">
          <div class="col-md-6 mb-6 mb-md-0">
            <product-thumb :product="product"></product-thumb>
          </div>
          <div class="col-md-6">
            <product-info :product="product" :add-cart="addCart" :discount-news="discountNews"></product-info>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. content -->
    <div class="bg-white">
      <div class="container py-12 py-md-20">
        <ul class="nav nav-pills mb-3 justify-content-center gap-3" id="pills-tab" role="tablist">
          <li class="nav-item" style="min-width: 120px" role="presentation">
            <button class="nav-link w-100 active" id="pills-content-tab" data-bs-toggle="pill" data-bs-target="#pills-content" type="button" role="tab" aria-controls="pills-content" aria-selected="true">商品內容</button>
          </li>
          <li class="nav-item" style="min-width: 120px" role="presentation">
            <button class="nav-link w-100" id="pills-storage-tab" data-bs-toggle="pill" data-bs-target="#pills-storage" type="button" role="tab" aria-controls="pills-storage" aria-selected="false">保存方式</button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-content" role="tabpanel" aria-labelledby="pills-content-tab" tabindex="0">
            <product-content :product="product"></product-content>
          </div>
          <div class="tab-pane fade" id="pills-storage" role="tabpanel" aria-labelledby="pills-storage-tab" tabindex="0">
            <product-storage></product-storage>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. product swiper -->
    <div class="bg-gray-100">
      <div class="container py-12 py-md-20">
        <div class="d-flex flex-column align-items-center justify-content-center mb-8 mb-md-10">
          <h2 class="fs-6 fs-md-8 order-1">推薦商品</h2>
          <span class="fs-3 fs-md-3h fw-500 mb-2">Recommended Products</span>
        </div>
        <product-swiper></product-swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import productStore from "@/stores/productStore";
import cartStore from "@/stores/cartStore";
import couponStore from "@/stores/couponStore";
import productThumb from "@/components/frontend/productThumb.vue";
import productInfo from "@/components/frontend/productInfo.vue";
import productContent from "@/components/frontend/productContent.vue";
import productStorage from "@/components/frontend/productStorage.vue";
import productSwiper from "@/components/frontend/productSwiper.vue";

export default {
  components: {
    productThumb,
    productInfo,
    productContent,
    productStorage,
    productSwiper,
  },
  watch: {
    "$route.params": {
      immediate: true,
      handler() {
        if (this.$route.params.id) {
          this.showImage = "";
          this.getProductItem(this.$route.params.id);
          window.scrollTo(0, 0);
        }
      },
    },
  },
  mounted() {
    this.getProductItem(this.$route.params.id);
  },
  methods: {
    ...mapActions(productStore, ["getProductItem"]),
    ...mapActions(cartStore, ["addCart"]),
  },
  computed: {
    ...mapState(productStore, ["product"]),
    ...mapState(couponStore, ["discountNews"]),
  },
};
</script>