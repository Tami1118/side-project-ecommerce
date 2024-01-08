<script>
import { mapActions } from "pinia";
import orderStore from "@/stores/orderStore.js";

export default {
  methods: {
    ...mapActions(orderStore, [
      "getOrders",
      "getOrder",
      "createOrder",
      "payOrder",
    ]),
  },
};

// {
//   "data": {
//     "user": {
//       "name": "test",
//       "email": "test@gmail.com",
//       "tel": "0912346768",
//       "address": "kaohsiung"
//     },
//     "message": "這是留言"
//   }
// }
</script>

<template>
  <div>
    <form action="" class="flex flex-column">
      <div>
        <label for="" class="form-label">姓名</label>
        <input type="text" id="" class="form-control" placeholder="請輸入真實姓名">
      </div>
      <div>
        <label for="" class="form-label">姓名</label>
        <input type="text" id="" class="form-control" placeholder="請輸入真實姓名">
      </div>
      <div>
        <label for="" class="form-label">姓名</label>
        <input type="text" id="" class="form-control" placeholder="請輸入真實姓名">
      </div>
      <div>
        <label for="" class="form-label">姓名</label>
        <input type="text" id="" class="form-control" placeholder="請輸入真實姓名">
      </div>
    </form>
    <button @click="getOrders" class="btn btn-primary">getOrders</button>
    <button @click="getOrder" class="btn btn-primary">getOrder</button>
    <button @click="createOrder" class="btn btn-primary">createOrder</button>
    <button @click="payOrder" class="btn btn-primary">payOrder</button>
    <!-- schedule -->
    <!-- orderInfo -->
    <!-- orderForm -->
  </div>
</template>