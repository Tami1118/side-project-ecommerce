<template>
  <!-- <user-header></user-header> -->
  <router-view></router-view>
  <user-footer></user-footer>
</template>

<script>
import { RouterView } from "vue-router";
// import UserHeader from "@/layouts/Frontend/UserHeader.vue";
import UserFooter from "@/layouts/Frontend/UserFooter.vue";

export default {
  components: {
    RouterView,
    // UserHeader,
    UserFooter,
  },
  watch: {
    // 待處理
    "$route.path": {
      immediate: true,
      handler() {
        if (this.$route.path) {
          window.scrollTo(0, 0);
        }
      },
    },
  },
};
</script>