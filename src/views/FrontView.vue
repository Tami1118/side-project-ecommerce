<template>
  <user-header></user-header>
  <div style="padding-top: 74px">
    <router-view></router-view>
  </div>
  <user-footer></user-footer>
</template>

<script>
import { RouterView } from "vue-router";
import UserHeader from "@/layouts/Frontend/UserHeader.vue";
import UserFooter from "@/layouts/Frontend/UserFooter.vue";

export default {
  components: {
    RouterView,
    UserHeader,
    UserFooter,
  },
};
</script>