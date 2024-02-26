<template>
  <nav class="d-fixed top-0 start-0 w-100 h-100 bg-gray-900 text-white">
    <div class="position-sticky top-0 p-4 vh-lg-100 d-flex flex-column justify-content-center justify-content-lg-start align-items-center align-items-lg-start">
      <RouterLink to="/" class="mb-10 text-white">首頁 logo</RouterLink>
      <ul class="d-flex flex-column gap-4 h-100 list-unstyled">
        <li><RouterLink to="/admin/products" class="ps-3 menu-hover" :class="pathName === 'products' ? 'text-secondary menu-list-decorate':''"><i class="fi fi-sr-bread me-2"></i>產品管理</RouterLink></li>
        <li><RouterLink to="/admin/orders" class="ps-3 menu-hover" :class="pathName === 'orders' ? 'text-secondary menu-list-decorate':''"><i class="fi fi-ss-notebook me-2"></i>訂單管理</RouterLink></li>
        <li><RouterLink to="/admin/coupons" class="ps-3 menu-hover" :class="pathName === 'coupons' ? 'text-secondary menu-list-decorate':''"><i class="fi fi-sr-badge-percent me-2"></i>優惠管理</RouterLink></li>
        <li><RouterLink to="/admin/articles" class="ps-3 menu-hover" :class="pathName === 'articles' ? 'text-secondary menu-list-decorate':''"><i class="fi fi-ss-newspaper me-2"></i>文章管理</RouterLink></li>
        <li><RouterLink to="/admin/test" class="ps-3 menu-hover" :class="pathName === 'test' ? 'text-secondary menu-list-decorate':''">測試</RouterLink></li>
      </ul>
      <button class="btn btn-secondary mt-auto" @click="logout()"><i class="fi fi-br-sign-out-alt me-2"></i>登出</button>
    </div>
  </nav>
</template>

<style lang="scss">
.menu-hover { 
  color: white;

  &:hover {
    color: #cbd5e1;
  }
}

.menu-list-decorate{
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 4px;
    height: 100%;
    background-color: #A67F58;
    border-radius: 2px;
  }
}
</style>

<script>
import { RouterLink } from "vue-router";
import { Toast, Alert } from "@/mixins/swal.js";
const { VITE_URL } = import.meta.env;

export default {
  components: {
    RouterLink,
  },
  data(){
    return {
      pathName: '',
    }
  },
  mounted(){
    this.getPath()
  },
  watch: {
    '$route.name': function (n){
      if(n) this.getPath()
    }
  },
  methods: {
    getPath(){
      this.pathName = this.$route.name
    },
    logout() {
      const url = `${VITE_URL}/logout`;
      this.$http.post(url)
        .then(() => {
          // console.log('登出' ,res);
          this.$router.push("/login");
          Toast.fire({
            icon: "success",
            title: "已登出",
          });
        })
        .catch(()=> {
          Alert.fire({
            icon: "error",
            title: "請稍後再試一次"
          })
        })
    },
  },
};
</script>