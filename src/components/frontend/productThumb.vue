<template>
  <swiper :modules="modules"
          :spaceBetween="10"
          :thumbs="{ swiper: thumbsSwiper }"
          style="height: 356px"
          class="productImage-show-swiper mb-2">
    <swiper-slide v-for="item in product.imagesUrl" :key="item">
      <img :src="item" :alt="product.title" />
    </swiper-slide>
  </swiper>

  <swiper :modules="modules"
          :spaceBetween="10"
          :slidesPerView="3"
          :breakpoints="{
            '992': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1400': {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          @swiper="setThumbsSwiper"
          :freeMode="true"
          style="height: 100px"
          class="productImage-list-swiper">

    <span class="swiper-button-prev material-symbols-outlined text-white h-100">chevron_left</span>
    <span class="swiper-button-next material-symbols-outlined text-white h-100">chevron_right</span>

    <!-- <swiper-slide>
      <img :src="product.imageUrl" :alt="product.title">
    </swiper-slide> -->
    <swiper-slide v-for="item in product.imagesUrl" :key="item">
      <img :src="item" :alt="product.title" />
    </swiper-slide>
  </swiper>
</template>


<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default {
  props: ["product"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data(){
    return {
      thumbsSwiper: null,
      modules: [FreeMode, Navigation, Thumbs],
    }
  },
  methods: {
    setThumbsSwiper(swiper){
      this.thumbsSwiper = swiper
    }
  },
};
</script>
