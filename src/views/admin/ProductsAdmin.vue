<script>
import Modal from "bootstrap/js/dist/modal";

const { VITE_PATH, VITE_URL } = import.meta.env;
import { Toast, Alert } from "@/mixins/swal.js";
// import updateModal from "@/components/admin/modals/productModal.vue";
import deleteModal from "@/components/admin/modals/deleteModal.vue";
import pageComponent from "@/components/pageComponent.vue";

export default {
  components: {
    // updateModal,
    deleteModal,
    pageComponent,
  },
  data() {
    return {
      email: '',
      showContent: 'basic',
      openContent: false,

      type: "product",
      type_zh: "商品",

      // products
      product: {},
      products: [],
      pagination: {},
      productAll: [],
      isNew: false,
      tempProduct: {
        // category: "",
        // content: "",
        // description: "",
        // imageUrl: "",
        // imagesUrl: [],
        // is_enabled: 0,
        // num: 0,
        // origin_price: 0,
        // price: null,
        // title: null,
        unit: "個",
      },

      // filter
      searchKeyword: "",
      selectCategory: "",
      category: ["生乳捲", "美式塔派", "生日蛋糕", "甜甜圈"],
      selectSort: "",
      sort: ["特價：由高至低", "特價：由低至高"],
      selectStatus: "",
      unit: ["個"],

      // modal 模板實體化
      updateModal: null,
      deleteModal: null,
    };
  },
  mounted() {
    this.getProducts();
    this.getProductAll();
    // this.updateModal = new Modal(this.$refs.updateModal);
    this.deleteModal = new Modal(this.$refs.deleteModal);
  },
  methods: {
    /**
     * 取得所有產品列表及頁碼
     * @param {*} page 產品頁碼
     */
    getProducts(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}s?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          console.log('getProducts 已取得', res);
          this.products = Object.values(res.data.products);
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
     * 取得所有產品列表
     */
    getProductAll() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}s/all`;
      this.$http.get(url)
        .then((res) => {
          console.log('getProductAll 已取得', res);
          this.productAll = res.data.products;
          this.productAllLength = Object.values(this.productAll).length
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
     * 開啟Modal(新增/編輯、刪除)
     * @param {*} status 產品狀態
     * @param {*} item 產品資料傳入
     */
    openModal(status, item) {
      if (status === "create") {
        // console.log(status)
        this.isNew = true;
        this.updateModal.show();
      } else if (status === "edit") {
        // console.log(status)
        this.isNew = false;
        this.updateModal.show();
        this.tempProduct = JSON.parse(JSON.stringify(item));
      } else if (status === "delete") {
        // console.log(status)
        this.deleteModal.show();
        this.tempProduct = JSON.parse(JSON.stringify(item));
      }
    },


    /**
     * 新增或更新資料
     */
    update() {
      const method = this.isNew ? "post" : "put";
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.type}/`;
      const uid = this.isNew ? "" : `${this.tempProduct.id}`;
      const msg = this.isNew ? "新增" : "更新";
      // console.log(method, url, uid, msg)

      this.$http[method](`${url}${uid}`, { data: this.tempProduct })
        .then(() => {
          this.getProducts();
          this.tempProduct = {};
          Toast.fire({
            icon: "success",
            title: `已${msg}商品`,
          });
          this.updateModal.hide();
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
     * 刪除訂單
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

    // 清除篩選
    clearFilter() {
      this.searchKeyword = "";
      this.selectCategory = "";
      this.selectStatus = "";
      this.selectSort = "";
    },



    onSubmit() {
      console.log(this.tempProduct, null, 2);
    },
  },

  computed: {
    // 篩選
    filterProducts() {
      let itemList = this.products;

      // 關鍵字搜尋
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        itemList = itemList.filter((item) =>
          item.title.toLowerCase().match(keyword)
        );
      }

      // 類型篩選
      if (this.selectCategory) {
        itemList = itemList.filter(
          (item) => item.category === this.selectCategory
        );
      }

      // 狀態篩選(針對is_enabled為false直接不顯示而處理)
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

    // 排序
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
  <div>
    <div class="bg-gray-100">
      <div class="container px-3 px-lg-10 py-lg-3">
        <h1 class="fs-5">{{ type_zh }}管理<span class="fs-3h"> (共 <strong class="text-secondary">{{ sortProduct.length }}</strong> 筆資料)</span></h1>
      </div>
    </div>

    <div class="container py-4 px-10 d-flex flex-column gap-6">

      <!-- Filter -->
      <div class="d-lg-flex gap-2">
        <button class="btn btn-primary me-auto" @click="openModal('create')"><i class="fi fi-sr-add me-2"></i>新增產品</button>
        <input type="search" v-model="searchKeyword" class="form-control w-fit-content" placeholder="請輸入產品關鍵字">
        <select name="selectCategory" id="selectCategory" class="form-select w-fit-content" v-model="selectCategory">
          <option value="" selected>全部類別</option>
          <option v-for="item in category" :key="item" :value="item">{{ item }}</option>
        </select>
        <select name="selectStatus" id="selectStatus" class="form-select w-fit-content" v-model="selectStatus">
          <option value="" selected>狀態篩選</option>
          <option value="1">已啟用</option>
          <option value="0">未啟用</option>
        </select>
        <select name="selectSort" id="selectSort" class="form-select w-fit-content" v-model="selectSort">
          <option value="" selected>商品排序</option>
          <option v-for="item in sort" :key="item" :value="item">{{ item }}</option>
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
            <th class="text-end" width="10%">特價</th>
            <th class="text-end" width="10%">原價</th>
            <th class="text-center" width="10%">狀態</th>
            <th width="25%"></th>
          </tr>
        </thead>
        <tbody v-if="products">
          <tr v-for="product in sortProduct" :key="product" class="border-bottom border-gray-200">
            <td>
              <img :src="product.imageUrl" class="object-fit-cover rounded-4" style="height: 80px;width: 100%" :alt="product.title">
            </td>
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
                <button type="button" class="btn btn-primary" @click="openModal('edit', product)"><i class="fi fi-sr-file-edit me-2"></i>編輯</button>
                <button type="button" class="btn btn-outline-secondary" @click="openModal('delete', product)"><i class="fi fi-sr-trash me-2"></i>刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <page-component :pagination="pagination" :get-pages="getProducts"></page-component>

    <!-- 新增、編輯模板 => 已轉元件 -->
    <!-- component: isNew, tempProduct, update -->
    <!-- <div class="modal fade" ref="updateModal" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
      <update-modal></update-modal>
    </div> -->

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      測試
    </button>

    <!-- Modal -->
    <VForm @submit="onSubmit()" class="modal fade needs-validation" v-slot="{errors}" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" @click="openContent = false" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row gy-4">
              <div class="col-lg-8">
                <label for="productTitle" class="form-label">商品名稱 <span class="text-danger">*</span></label>
                <VField type="text"
                        id="productTitle"
                        name="商品名稱"
                        :class="{ 'is-invalid': errors['商品名稱'] }"
                        rules="required"
                        v-model="tempProduct.title"
                        placeholder="請輸入商品名稱"
                        class="form-control"
                        />
                <ErrorMessage name="商品名稱" class="invalid-feedback" />
              </div>
              <div class="col-lg-4">
                <label for="productCategory" class="form-label">商品類型 <span class="text-danger">*</span></label>
                <VField as="select"
                        id="productCategory"
                        name="商品類型"
                        :class="{ 'is-invalid': errors['商品類型'] }"
                        rules="required"
                        v-model="tempProduct.category"
                        class="form-select"
                        >
                        <option value="" selected>請選擇</option>
                        <option :value="item" v-for="item in category" :key="item">{{ item }}</option>
                </VField>
                <ErrorMessage name="商品類型" class="invalid-feedback" />
              </div>
              <div class="col-lg-4">
                <label for="productPrice" class="form-label">原價 <span class="text-danger">*</span></label>
                <VField type="number"
                        id="productPrice"
                        name="原價"
                        :class="{ 'is-invalid': errors['原價'] }"
                        rules="required|between:0,10000"
                        v-model.number="tempProduct.price"
                        placeholder="請輸入商品原價"
                        class="form-control"
                        max="10000"
                        min="0"
                        />
                <ErrorMessage name="原價" class="invalid-feedback" />
              </div>
              <div class="col-lg-4">
                <label for="productOriginPrice" class="form-label">特價 <span class="text-danger">*</span></label>
                <VField type="number"
                        id="productOriginPrice"
                        name="特價"
                        :class="{ 'is-invalid': errors['特價'] }"
                        rules="required|between:0,10000"
                        v-model.number="tempProduct.origin_price"
                        placeholder="請輸入商品特價"
                        class="form-control"
                        max="10000"
                        min="0"
                        />
                <ErrorMessage name="特價" class="invalid-feedback" />
              </div>
              <div class="col-lg-4">
                <label for="productUnit" class="form-label">單位 <span class="text-danger">*</span></label>
                <VField as="select"
                        id="productUnit"
                        name="單位"
                        :class="{ 'is-invalid': errors['單位'] }"
                        rules="required"
                        v-model="tempProduct.unit"
                        class="form-select"
                        >
                        <option value="" selected>請選擇</option>
                        <option value="個">個</option>
                </VField>
                <ErrorMessage name="單位" class="invalid-feedback" />
              </div> 
            </div>
            <button v-if="!openContent" type="button" class="btn btn-outline-gray-400 w-100" @click="openContent = true">增加商品內容</button>
            <template v-if="tempProduct.description || tempProduct.tempProduct || openContent">
              <hr>
              <div class="row gy-4">
                <div class="col-12">
                  <label for="productContent" class="form-label">商品內容</label>
                    <input type="text"
                          id="productContent"
                          v-model="tempProduct.content"
                          placeholder="請輸入商品內容"
                          class="form-control"
                          />
                </div>
                <div class="col-12">
                  <label for="productDescription" class="form-label">商品說明</label>
                  <textarea id="productDescription"
                            v-model="tempProduct.description"
                            placeholder="請輸入商品說明"
                            class="form-control"
                            rows="4"></textarea>
                </div>
              </div>
            </template>
            
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
            <button type="submit" class="btn btn-primary">儲存</button>
          </div>
        </div>
      </div>
    </VForm>

    <!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <VForm @submit="onSubmit" v-slot="{ errors }" class="needs-validation">
            <div class="modal-body">
              <div class="row gy-4">
                <div class="col-lg-8">
                  <label for="productTitle" class="form-label">商品名稱 <span class="text-danger">*</span></label>
                  <VField type="text"
                          id="productTitle"
                          name="商品名稱"
                          :class="{ 'is-invalid': errors['商品名稱'] }"
                          rules="required"
                          v-model="tempProduct.title"
                          placeholder="請輸入商品名稱"
                          class="form-control"
                          />
                  <ErrorMessage name="商品名稱" class="invalid-feedback" />
                </div>
                <div class="col-lg-4">
                  <label for="productCategory" class="form-label">商品類型 <span class="text-danger">*</span></label>
                  <VField as="select"
                          id="productCategory"
                          name="商品類型"
                          :class="{ 'is-invalid': errors['商品類型'] }"
                          rules="required"
                          v-model="tempProduct.category"
                          class="form-select"
                          >
                          <option value="" selected>請選擇</option>
                          <option :value="item" v-for="item in category" :key="item">{{ item }}</option>
                  </VField>
                  <ErrorMessage name="商品類型" class="invalid-feedback" />
                </div>
                <div class="col-lg-4">
                  <label for="productPrice" class="form-label">原價 <span class="text-danger">*</span></label>
                  <VField type="number"
                          id="productPrice"
                          name="原價"
                          :class="{ 'is-invalid': errors['原價'] }"
                          rules="required|between:0,10000"
                          v-model.number="tempProduct.price"
                          class="form-control"
                          max="10000"
                          min="0"
                          />
                  <ErrorMessage name="原價" class="invalid-feedback" />
                </div>
                <div class="col-lg-4">
                  <label for="productOriginPrice" class="form-label">特價 <span class="text-danger">*</span></label>
                  <VField type="number"
                          id="productOriginPrice"
                          name="特價"
                          :class="{ 'is-invalid': errors['特價'] }"
                          rules="required|between:0,10000"
                          v-model.number="tempProduct.origin_price"
                          class="form-control"
                          max="10000"
                          min="0"
                          />
                  <ErrorMessage name="特價" class="invalid-feedback" />
                </div>
                <div class="col-lg-4">
                  <label for="productUnit" class="form-label">單位 <span class="text-danger">*</span></label>
                  <VField as="select"
                          id="productUnit"
                          name="單位"
                          :class="{ 'is-invalid': errors['單位'] }"
                          rules="required"
                          v-model="tempProduct.unit"
                          class="form-select"
                          >
                          <option value="" selected>請選擇</option>
                          <option value="個">個</option>
                  </VField>
                  <ErrorMessage name="單位" class="invalid-feedback" />
                </div> 
              </div>     
              <div class="row gy-4">
                <div class="col-12">
                  <label for="productDescription" class="form-label">商品說明</label>
                  <VField as="textarea"
                          id="productDescription"
                          name="商品說明"
                          :class="{ 'is-invalid': errors['商品說明'] }"
                          rules=""
                          v-model="tempProduct.description"
                          placeholder="請輸入商品說明"
                          class="form-control"
                          style="height: 120px;"
                          />
                  <ErrorMessage name="商品說明" class="invalid-feedback" />
                </div>
                <div class="col-12">
                  <label for="productDescription" class="form-label">商品說明</label>
                  <VField as="textarea"
                          id="productDescription"
                          name="商品說明"
                          :class="{ 'is-invalid': errors['商品說明'] }"
                          rules=""
                          v-model="tempProduct.description"
                          placeholder="請輸入商品說明"
                          class="form-control"
                          style="height: 120px;"
                          />
                  <ErrorMessage name="商品說明" class="invalid-feedback" />
                </div>
              </div>
              <div class="row gy-4">
                <div class="col-12">
                  <label for="productDescription" class="form-label">商品說明</label>
                  <VField as="textarea"
                          id="productDescription"
                          name="商品說明"
                          :class="{ 'is-invalid': errors['商品說明'] }"
                          rules=""
                          v-model="tempProduct.description"
                          placeholder="請輸入商品說明"
                          class="form-control"
                          style="height: 120px;"
                          />
                  <ErrorMessage name="商品說明" class="invalid-feedback" />
                </div><div class="col-12">
                  <label for="productDescription" class="form-label">商品說明</label>
                  <VField as="textarea"
                          id="productDescription"
                          name="商品說明"
                          :class="{ 'is-invalid': errors['商品說明'] }"
                          rules=""
                          v-model="tempProduct.description"
                          placeholder="請輸入商品說明"
                          class="form-control"
                          style="height: 120px;"
                          />
                  <ErrorMessage name="商品說明" class="invalid-feedback" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary">清除</button>
              <button type="submit" class="btn btn-primary">儲存</button>
            </div>
          </VForm>
        </div>
      </div>
    </div> -->

    <!-- 刪除模板 => 已轉元件 -->
    <!-- component: type, tempProduct, deleteProduct -->
    <div class="modal fade" ref="deleteModal" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <delete-modal :admin-type="type_zh" :temp-item="tempProduct" :delete-item="deleteProduct"></delete-modal>
    </div>
  </div>
</template>
