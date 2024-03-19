<script>
import { mapState } from "pinia";
import productStore from "@/stores/productStore";

export default {
  props: {
    tempProduct: Object,
    // adminItem: Object, // tempProduct
    adminType: String, // type_zh
    isNew: Boolean, // isNew
  },
  computed: {
    ...mapState(productStore, ["categories"])
  },
  data() {
    return {
      // tempItem: {
      //   title: "",
      //   category: "",
      //   origin_price: null,
      //   price: null,
      //   unit: "",
      //   description: "",
      //   content: "",
      //   is_enabled: 0,
      //   imageUrl: "",
      //   imagesUrl: []
      // },
    };
  },
  watch: {
    // 外層的值重新賦予內層的值
    // adminItem() {
    //   this.tempItem = this.adminItem;
    // },
  },
  methods: {
    resetTemp() {
      let form = document.getElementById('productForm');
      if(form)  form.reset()
    },
    createImage() {
      this.tempItem.imagesUrl = []
      this.tempItem.imagesUrl.push('')
    }
  },
};
</script>

<template>
  <div>
    {{ tempProduct }}
  </div>
  <!-- <VForm v-slot="{ errors }" class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ isNew ? "新增" : "編輯" }}{{ adminType }}</h1>
        <button type="button" @click="resetTemp()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="productForm">
          <div class="row gy-4">
            <div class="col-lg-8">
              <label for="productTitle" class="form-label">商品名稱 <span class="text-danger">*</span></label>
              <VField type="text" id="productTitle" name="商品名稱" :class="{ 'is-invalid': errors['商品名稱'] }" rules="required" v-model="tempItem.title" placeholder="請輸入商品名稱" class="form-control" />
              <ErrorMessage name="商品名稱" class="invalid-feedback" />
            </div>
            <div class="col-lg-4">
              <label for="productCategory" class="form-label">商品類型 <span class="text-danger">*</span></label>
              <VField as="select" id="productCategory" name="商品類型" :class="{ 'is-invalid': errors['商品類型'] }" rules="required" v-model="tempItem.category" class="form-select">
                <option value="" selected>請選擇</option>
                <option :value="item" v-for="item in categories" :key="item">{{ item }}</option>
              </VField>
              <ErrorMessage name="商品類型" class="invalid-feedback" />
            </div>
            <div class="col-lg-4">
              <label for="productPrice" class="form-label">原價 <span class="text-danger">*</span></label>
              <VField type="number" id="productPrice" name="原價" :class="{ 'is-invalid': errors['原價'] }" rules="required|between:0,10000" v-model.number="tempItem.price" placeholder="請輸入商品原價" class="form-control" max="10000" min="0" />
              <ErrorMessage name="原價" class="invalid-feedback" />
            </div>
            <div class="col-lg-4">
              <label for="productOriginPrice" class="form-label">特價 <span class="text-danger">*</span></label>
              <VField type="number" id="productOriginPrice" name="特價" :class="{ 'is-invalid': errors['特價'] }" rules="required|between:0,10000" v-model.number="tempItem.origin_price" placeholder="請輸入商品特價" class="form-control" max="10000" min="0" />
              <ErrorMessage name="特價" class="invalid-feedback" />
            </div>
            <div class="col-lg-4">
              <label for="productUnit" class="form-label">單位 <span class="text-danger">*</span></label>
              <VField as="select" id="productUnit" name="單位" :class="{ 'is-invalid': errors['單位'] }" rules="required" v-model="tempItem.unit" class="form-select">
                <option value="" selected>請選擇</option>
                <option value="個">個</option>
              </VField>
              <ErrorMessage name="單位" class="invalid-feedback" />
            </div>
          </div>
          <hr>
          <div class="row gy-4">
            <div class="col-12">
              <label for="productContent" class="form-label">商品內容</label>
              <input type="text" id="productContent" v-model="tempItem.content" placeholder="請輸入商品內容" class="form-control" />
            </div>
            <div class="col-12">
              <label for="productDescription" class="form-label">商品說明</label>
              <textarea id="productDescription" v-model="tempItem.description" placeholder="請輸入商品說明" class="form-control" rows="4"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button v-if="isNew" class="btn btn-outline-secondary" @click="resetTemp">清除</button>
        <button class="btn btn-outline-secondary" data-bs-dismiss="modal" @click.prevent="resetTemp">取消</button>
        <button class="btn btn-primary" @click="$emit('update-item', updateItem)">{{ isNew ? "新增" : "更新" }}</button>
      </div>
    </div>
  </VForm> -->
</template>