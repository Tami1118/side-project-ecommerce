<script>
import { orderFields } from "@/mixins/fields";

export default {
  props: {
    adminItem: Object,
    adminType: String,
    isNew: Boolean,
  },
  data() {
    return {
      tempItem: {},
      orderFields,
    };
  },
  watch: {
    adminItem() {
      this.tempItem = this.adminItem;
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
        <!-- <VForm class="d-flex flex-column" style="gap: 20px" v-slot="{ errors }"> -->
          <div v-for="item in adminItem" :key="item.id" class="position-relative pb-4">
            <!-- <label :for="item.id" class="form-label">{{item.label}}</label> -->
            <!-- <span v-if="item.required" class="text-danger"> *</span> -->
            
            {{item}}
            <!-- input:text -->
            <!-- <VField v-if="item.as === 'input' && item.type === 'text'"
                    :type="item.type"
                    :id="item.id"
                    :name="item.name"
                    :class="{'is-invalid': errors[item.name]}"
                    :rules="item.rules"
                    v-model="tempItem[item.model]"
                    :placeholder="item.placeholder"
                    class="form-control" /> -->
            
            <!-- input:number -->
            <!-- <VField v-else-if="item.type === 'number'"
                    :type="item.type"
                    :id="item.id"
                    :name="item.name"
                    :class="{'is-invalid': errors[item.name]}"
                    :rules="item.rules"
                    v-model.number="tempItem[item.model]"
                    :placeholder="item.placeholder"
                    class="form-control" /> -->
            
            <!-- <ErrorMessage :name="item.name" class="invalid-feedback position-absolute bottom-0 start-0" /> -->
          </div>

          <!-- <div>
            <label for="couponDueDate" class="form-label">到期日</label>
            <span class="text-danger"> *</span>
            <VField type="date" :min="today" id="couponDueDate" name="到期日" :class="{'is-invalid': errors['到期日']}" rules="required" v-model="due_date" class="form-control" />
            <ErrorMessage name="到期日" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div> -->
          
          <div class="form-check">
            <input id="orderIsPay" type="checkbox" v-model="tempItem.is_enabled" class="form-check-input" :true-value="true" :false-value="false">
            <label for="orderIsPay" class="form-check-label">已付款</label>
          </div>
        <!-- </VForm> -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button class="btn btn-primary" @click="$emit('update-item', updateItem)">{{isNew? "新增":"更新"}}</button>
      </div>
    </div>
  </div>
</template>


<!--
"data": {
  "create_at": 1523539519, => input:date
  "is_paid": false, => input:checkbox
  "message": "這是留言", => textarea
  "products": { => show
    "L8nBrq8Ym4ARI1Kog4t": {
      "id": "L8nBrq8Ym4ARI1Kog4t",
      "product_id": "-L8moRfPlDZZ2e-1ritQ",
      "qty": "3"
    }
  },
  "user": {
    "address": "kaohsiung", => input:text
    "email": "test@gmail.com", => input:email
    "name": "test", => input:text
    "tel": "0912346768" => input:tel
  },
  "num": 2 => input:number
}
-->