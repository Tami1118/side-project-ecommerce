<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore.js";

export default {
  mounted() {
    this.getCart();
  },
  methods: {
    ...mapActions(cartStore, [
      "addCart",
      "getCart",
      "updateItem",
      "deleteItem",
      "deleteAllCart",
      "useCoupon"
    ]),
  },
  computed: {
    ...mapState(cartStore, ["carts", "isDisabled", "cartNum", "total", "final_total"]),
  },
};
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div class="p-3">
      <h2 style="font-size: 20px;" class="fw-600">購物車內容</h2>
      <div class="d-flex flex-column gap-3">
        <template v-for="item in carts" :key="item.id">
          <div class="row">
            <div class="col"><img :src="item.product.imageUrl" style="height: 120px; width: 150px" class="object-fit-cover object-position-center" :alt="item.product.title"></div>
            <div class="col">{{item.product.title}}</div>
            <div class="col">
              <select name="" id="" class="form-select" :disabled="item.isDisabled" v-model="item.qty" @change="updateItem(item)">
                <option v-for="i in 50" :value="i" :key="i">{{i}}</option>
              </select>
            </div>
            <div class="col"><button type="button" class="btn btn-danger" @click="deleteItem(item.id)">刪除</button></div>
          </div>
        </template>
      </div>
      <button type="button" class="btn btn-danger" @click="deleteAllCart">刪除全部</button>
    </div>

    <div>
      <!-- 折扣前 -->
      {{total}}
      <!-- 折扣後 -->
      {{final_total}}
      <button class="btn btn-primary" @click="useCoupon">優惠券</button>
    </div>
  </div>
</template>