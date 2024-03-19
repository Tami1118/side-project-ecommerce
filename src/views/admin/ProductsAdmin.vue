<script>
const { VITE_PATH, VITE_URL } = import.meta.env;
import { Toast, Alert } from "@/mixins/swal.js";

import { mapState } from "pinia";
import productStore from "@/stores/productStore";

import Modal from "bootstrap/js/dist/modal";
// import productModal from "@/components/admin/modals/productModal.vue";
// import deleteModal from "@/components/admin/modals/deleteModal.vue";
import pageComponent from "@/components/pageComponent.vue";

export default {
  data() {
    return {
      // Date storage
      product: {},
      products: [],
      pagination: {},
      productAll: [],
      tempProduct: {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: ''
      },
      isNew: false,
      isOpen: 'info',

      // Filter product
      searchKeyword: "",
      selectCategory: "",
      selectStatus: "",
      selectSort: "",

      // Modal init
      productModal: null,
      deleteModal: null,
      testModal: null,

      // test
      email: '',
      tel: '',
    };
  },
  mounted() {
    this.getProducts();
    this.getProductAll();
    this.productModal = new Modal(this.$refs.productModal);
    // this.testModal = new Modal(this.$refs.testModal);
    // this.deleteModal = new Modal(this.$refs.deleteModal);
  },
  methods: {
    /**
     * Get all product(Include pagination)
     * @param {*} page Products's Page
     */
    getProducts(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}s?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          console.log('getProducts 已取得', res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log('getProducts 失敗', err);
          Alert.fire({
            icon: "error",
            title: `商品取得失敗`,
            text: '請稍後再試一次'
          });
        });
    },

    /**
     * Get all product(Not include pagination)
     */
    getProductAll() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}s/all`;
      this.$http.get(url)
        .then((res) => {
          console.log('getProductAll 已取得', res);
          this.productAll = Object.values(res.data.products);
        })
        .catch((err) => {
          console.log('getProductAll 失敗', err);
          Alert.fire({
            icon: "error",
            title: `商品取得失敗`,
            text: '請稍後再試一次'
          });
        });
    },


    /**
     * Open modal(add/edit、delete)
     * @param {*} state Product's state
     * @param {*} item Product's data
     */
    openModal(state, item) {
      if (state === "create") {
        // console.log(state)
        this.isNew = true;
        this.isOpen = 'info';
        this.productModal.show();
      } else if (state === "edit") {
        // console.log(state)
        this.isNew = false;
        this.isOpen = 'info';
        this.productModal.show();
        this.tempProduct = JSON.parse(JSON.stringify(item));
      } else if (state === "delete") {
        // console.log(state)
        this.deleteModal.show();
        this.tempProduct = JSON.parse(JSON.stringify(item));
      }
    },

    /**
     * Add or update product
     */
    updateProduct() {
      const method = this.isNew ? "post" : "put";
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}/`;
      const uid = this.isNew ? "" : `${this.tempProduct.id}`;
      const msg = this.isNew ? "新增" : "更新";

      this.$http[method](`${url}${uid}`, { data: this.tempProduct })
        .then(() => {
          this.getProducts();
          Toast.fire({
            icon: "success",
            title: `已${msg}商品`,
          });
          this.tempProduct = {}
          this.productModal.hide();
        })
        .catch(() => {
          Alert.fire({
            icon: "error",
            title: `${msg}商品失敗`,
            text: "請確認必填欄位是否已填寫",
          });
        });
    },

    /**
     * Delete product
     * @param {*} id 訂單id
     */
    deleteProduct(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.getProducts();
          this.deleteModal.hide();
          Toast.fire({
            icon: "success",
            title: `已刪除商品`,
          });
        })
        .catch(() => {
          Alert.fire({
            icon: "error",
            title: '刪除商品失敗',
            text: '請稍後再試一次！'
          });
        });
    },

    /**
     * Clear filter
     */
    clearFilter() {
      this.searchKeyword = "";
      this.selectCategory = "";
      this.selectStatus = "";
      this.selectSort = "";
    },
  },
  computed: {
    ...mapState(productStore, ['type', 'type_zh', 'categories', 'sortItems', 'unit']),

    filterProducts() {
      let itemList = this.products;

      // Keyword search
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        itemList = itemList.filter((item) => item.title.toLowerCase().match(keyword));
      }

      // Category filter
      if (this.selectCategory) {
        itemList = itemList.filter((item) => item.category === this.selectCategory);
      }

      // States filter(if is_enabled is false, not to display)
      if (this.selectStatus !== "") {
        itemList = itemList.filter((item) => {
          if (this.selectStatus == true) {
            return item.is_enabled == true;
          } else {
            return (
              (item.is_enabled !== undefined && item.is_enabled == false) ||
              (item.is_enabled === undefined && this.selectStatus === "0")
            );
          }
        });
      }

      return itemList;
    },

    sortProduct() {
      const itemList = this.filterProducts.slice();
      if (this.selectSort === "特價：由高至低") {
        itemList.sort((a, b) => b.price - a.price);
      } else if (this.selectSort === "特價：由低至高") {
        itemList.sort((a, b) => a.price - b.price);
      }
      return itemList;
    },
  },
  components: {
    // productModal,
    // deleteModal,
    pageComponent,
  },
};
</script>

