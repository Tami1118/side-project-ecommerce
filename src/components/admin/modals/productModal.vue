<script>
import { productFields, localeSet } from "@/mixins/fields";

export default {
  props: {
    adminItem: Object, // tempItem
    adminType: String, // type
    isNew: Boolean, // isNew
  },
  data() {
    return {
      tempItem: { //*
        category: "",
        unit: "",
      },
      productFields, //*
      localeSet
    };
  },
  watch: {
    adminItem() {
      // 外層的值重新賦予內層的值
      this.tempItem = this.adminItem;
    },
  },
  methods: {
    resetTemp() {
      this.tempItem = { //*
        category: "",
        unit: "",
      };
    },
    createImage(){
      this.tempItem.imagesUrl = []
      this.tempItem.imagesUrl.push('')
    }
  },
};
</script>

<template>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{isNew? "新增":"編輯"}}{{adminType}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <VForm class="d-flex flex-column" style="gap: 20px" v-slot="{ errors }">
          <div v-for="item in productFields" :key="item.id" class="position-relative pb-4">
            <label :for="item.id" class="form-label">{{item.label}}</label>
            <span v-if="item.required" class="text-danger"> *</span>

            <!-- input:text -->
            <VField v-if="item.as === 'input' && item.type === 'text'"
                    :type="item.type"
                    :id="item.id"
                    :name="item.name"
                    :class="{'is-invalid': errors[item.name]}"
                    :rules="item.rules"
                    v-model="tempItem[item.model]"
                    :placeholder="item.placeholder"
                    class="form-control" />
            
            <!-- input:number -->
            <VField v-else-if="item.type === 'number'"
                    :type="item.type"
                    :id="item.id"
                    :name="item.name"
                    :class="{'is-invalid': errors[item.name]}"
                    :rules="item.rules"
                    v-model.number="tempItem[item.model]"
                    :placeholder="item.placeholder"
                    class="form-control" />
            
            <!-- select -->
            <VField v-else-if="item.as === 'select'"
                    :as="item.as"
                    :id="item.id"
                    :name="item.name"
                    :class="{'is-invalid': errors[item.name]}"
                    :rules="item.rules"
                    v-model="tempItem[item.model]"
                    :placeholder="item.placeholder"
                    class="form-select">
              <option value="" selected>請選擇</option>
              <option v-for="option in item.options" :key="option" :value="option">{{option}}</option>
            </VField>

            <!-- textarea -->
            <VField v-else-if="item.as === 'textarea'"
                    :as="item.as"
                    :id="item.id"
                    :name="item.name"
                    :class="{'is-invalid': errors[item.name]}"
                    :rules="item.rules"
                    v-model="tempItem[item.model]"
                    :placeholder="item.placeholder"
                    class="form-control" cols="30" rows="3" />

            <ErrorMessage :name="item.name" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div>

          <div>
            <label for="productImage" class="form-label">圖片</label>
            <img :src="tempItem.imageUrl" :alt="`${tempItem.title}圖片`" class="w-100">
            <input type="text" v-model="tempItem.imageUrl" placeholder="請輸入圖片網址" class="form-control">
          </div>

          <div>
            <label for="productImagesUrl" class="form-label">多圖設置</label>
            <div class="row g-2">
              <template v-if="Array.isArray(tempItem.imagesUrl)">
                <div v-for="(item, key) in tempItem.imagesUrl" :key="key" class="col-12">
                  <img :src="tempItem.imagesUrl[key]" class="w-100" :alt="`${tempItem.title} - 圖${key + 1}`">
                  <div class="input-group">
                    <input id="productImagesUrl" type="text" v-model="tempItem.imagesUrl[key]" class="form-control">
                    <button type="button" class="btn btn-outline-secondary" @click="tempItem.imagesUrl.splice(key, 1)">X</button>
                  </div>
                </div>
                <div v-if="tempItem.imagesUrl[tempItem.imagesUrl?.length - 1]">
                  <button type="button" class="btn btn-primary" @click="tempItem.imagesUrl.push('')">新增圖片</button>
                </div>
              </template>
              <template v-else>
                <button type="button" class="btn btn-primary" @click="createImage">新增圖片</button>
              </template>
            </div>
          </div>

          <div class="form-check">
            <input id="isEnabled" type="checkbox" v-model="tempItem.is_enabled" class="form-check-input" :true-value="1" :false-value="0">
            <label for="isEnabled" class="form-check-label">已啟用</label>
          </div>

        </VForm>
      </div>
      <div class="modal-footer">
        <button v-if="isNew" class="btn btn-outline-secondary" @click="resetTemp">清除</button>
        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button class="btn btn-primary" @click="$emit('update-item', updateItem)">{{isNew? "新增":"更新"}}</button>
      </div>
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