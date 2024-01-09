<template>
  <div class="container">
    <p>{{order.id}}</p>
    <p>{{order.create_at}}</p>
    <p>{{order.is_paid}}</p>
    <p>{{order.total}}</p>
  </div>
</template>

<script>
import orderStore from "@/stores/orderStore";
import cartStore from "@/stores/cartStore";
import { mapActions, mapState } from "pinia";

export default {
  methods: {
    ...mapActions(orderStore, ["getOrder", "getOrders"]),
    ...mapActions(cartStore, ["getCart"]),
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
