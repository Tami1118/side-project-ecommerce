<template>
  <div class="container py-3">
    <VForm class="d-flex flex-column gap-5" @submit="login" v-slot="{ errors }">
      <div v-for="item in loginFields" :key="item.id">
        <label :for="item.id" class="form-label">{{item.label}}</label>
        <VField :type="item.type"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model="user[item.model]"
                :placeholder="item.placeholder"
                class="form-control" />
        <ErrorMessage :name="item.name" class="invalid-feedback position-absolute" />
      </div>
      <!--
      <div>
        <label for="useremail" class="form-label">電子信箱</label>
        <VField id="useremail" name="電子信箱" :class="{'is-invalid': errors['電子信箱']}" rules="required|email" v-model="user.username" placeholder="請輸入電子信箱" class="form-control" />
        <ErrorMessage name="電子信箱" class="invalid-feedback position-absolute" />
      </div>
      -->
      <button type="submit" class="btn btn-primary">登入</button>
    </VForm>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env;
import { loginFields, localeSet } from "../mixins/fields.js";
import { Alert } from "@/mixins/swal.js";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loginFields,
    };
  },
  computed: {
    localeSet() {
      return localeSet;
    },
  },
  methods: {
    login() {
      const url = `${VITE_URL}/admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          // console.log("登入成功", res);
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.$router.push("/admin/products");
        })
        .catch(() => {
          // console.log("登入失敗", err)
          Alert.fire({
            icon: "warning",
            title: "權限不足，請重新登入",
          });
          this.user = {};
        });
    },
  },
};
</script>