<template>
  <div class="modal-body">
    <!-- Product tab -->
    <ul class="d-flex gap-3 justify-content-center list-unstyled">
      <li><button @click="isOpen = 'info'" :class="isOpen === 'info' ? 'bg-primary text-white' : 'text-gray-400'" class="btn">商品資訊</button></li>
      <li><button @click="isOpen = 'content'" :class="isOpen === 'content' ? 'bg-primary text-white' : 'text-gray-400'" class="btn">商品內容</button></li>
      <li><button @click="isOpen = 'image'" :class="isOpen === 'image' ? 'bg-primary text-white' : 'text-gray-400'" class="btn">商品圖片</button></li>
    </ul>

    <VForm v-slot="{ errors }">
      <!-- Product info -->
      <div v-show="isOpen === 'info'" class="row gy-3 m-0">
        <div class="col-lg-8">
          <label for="productTitle" class="form-label">商品名稱 <span class="text-danger">*</span></label>
          <VField type="text" id="productTitle" name="商品名稱" :class="{ 'is-invalid': errors['商品名稱'] }" rules="required" v-model="tempProduct.title" placeholder="請輸入商品名稱" class="form-control" />
          <ErrorMessage name="商品名稱" class="invalid-feedback" />
        </div>
        <div class="col-lg-4">
          <label for="productCategory" class="form-label">商品類型 <span class="text-danger">*</span></label>
          <VField as="select" id="productCategory" name="商品類型" :class="{ 'is-invalid': errors['商品類型'] }" rules="required" v-model="tempProduct.category" class="form-select">
            <option value="" selected>請選擇</option>
            <option :value="item" v-for="item in categories" :key="item">{{ item }}</option>
          </VField>
          <ErrorMessage name="商品類型" class="invalid-feedback" />
        </div>
        <div class="col-lg-4">
          <label for="productPrice" class="form-label">原價 <span class="text-danger">*</span></label>
          <VField type="number" id="productPrice" name="原價" :class="{ 'is-invalid': errors['原價'] }" rules="required|between:0,10000" v-model.number="tempProduct.price" placeholder="請輸入商品原價" class="form-control" max="10000" min="0" />
          <ErrorMessage name="原價" class="invalid-feedback" />
        </div>
        <div class="col-lg-4">
          <label for="productOriginPrice" class="form-label">特價 <span class="text-danger">*</span></label>
          <VField type="number" id="productOriginPrice" name="特價" :class="{ 'is-invalid': errors['特價'] }" rules="required|between:0,10000" v-model.number="tempProduct.origin_price" placeholder="請輸入商品特價" class="form-control" max="10000" min="0" />
          <ErrorMessage name="特價" class="invalid-feedback" />
        </div>
        <div class="col-lg-4">
          <label for="productUnit" class="form-label">單位 <span class="text-danger">*</span></label>
          <VField as="select" id="productUnit" name="單位" :class="{ 'is-invalid': errors['單位'] }" rules="required" v-model="tempProduct.unit" class="form-select">
            <option value="" selected>請選擇</option>
            <option :value="item" v-for="item in unit" :key="item">{{ item }}</option>
          </VField>
          <ErrorMessage name="單位" class="invalid-feedback" />
        </div>
        <div class="col-lg-12 d-flex justify-content-end">
          <div class="form-check form-switch rounded-100">
            <input class="form-check-input rounded-10" type="checkbox" :true-value="1" :false-value="0" id="productEnabled" v-model.number="tempProduct.is_enabled">
            <label class="form-check-label" :class="tempProduct.is_enabled ? 'text-primary fw-500' : ''" for="productEnabled">{{ tempProduct.is_enabled ? '已啟用' : '未啟用' }}</label>
          </div>
        </div>
      </div>

      <!-- Product content -->
      <div v-show="isOpen === 'content'" class="row gy-3 m-0">
        <div class="col-12">
          <label for="productContent" class="form-label">商品內容</label>
          <input type="text" id="productContent" v-model="tempProduct.content" placeholder="請輸入商品內容" class="form-control" />
        </div>
        <div class="col-12">
          <label for="productDescription" class="form-label">商品說明</label>
          <textarea id="productDescription" v-model="tempProduct.description" placeholder="請輸入商品說明" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <!-- Product image -->
      <div v-show="isOpen === 'image'" class="row gy-3 m-0">
        <!-- Image show -->
        <div class="row g-3 m-0">
          <!-- Main image -->
          <div class="col-2">
            <div class="ratio ratio-1x1">
              <div v-if="tempProduct.imageUrl">
                <img :src="tempProduct.imageUrl" class="w-100 h-100 object-fit-cover" :alt="tempProduct.title">
                <span class="position-absolute bottom-0 left-0 d-block w-100 text-center bg-black text-white bg-opacity-50">主圖</span>
              </div>
              <div v-else style="border: 3px dotted #cbd5e1" class="d-flex gap-1 flex-column justify-content-center align-items-center">
                <font-awesome-icon icon="fa-regular fa-image" class="fs-6 text-gray-300" />
                <span class="text-gray-300">主圖</span>
              </div>
            </div>
          </div>
          <!-- More images -->
          <div class="col-10">
            <ul v-if="tempProduct.imagesUrl !== undefined" class="row g-3">
              <li class="col" v-for="index in 5" :key="index">
                <div class="ratio ratio-1x1">
                  <div v-if="tempProduct.imagesUrl[index - 1]">
                    <img :src="tempProduct.imagesUrl[index - 1]" class="w-100 h-100 object-fit-cover" :alt="`${tempProduct.title}圖${index}`">
                    <span class="position-absolute bottom-0 left-0 d-block w-100 text-center bg-black text-white bg-opacity-50">圖 {{ index }}</span>
                  </div>
                  <div v-else style="border: 3px dotted #cbd5e1" class="d-flex gap-1 flex-column justify-content-center align-items-center">
                    <font-awesome-icon icon="fa-regular fa-image" class="fs-6 text-gray-300" />
                    <span class="text-gray-300">圖 {{ index }}</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul v-else class="row g-3">
              <li class="col" v-for="index in 5" :key="index">
                <div class="ratio ratio-1x1">
                  <div style="border: 3px dotted #cbd5e1" class="d-flex gap-1 flex-column justify-content-center align-items-center">
                    <font-awesome-icon icon="fa-regular fa-image" class="fs-6 text-gray-300" />
                    <span class="text-gray-300">圖 {{ index }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Image link -->
        <div class="row g-3 m-0">
          <!-- Main image -->
          <div class="col-2">
            <label for="form-label">主圖</label>
          </div>
          <div class="col-10">
            <input type="text" class="form-control" v-model="tempProduct.imageUrl">
          </div>

          <!-- More images -->
          <div class="col-2 pt-2">
            <label for="form-label">多圖設置</label>
          </div>
          <div class="col-10">
            <template v-if="tempProduct.imagesUrl !== undefined">
              <ul>
                <li v-for="(image, index) in tempProduct.imagesUrl" :key="index">
                  <div class="input-group mb-3">
                    <input class="form-control" type="text" v-model="tempProduct.imagesUrl[index]">
                    <button class="btn btn-outline-gray-500" @click.prevent="tempProduct.imagesUrl.splice(index, 1)"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                  </div>
                </li>
              </ul>
              <button v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] && tempProduct.imagesUrl.length < 5" @click.prevent="tempProduct.imagesUrl.push('')" class="btn btn-primary">新增圖片</button>
            </template>
            <button v-else class="btn btn-primary" @click.prevent="createImage()">新增圖片</button>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct)">儲存</button>
    </VForm>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-gray-500" @click="clearForm()">清除</button>
    <button type="button" class="btn btn-outline-gray-500" data-bs-dismiss="modal" @click="isOpen = 'info', $emit('close-modal', closeModal)">取消</button>
    <!-- <button type="button" class="btn btn-primary" @click="console.log(tempProduct)">儲存</button> -->
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      email: '',
      testModal: null,
    }
  },
  mounted() {
    this.testModal = new Modal(this.$refs.testModal);
  },
  methods: {
    openModal() {
      this.testModal.show()
    },
    closeModal() {
      this.testModal.hide();
      this.$refs.testForm.reset(); // reset Vuelidate validation state
      this.resetForm(); // clear form fields
    },
    resetForm() {
      this.email = ''
    }
  }
}
</script>
