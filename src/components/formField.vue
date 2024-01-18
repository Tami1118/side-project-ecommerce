<template>

  <div>
    <!-- edit: submit, v-for -->
    <VForm class="d-flex flex-column gap-2" v-slot="{ errors }" @submit="createOrder">
      <div v-for="item in userFields" :key="item.id" class="position-relative pb-6">
        <label :for="item.id" class="form-label">{{item.label}}</label>
        <span v-if="item.required" class="text-danger"> *</span>

        <!-- edit: v-model -->
        <!-- input:text -->
        <VField v-if="item.as === 'input' || item.type === 'text'"
                :type="item.type"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model="user[item.model]"
                :placeholder="item.placeholder"
                class="form-control" />

        <!-- input:number -->
        <VField v-else-if="item.type === 'number'"
                :type="item.type"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model.number="user[item.model]"
                :placeholder="item.placeholder"
                class="form-control" />

        <!-- select -->
        <VField v-else-if="item.as === 'select'"
                :as="item.as"
                :id="item.id"
                :name="item.name"
                :class="{'is-invalid': errors[item.name]}"
                :rules="item.rules"
                v-model="user[item.model]"
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
                v-model="message"
                :placeholder="item.placeholder"
                class="form-control"
                cols="30" rows="3" />

        <ErrorMessage :name="item.name"
                      class="invalid-feedback position-absolute bottom-0 start-0" />
      </div>

      <div class="d-flex justify-content-between">
        <router-link to="/products" class="btn btn-primary">繼續購物</router-link>
        <button type="submit" class="btn btn-primary">確認訂單</button>
      </div>
    </VForm>
  </div>

</template>