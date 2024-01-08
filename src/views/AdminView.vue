<template>
  <div v-if="status" class="container py-3">
    <nav-view></nav-view>
    <router-view v-if="status"></router-view>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { Toast, Alert } from "@/mixins/swal.js";
const { VITE_URL } = import.meta.env;
import NavView from "@/layouts/admin/AdminHeader.vue";

export default {
  components: {
    NavView,
    RouterView,
  },
  data() {
    return {
      status: false,
    };
  },
  mounted() {
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
      this.$http.defaults.headers.common["Authorization"] = token;
      
      const url = `${VITE_URL}/api/user/check`;
      this.$http.post(url)
        .then((res) => {
          // console.log('管理者驗證', res)
          if (!res.data.success) {
            this.$router.push("/login");
            Alert.fire({
              icon: "warning",
              title: "權限不足，請重新登入",
            });
          } else {
            Toast.fire({
              icon: "success",
              title: "登入成功",
            });
            this.status = true;
          }
        })
        .catch(() => {
          this.$router.push("/login");
          Alert.fire({
            icon: "warning",
            title: "權限不足，請重新登入",
          });
        });
    },
  },
};
</script>