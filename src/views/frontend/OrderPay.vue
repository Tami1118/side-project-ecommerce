<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <p>{{order.id}}</p>
        <p>{{order.create_at}}</p>
        <p>{{order.is_paid}}</p>
        <p>{{order.total}}</p>
      </div>
      <div class="col-6">
        <p>{{user.address}}</p>
        <p>{{user.email}}</p>
        <p>{{user.name}}</p>
        <p>{{user.tel}}</p>
      </div>
      <button type="button" class="btn btn-primary" @click.prevent="payOrder(order.id)">確認付款</button>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import orderStore from "@/stores/orderStore";
import cartStore from "@stores/cartStore";
import { mapActions, mapState } from "pinia";
import { Alert } from "@/mixins/swal";

export default {
  methods: {
    ...mapActions(orderStore, ["getOrder", "getOrders"]),
    ...mapActions(cartStore, ["getCart"]),
    
    // 訂單付款
    payOrder() {
      const id = this.$route.params.id
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`;
      // console.log('payOrder 訂單付款', url)

      this.$http
        .post(url)
        .then((res) => {
          console.log("payOrder 成功訂單付款", res);
          this.$router.push(`/order-complete/${id}`);
          this.getOrder(id);
          this.getCart()
        })
        .catch((err) => {
          console.log("payOrder 失敗", err.response);
          Alert.fire({
            title: "資料有誤，請稍後再試一次",
            icon: "error",
          });
        });
    },
  },
  computed: {
    ...mapState(orderStore, ["order", "user"]),
  },
  mounted() {
    this.getOrders();
    this.getOrder(this.$route.params.id);
  },
};
</script>
