<script>
import homeBanner from '@/components/frontend/home/homeBanner.vue';
import homeAbout from '@/components/frontend/home/homeAbout.vue';
import homeProduct from '@/components/frontend/home/homeProduct.vue';
import homeArticle from '@/components/frontend/home/homeArticle.vue';

export default {
  components: {
    homeBanner,
    homeAbout,
    homeProduct,
    homeArticle,
  }
}
</script>

<template>
  <home-banner></home-banner>
  <home-about></home-about>
  <home-product></home-product>
  <home-article></home-article>
</template>