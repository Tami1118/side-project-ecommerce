<script>
import { productFields, localeSet } from "@/mixins/fields";
// import { mapActions } from "pinia";
// import productStore from "../../../stores/productStore";

export default {
  props: {

  },
  data() {
    return {
      showContent: 'basic',
      tempProduct: {
        title: ''
      },
      productFields, //*
      localeSet
    };
  },
  watch: {
    // adminItem() {
    //   // 外層的值重新賦予內層的值
    //   this.tempProduct = this.adminItem;
    // },
  },
  methods: {
    createImage() {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },
    onSubmit(values) {
      console.log(values, null, 2);
    },
  },
};
</script>

<template>
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ isNew ? "新增" : "編輯" }}{{ adminType }}</h1>
        <button type="button" @click="showContent = 'basic'" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-0">
        <div class="p-4">
          <div class="d-flex gap-3 p-3 bg-gray-200">
            <button class="btn" :class="showContent === 'basic' ? 'bg-primary text-white' : 'text-gray-500'" @click="showContent = 'basic'">基本資料</button>
            <button class="btn" :class="showContent === 'detail' ? 'bg-primary text-white' : 'text-gray-500'" @click="showContent = 'detail'">商品內容</button>
            <button class="btn" :class="showContent === 'images' ? 'bg-primary text-white' : 'text-gray-500'" @click="showContent = 'images'">商品圖片</button>
          </div>
        </div>

        <VForm @submit="onSubmit">
          <div class="p-4">
            <div v-if="showContent === 'basic'">
              <div class="row">
                <div class="col-lg-8">
                  <label for="productTitle" class="form-label">商品名稱 <span class="text-danger">*</span></label>
                  <VField id="productTitle"
                          type="text"
                          class="form-control"
                          placeholder="請輸入商品名稱"
                          v-model="tempProduct.title"
                          rules="required" />
                  <ErrorMessage name="商品名稱" />
                </div>
                <div class="col-lg-4">
                  
                </div>
                <div class="col-lg-4">

                </div>
                <div class="col-lg-4">

                </div>
                <div class="col-lg-4">

                </div>
              </div>
            </div>
            <div v-else-if="showContent === 'detail'">

            </div>
            <div v-else-if="showContent === 'images'">

            </div>
          </div>

          <div class="p-4 border-top border-gray-200 d-flex gap-2 justify-content-end">
            <button type="button" class="btn btn-outline-primary">取消</button>
            <button type="submit" class="btn btn-primary">新增</button>
          </div>
        </VForm>

        <!-- <VForm>
          <div v-if="showContent === 'basic'">

          </div>
          <div v-else-if="showContent === 'detail'">

          </div>
          <div v-else-if="showContent === 'images'">

          </div>
        </VForm> -->
        <!-- <VForm class="row">
          <div class="col-lg-3">
            <div>this is content</div>
            <div>this is content</div>
          </div>

          <div class="col-lg-9">
            <div>this is content</div>
            <div>this is content</div>
          </div>
        </VForm> -->

        <!-- <VForm class="d-flex flex-column" style="gap: 20px" v-slot="{ errors }">
          <div v-for="item in productFields" :key="item.id" class="position-relative pb-5">
            <label :for="item.id" class="form-label">{{ item.label }}</label>
            <span v-if="item.required" class="text-danger"> *</span>
            <VField v-if="item.as === 'input' && item.type === 'text'" :type="item.type" :id="item.id" :name="item.name" :class="{ 'is-invalid': errors[item.name] }" :rules="item.rules" v-model="tempProduct[item.model]" :placeholder="item.placeholder" class="form-control" />
            <VField v-else-if="item.type === 'number'" :type="item.type" :id="item.id" :name="item.name" :class="{ 'is-invalid': errors[item.name] }" :rules="item.rules" v-model.number="tempProduct[item.model]" :placeholder="item.placeholder" class="form-control" />
            <VField v-else-if="item.as === 'select'" :as="item.as" :id="item.id" :name="item.name" :class="{ 'is-invalid': errors[item.name] }" :rules="item.rules" v-model="tempProduct[item.model]" :placeholder="item.placeholder" class="form-select">
              <option value="" selected>請選擇</option>
              <option v-for="option in item.options" :key="option" :value="option">{{ option }}</option>
            </VField>
            <VField v-else-if="item.as === 'textarea'" :as="item.as" :id="item.id" :name="item.name" :class="{ 'is-invalid': errors[item.name] }" :rules="item.rules" v-model="tempProduct[item.model]" :placeholder="item.placeholder" class="form-control" cols="30" rows="3" />
            <ErrorMessage :name="item.name" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div>

          <div>
            <label for="productImage" class="form-label">圖片</label>
            <img :src="tempProduct.imageUrl" :alt="`${tempProduct.title}圖片`" class="w-100">
            <input type="text" v-model="tempProduct.imageUrl" placeholder="請輸入圖片網址" class="form-control">
          </div>

          <div>
            <label for="productImagesUrl" class="form-label">多圖設置</label>
            <div class="row g-2">
              <template v-if="Array.isArray(tempProduct.imagesUrl)">
                <div v-for="(item, key) in tempProduct.imagesUrl" :key="key" class="col-12">
                  <img :src="tempProduct.imagesUrl[key]" class="w-100" :alt="`${tempProduct.title} - 圖${key + 1}`">
                  <div class="input-group">
                    <input id="productImagesUrl" type="text" v-model="tempProduct.imagesUrl[key]" class="form-control">
                    <button type="button" class="btn btn-outline-secondary" @click="tempProduct.imagesUrl.splice(key, 1)">X</button>
                  </div>
                </div>
                <div v-if="tempProduct.imagesUrl[tempProduct.imagesUrl?.length - 1]">
                  <button type="button" class="btn btn-primary" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                </div>
              </template>
              <template v-else>
                <button type="button" class="btn btn-primary" @click="createImage">新增圖片</button>
              </template>
            </div>
          </div>

          <div class="form-check">
            <input id="isEnabled" type="checkbox" v-model="tempProduct.is_enabled" class="form-check-input" :true-value="1" :false-value="0">
            <label for="isEnabled" class="form-check-label">已啟用</label>
          </div>
        </VForm> -->
      </div>
      <!-- <div class="modal-footer"> -->

        <!-- <button v-if="isNew" class="btn btn-outline-secondary" @click="resetTemp()">清除</button> -->
        <!-- <button class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="resetTemp()">取消</button> -->
        <!-- <button class="btn btn-primary" @click="$emit('update-item', updateItem)">{{ isNew ? "新增" : "更新" }}</button> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<!--
"data": {
  "title": "[賣]動物園造型衣服3", => input:text *
  "category": "衣服2", => select *
  "origin_price": 100, => input:number *
  "price": 300, => input:number *
  "unit": "個", => select *
  "description": "Sit down please 名設計師設計", => textarea
  "content": "這是內容", => textarea
  "is_enabled": 1, => input:checkbox(1/0) *

  // todo
  "imageUrl": "主圖網址", => input:text V
  "imagesUrl": [ => input:text => createImage V
    "圖片網址一",
    "圖片網址二",
    "圖片網址三",
    "圖片網址四",
    "圖片網址五"
  ]
}
-->