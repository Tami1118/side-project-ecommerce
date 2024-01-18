<template>
  <div class="px-0 px-md-12 h-100 d-flex flex-column gap-3 fs-3h fs-md-4 text-justify">
    <div class="d-flex flex-column gap-2">
      <span class="badge bg-theme-primary text-primary me-auto">{{product.category}}</span>
      <h1 class="fs-6 fs-md-8 fw-bold">{{product.title}}</h1>
    </div>
    <div class="d-none d-md-flex flex-column">
      <!-- <p class="mb-3">{{product.description}}</p> -->
      <p><span class="fw-600">內容物：</span>{{product.content}}</p>
      <p><span class="fw-600">重量：</span>250g ± 10g</p>
    </div>
    <div class="mt-auto d-flex align-items-center gap-2">
      <div class="text-danger fw-600 fs-7">NT$ {{product.price}}</div>
      <div v-if="product.origin !== product.price" class="text-gray-500"><del>NT$ {{product.origin_price}}</del> /{{product.unit}}</div>
    </div>
    <div>
      <div class="row g-0">
        <div class="col-6 col-md-5 col-lg-6">
          <select name="productNum" id="productNum" v-model="qty" class="form-select py-3 text-center fs-4 fs-lg-5 fw-bold h-100">
            <option v-for="i in 50" :value="i" :key="i">{{i}}</option>
          </select>
        </div>
        <div class="col-6 col-md-7 col-lg-6">
          <button type="button" @click="addCart(product, qty)" class="btn btn-primary w-100 py-3 text-center fs-4 fs-lg-5 fw-500 h-100">
            <i class="fi fi-ss-shopping-bag-add me-2"></i> 加入購物車
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column gap-2">
      <p v-for="item in discountNews" :key="item" class="d-flex align-items-center">
        <span class="d-block badge bg-danger text-white fw-normal me-2"><i class="fi fi-ss-ticket me-1"></i>{{item.category}}</span>
        {{item.content}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "addCart", "discountNews"],
  data() {
    return {
      qty: 1,
    };
  },
  watch: {
    qty() {
      return this.product.qty;
    },
  },
};
</script>