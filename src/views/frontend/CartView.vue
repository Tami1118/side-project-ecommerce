<script>
import cartList from "@/components/frontend/cartList.vue";
import orderForm from "@/components/frontend/orderForm.vue";

export default {
  components: {
    cartList,
    orderForm,
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <cart-list></cart-list>
      </div>
      <div class="col-12 col-md-6">
        <order-form></order-form>
      </div>
    </div>
  </div>
</template>