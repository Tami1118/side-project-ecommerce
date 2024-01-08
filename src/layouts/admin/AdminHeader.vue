<template>
  <div>
    <nav class="d-flex align-items-center gap-3">
      <router-link to="/admin/products">產品管理</router-link>
      <router-link to="/admin/orders">訂單管理</router-link>
      <router-link to="/admin/coupons">優惠券管理</router-link>
      <router-link to="/admin/articles">文章管理</router-link>
      <router-link to="/admin/test">測試</router-link>
      <router-link to="/">前台首頁</router-link>
      <button class="btn btn-primary ms-auto" @click="logout">登出</button>
    </nav>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { Toast } from "@/mixins/swal.js";
const { VITE_URL } = import.meta.env;

export default {
  components: {
    RouterLink,
  },
  methods: {
    logout() {
      const url = `${VITE_URL}/logout`;
      this.$http.post(url).then(() => {
        // console.log('登入' ,res);
        this.$router.push("/login");
        Toast.fire({
          icon: "success",
          title: "成功登出",
        });
      });
    },
  },
};
</script>