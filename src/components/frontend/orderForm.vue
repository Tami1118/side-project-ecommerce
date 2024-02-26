<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import { userFields, localeSet } from "@/mixins/fields";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        address: "",
        tel: "",
      },
      message: "",
      storeList: ["板橋總店", "中山店", "台北店", "萬華店", "中和店", "新莊店"],
      orderId: "",
      userFields,
      localeSet,
    };
  },

  methods: {
    createOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/order`;
      const data = {
        user: this.user,
        message: this.message,
      };

      this.$http.post(url, { data })
        .then((res) => {
          console.log("createOrder 成功", res);
          this.orderId = res.data.orderId;
          this.$router.push(`/order-pay/${this.orderId}`);
        })
        .catch((err) => {
          console.log("createOrder 失敗", err.response.data);
        });
    },
  },
};
</script>

<template>
  <div class="bg-white bg-opacity-75 py-10 px-4 px-md-8 px-lg-12">
    <VForm class="d-flex flex-column gap-2" v-slot="{ errors }" @submit="createOrder">
      <div v-for="item in userFields" :key="item.id" class="position-relative pb-5">
        <label :for="item.id" class="form-label">{{item.label}}</label>
        <span v-if="item.required" class="text-danger"> *</span>
        
        <!-- input -->
        <VField v-if="item.as === 'input' || item.type === 'text'"
                :type="item.type"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model="user[item.model]"
                :placeholder="item.placeholder"
                class="form-control" />

        <!-- select -->
        <VField v-else-if="item.as === 'select'"
                :as="item.as"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model="user[item.model]"
                :placeholder="item.placeholder"
                class="form-select">
          <option value="" selected>請選擇</option>
          <option v-for="option in item.options" :key="option" :value="option">{{option}}</option>
        </VField>

        <!-- textarea -->
        <VField v-else-if="item.as === 'textarea'"
                :as="item.as"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model="message"
                :placeholder="item.placeholder"
                class="form-control"
                cols="30" rows="3" />

        <ErrorMessage :name="item.name"
                      class="invalid-feedback fs-3 position-absolute bottom-0 start-0" />
      </div>

      <div class="d-flex justify-content-between">
        <router-link to="/products" class="btn btn-primary">繼續購物</router-link>
        <button type="submit" class="btn btn-primary">確認訂單</button>
      </div>
    </VForm>
  </div>
</template>