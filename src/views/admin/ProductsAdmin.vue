<script>
const { VITE_PATH, VITE_URL } = import.meta.env;
import { Toast, Alert } from "@/mixins/swal.js";

import { mapState } from "pinia";
import productStore from "@/stores/productStore";

import Modal from "bootstrap/js/dist/modal";
import adminTitle from "@/components/admin/adminTitle.vue"
import productModal from "@/components/admin/modals/productModal.vue";
import deleteModal from "@/components/admin/modals/deleteModal.vue";
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
        origin_price: null,
        price: null,
        unit: '',
        is_enabled: 0,
        content: '',
        description: '',
        imageUrl: '',
        imagesUrl: []
      },
      isNew: false,
      isTab: 'info',

      // Filter product
      searchKeyword: "",
      selectCategory: "",
      selectStatus: "",
      selectSort: "",

      // Modal init
      productModal: null,
      deleteModal: null,
      testModal: null,
    };
  },
  mounted() {
    this.getProducts();
    this.getProductAll();
    this.productModal = new Modal(this.$refs.productModal);
    this.deleteModal = new Modal(this.$refs.deleteModal);
  },
  components: {
    adminTitle,
    productModal,
    deleteModal,
    pageComponent,
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
          const { products, pagination } = res.data
          this.products = products;
          this.pagination = pagination;
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
        this.isTab = 'info';
        this.productModal.show();
      } else if (state === "edit") {
        // console.log(state)
        this.isNew = false;
        this.isTab = 'info';
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
    updateProduct(tempProduct) {
      const method = this.isNew ? "post" : "put";
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}/`;
      const uid = this.isNew ? "" : `${tempProduct.id}`;
      const msg = this.isNew ? "新增" : "更新";

      this.$http[method](`${url}${uid}`, { data: tempProduct })
        .then(() => {
          this.getProducts();
          Toast.fire({
            icon: "success",
            title: `已${msg}商品`,
          });
          this.productModal.hide();
          this.clearForm()
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


    clearFilter() {
      this.searchKeyword = "";
      this.selectCategory = "";
      this.selectStatus = "";
      this.selectSort = "";
    },

    clearForm() {
      this.tempProduct = {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        content: '',
        description: '',
        imageUrl: '',
        imagesUrl: []
      }
    },

    closeModal() {
      this.productModal.hide()
    }
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
};
</script>

<template>
  <admin-title :page-type="type_zh" :datas="sortProduct"></admin-title>

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
              <button type="button" @click="openModal('edit', product)" class="btn btn-outline-primary"><font-awesome-icon icon="fa-regular fa-pen-to-square" class="me-1" />編輯</button>
              <button type="button" class="btn btn-outline-gray-500" @click="openModal('delete', product)"><font-awesome-icon icon="fa-regular fa-trash-can" class="me-1" />刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagenation -->
    <page-component :pagination="pagination" :get-pages="getProducts"></page-component>
  </div>

  <!-- Product Modal -->
  <div ref="productModal" class="modal fade" id="productModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <product-modal :is-new="isNew" :admin-product="tempProduct" :update-product="updateProduct" @close-modal="closeModal"></product-modal>
  </div>

  <!-- Delete Modal -->
  <div class="modal fade" ref="deleteModal" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <delete-modal :admin-type="type_zh" :temp-item="tempProduct" :delete-item="deleteProduct"></delete-modal>
  </div>
</template>