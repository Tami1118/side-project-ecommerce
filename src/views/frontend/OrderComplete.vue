<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <order-products></order-products>
      </div>
      <div class="col-6">
        <order-user></order-user>
      </div>
    </div>
  </div>
</template>

<script>
import orderProducts from "@/components/frontend/orderProducts.vue";
import orderUser from "@/components/frontend/orderUser.vue";

export default {
  components: {
    orderProducts,
    orderUser,
  },
};
</script>
