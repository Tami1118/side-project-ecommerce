<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore.js";

export default {
  mounted() {
    this.getCart();
  },
  methods: {
    ...mapActions(cartStore, ["addCart","getCart","updateCartItem","deleteCartItem"]),
  },
  computed: {
    ...mapState(cartStore, ["carts","cartNum","isDisabled"]),
  },
};
</script>

<template>
  <div class="d-flex flex-column">
    <template v-for="item in carts" :key="item.id">
      <div class="py-3 d-flex gap-2 border-bottom border-gray-300">
        <div style="height: 84px; width: 84px">
          <img class="w-100 h-100 object-fit-cover" :src="item.product.imageUrl" :alt="item.product.title">
        </div>
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex justify-content-between">
            <h3 class="fs-4 fw-500">{{item.product.title}}</h3>
            <button type="button" class="btn p-0 d-flex align-items-center" @click="deleteCartItem(item.id)">
              <span class="material-symbols-outlined fs-5">delete</span>
            </button>
          </div>
          <p class="fs-3h text-nowrap">NT${{item.product.price}}/{{item.product.unit}}</p>
          <div class="d-flex justify-content-between align-items-end mt-auto">
            <select name="" id="" class="form-select text-center py-1 w-fit-content" :disabled="item.isDisabled" v-model.number="item.qty" @change="updateCartItem(item)">
              <option v-for="i in 50" :value="i" :key="i">{{i}}</option>
            </select>
            <p class="fs-3h text-nowrap">金額 NT$ {{item.product.price * item.qty}}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>