<template>
  <div class="container">
    <user-header></user-header>
    <router-view></router-view>
    <user-footer></user-footer>
  </div>
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