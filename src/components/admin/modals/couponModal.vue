<script>
import { couponFields, localeSet } from "@/mixins/fields";

export default {
  props: {
    adminItem: Object,
    adminType: String,
    isNew: Boolean,
  },
  data() {
    return {
      tempItem: {},
      today: "", //*
      due_date: "", //*
      couponFields,
      localeSet
    };
  },
  mounted(){
    // 賦予今天的日期，作為日期最小值(今日以前不得勾選)
    this.today = new Date().toISOString().split('T')[0]
  },
  watch: {
    // 格式設定
    adminItem() {
      this.tempItem = this.adminItem;
      // toISOString 國際日期格式，格式中利用 T 來做日期與時間的區隔，因此利用 split("T") 分開後，取 array 索引值 0 的日期
      this.due_date = new Date(this.tempItem.due_date * 1000).toISOString().split("T")[0];
    },
    due_date() {
      this.tempItem.due_date = Math.floor(new Date(this.due_date).getTime() / 1000);
    },
  },
  methods: {
    resetTemp() {
      this.tempItem = {
        due_date: new Date().getTime() / 1000, // 取得今天日期做為預設
      };
    },
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
          <div v-for="item in couponFields" :key="item.id" class="position-relative pb-4">
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
            
            <ErrorMessage :name="item.name" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div>

          <div>
            <label for="couponDueDate" class="form-label">到期日</label>
            <span class="text-danger"> *</span>
            <VField type="date" :min="today" id="couponDueDate" name="到期日" :class="{'is-invalid': errors['到期日']}" rules="required" v-model="due_date" class="form-control" />
            <ErrorMessage name="到期日" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div>
          
          <div class="form-check">
            <input id="couponIsEnabled" type="checkbox" v-model="tempItem.is_enabled" class="form-check-input" :true-value="1" :false-value="0">
            <label for="couponIsEnabled" class="form-check-label">已啟用</label>
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
  "title": "超級特惠價格", => input:text *
  "code": "testCode" => input:text *
  "percent": 80, => input:number *
  "due_date": 1555459200, => input:date *
  "is_enabled": 1, => input:checkbox(1/0) *
}
-->