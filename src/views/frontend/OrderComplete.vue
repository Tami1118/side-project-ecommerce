<script>
import { mapActions, mapState } from "pinia";
import orderStore from "@/stores/orderStore";
import orderProducts from "@/components/frontend/orderProducts.vue";
import orderUser from "@/components/frontend/orderUser.vue";

export default {
  components: {
    orderProducts,
    orderUser,
  },
  methods: {
    ...mapActions(orderStore, ["getOrder"]),
  },
  computed: {
    ...mapState(orderStore, ["order", "user", "origin_total"]),
  },
  mounted() {
    console.log(this.$route);
    this.getOrder(this.$route.params.id);
  },
};
</script>

<template>
  <div class="bg-gray-100">
    <div class="container py-10">
      <div class="row g-0">
        <div class="col-12 p-12">
          <!-- step -->
        </div>

        <div class="col-12">
          <div class="d-flex gap-2 flex-column justify-content-center align-items-center p-12">
            <h2 class="fs-5 fs-md-6">完成訂購</h2>
            <p>感謝您的訂購，提醒您請於預定時間至 <span class="text-success fw-500">{{user.address}}</span> 取貨唷！</p>
            <div>
              <router-link to="/" class="btn btn-primary me-3">回首頁</router-link>
              <router-link to="/products" class="btn btn-primary">繼續購物</router-link>
            </div>
            <img style="max-width: 320px" src="../../../public/image/RunningDoodle.png" alt="">
          </div>
        </div>

        <div class="col-12 col-lg-6 h-fit-content">
          <div class="p-0 p-md-8 p-lg-12 mb-6 mb-md-0">
            <div class="d-flex flex-column gap-3">
              <h2 class="fs-4h fs-md-5 mb-2">訂單內容
                <span class="fw-600" :class="order.is_paid? 'text-success':'text-danger'">({{order.is_paid? "已付款":"未付款"}})</span>
              </h2>
              <order-products :order="order" :origin-total="origin_total"></order-products>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6 h-fit-content">
          <div class="p-0 p-md-8 p-lg-12">
            <div class="d-flex flex-column gap-3">
              <h2 class="fs-4h fs-md-5 mb-2">訂購人資料</h2>
              <order-user :order="order" :user="user"></order-user>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>