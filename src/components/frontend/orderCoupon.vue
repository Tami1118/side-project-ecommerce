<script>
import { mapState } from "pinia";
import cartStore from "@/stores/cartStore.js";

export default {
  data() {
    return {
      code: "",
    };
  },
  computed: {
    ...mapState(cartStore, ["total", "final_total", "useCoupon"]),
  },
};
</script>

<template>
  <div class="d-flex">
    <input type="text" class="form-control" placeholder="請輸入優惠碼" :disabled="total !== final_total">
    <button class="btn btn-primary text-nowrap px-6 py-2" @click="useCoupon" :disabled="total !== final_total">套用優惠碼</button>
  </div>
  <div class="d-flex flex-column align-items-end gap-2">
    <p class="fs-4 fs-md-4h" :class="total === final_total ? 'text-danger fs-500':''">總計金額 NT$ {{total}}</p>
    <p v-if="total !== final_total" class="fs-4 fs-md-4h fw-600 text-danger">折扣後金額 NT$ {{final_total}}</p>
  </div>
</template>