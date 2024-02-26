<template>
  <swiper :modules="modules"
          :pagination="{
            el: '.recommend-swiper-pagination',
            clickable: true
          }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          :slidesPerView="1" :spaceBetween="20" :breakpoints="{
            '768': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '992': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '1400': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
          class="recommend-swiper">

    <!-- navigation -->
    <div class="d-none d-md-flex">
      <span class="swiper-button-prev material-symbols-outlined bg-primary text-white rounded-circle" style="height: 40px; width: 40px">chevron_left</span>
      <span class="swiper-button-next material-symbols-outlined bg-primary text-white rounded-circle" style="height: 40px; width: 40px">chevron_right</span>
    </div>

    <!-- pagination -->
    <div class="swiper-buttons d-flex align-items-center justify-content-center mt-4">
      <div class="recommend-swiper-pagination d-flex w-auto mx-2"></div>
    </div>

    <swiper-slide v-for="(item) in productSwiper" :key="item.id">
      <router-link :to="`/product/${item.id}`" class="product-card card border-0 h-100">
        <div class="position-relative overflow-hidden">
          <div style="height: 296px" class="img-gradient overflow-hidden">
            <img class="h-100 w-100 object-fit-cover object-position-center" :src="item.imageUrl" :alt="item.title">
          </div>
          <a href="#" @click.prevent="addCart(item)" class="d-none d-lg-block btn-add position-absolute start-0 w-100 btn btn-primary py-2 z-3">
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
        <a href="#" @click.prevent="addCart(item)" class="d-lg-none btn btn-primary py-2 z-3">
          <i class="fi fi-ss-shopping-bag-add me-2"></i>加入購物車
        </a>
      </router-link>
    </swiper-slide>
  </swiper>
</template>


<script>
import productStore from "@/stores/productStore";
import cartStore from "@/stores/cartStore";
import { mapActions, mapState } from "pinia";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  methods: {
    ...mapActions(productStore, ["getProductAll"]),
    ...mapActions(cartStore, ["addCart"]),
  },
  computed: {
    ...mapState(productStore, ["productSwiper"]),
  },
  mounted() {
    this.getProductAll();
  },
};
</script>