<template>
  <div class="bg-gray-100">
    <div class="container py-3 px-10">
      <h2 class="fs-5">{{ type_zh }}管理<span class="fs-3h"> (共 <strong class="text-secondary">{{ sortProduct.length }}</strong> 筆資料)</span></h2>
    </div>
  </div>

  <div class="container py-3 px-10 d-flex flex-column gap-6">
    <!-- Filter -->
    <div class="d-flex gap-2">
      <button class="btn btn-primary me-auto" @click="openModal('create')"><i class="fi fi-sr-add me-2"></i>新增商品</button>
      <input type="search" v-model="searchKeyword" class="form-control w-fit-content" placeholder="請輸入商品關鍵字">
      <select name="selectCategory" id="selectCategory" class="form-select w-fit-content" v-model="selectCategory">
        <option value="" selected>全部類別</option>
        <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
      </select>
      <select name="selectStatus" id="selectStatus" class="form-select w-fit-content" v-model="selectStatus">
        <option value="" selected>狀態篩選</option>
        <option value="1">已啟用</option>
        <option value="0">未啟用</option>
      </select>
      <select name="selectSort" id="selectSort" class="form-select w-fit-content" v-model="selectSort">
        <option value="" selected>商品排序</option>
        <option v-for="item in sortItems" :key="item" :value="item">{{ item }}</option>
      </select>
      <button class="btn btn-primary text-nowrap" @click="clearFilter"><i class="fi fi-sr-broom me-2"></i>清除篩選</button>
    </div>

    <!-- List -->
    <table class="table table-hover align-middle admin-table table-borderless">
      <thead>
        <tr>
          <th width="15%"></th>
          <th width="20%">商品名稱</th>
          <th width="10%">類別</th>
          <th width="10%" class="text-end">特價</th>
          <th width="10%" class="text-end">原價</th>
          <th width="10%" class="text-center">狀態</th>
          <th width="25%"></th>
        </tr>
      </thead>
      <tbody v-if="products">
        <tr v-for="product in sortProduct" :key="product.id" class="border-bottom border-gray-200">
          <td><img :src="product.imageUrl" class="object-fit-cover" style="height: 80px;width: 100%" :alt="product.title"></td>
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td class="text-end">NT$ {{ product.origin_price }}</td>
          <td class="text-end">NT$ {{ product.price }}</td>
          <td>
            <div class="text-center">
              <div class="badge rounded-2" :class="product.is_enabled ? 'bg-primary' : 'text-primary border border-primary'">{{ product.is_enabled ? '已啟用' : '未啟用' }}</div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center gap-3">
              <button @click="openModal('edit', product)" class="btn btn-outline-primary">編輯</button>
              <!-- <button type="button" class="btn btn-primary" @click="openModal('edit', product)"><i class="fi fi-sr-file-edit me-2"></i>編輯</button> -->
              <!-- <button type="button" class="btn btn-outline-secondary" @click="openModal('delete', product)"><i class="fi fi-sr-trash me-2"></i>刪除</button> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagenation -->
    <page-component :pagination="pagination" :get-pages="getProducts"></page-component>
  </div>

  <div ref="productModal" class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="productModalLabel">{{ isNew ? '新增' : '更新' }}{{ type_zh }}</h1>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="tempProduct = {}"></button> -->
          <button @click="productModal.hide()">關閉</button>
        </div>
        <div class="modal-body">
          <div class="d-flex gap-3 justify-content-center">
            <button @click="isOpen = 'info'" :class="isOpen === 'info' ? 'bg-primary text-white' : 'text-gray-400'" class="btn">商品資訊</button>
            <button @click="isOpen = 'content'" :class="isOpen === 'content' ? 'bg-primary text-white' : 'text-gray-400'" class="btn">商品內容</button>
            <button @click="isOpen = 'image'" :class="isOpen === 'image' ? 'bg-primary text-white' : 'text-gray-400'" class="btn">商品圖片</button>
          </div>
          <VForm v-slot="{ errors }">
            <div v-show="isOpen === 'info'" class="row gy-4">
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
                  <option value="個">個</option>
                </VField>
                <ErrorMessage name="單位" class="invalid-feedback" />
              </div>
              <div class="col-lg-12">
                <div class="form-check form-switch rounded-100">
                  <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="id_enabled" v-model.number="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_state">{{ tempProduct.is_enabled? '已啟用商品':'未啟用商品' }}</label>
                </div>
              </div>
            </div>
            <div v-show="isOpen === 'content'" class="row gy-4">
              <div class="col-12">
                <label for="productContent" class="form-label">商品內容</label>
                <input type="text" id="productContent" v-model="tempProduct.content" placeholder="請輸入商品內容" class="form-control" />
              </div>
              <div class="col-12">
                <label for="productDescription" class="form-label">商品說明</label>
                <textarea id="productDescription" v-model="tempProduct.description" placeholder="請輸入商品說明" class="form-control" rows="4"></textarea>
              </div>
            </div>
            <div v-show="isOpen === 'image'" class="row gy-4">
              <!-- 第一張為主圖 -->
              <!-- 多圖設置：
                   沒有任何圖片，顯示 新增button
                   input 尚未輸入前，不顯示 新增button
                   input 輸入後，自動顯示 新增button
              -->
              <ul v-if="!tempProduct.imagesUrl" class="list-unstyled d-flex justify-content-between">
                <li>
                  <div v-if="!tempProduct.imageUrl" style="height: 120px; width: 120px; border: 3px dotted #cbd5e1;" class="d-flex justify-content-center align-items-center"><font-awesome-icon icon="fa-regular fa-image" class="text-gray-300 fs-6" /></div>
                  <img v-else :src="tempProduct.imageUrl" style="height: 120px; width:120px" class="object-fit-cover" :alt="product.title">
                </li>
                <li v-if="!tempProduct.imagesUrl">
                  <div style="height: 120px; width: 120px; border: 3px dotted #cbd5e1;" class="d-flex justify-content-center align-items-center"><font-awesome-icon icon="fa-regular fa-image" class="text-gray-300 fs-6" /></div>
                </li>
              </ul>
              <div>
                <div class="row align-items-center g-3 mb-3">
                  <div class="col-2">
                    <label for="form-label">主圖</label>
                  </div>
                  <div class="col-10">
                    <input type="text" class="form-control" v-model="tempProduct.imageUrl">
                  </div>
                </div>
                <div class="row align-items-center g-3">
                  <div class="col-2">
                    <label for="form-label">多圖設置</label>
                  </div>
                  <div class="col-10 ms-auto">
                    <input type="text" class="form-control" v-model="tempProduct.imageUrl">
                  </div>
                  <div class="col-10 ms-auto">
                    <input type="text" class="form-control" v-model="tempProduct.imageUrl">
                  </div>
                  <div class="col-10 ms-auto">
                    <input type="text" class="form-control" v-model="tempProduct.imageUrl">
                  </div>
                </div>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-gray-500" @click="tempProduct = {}">清除</button>
          <button type="button" class="btn btn-outline-gray-500" data-bs-dismiss="modal" @click="tempProduct = {}">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">{{ isNew ? '新增' : '更新' }}商品</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <!-- <div class="modal fade" ref="deleteModal" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <delete-modal :admin-type="type_zh" :temp-item="tempProduct" :delete-item="deleteProduct"></delete-modal>
  </div> -->
</template>
