<script>
import { mapActions, mapState } from 'pinia'
import orderStore from "@/stores/orderStore"

export default {
  methods: {
    ...mapActions(orderStore, ["getOrder"])
  },
  computed: {
    ...mapState(orderStore, ["order"])
  },
  mounted(){
    this.getOrder(this.$route.params.id)
  }
}
</script>

<template>
  <div>
    我是完成訂單
    {{order.user}}
    {{order.products}}
    {{order.total}}
  </div>
</template>