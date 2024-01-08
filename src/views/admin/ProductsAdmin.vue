<template>
  <div class="py-4 d-flex flex-column">
    <!-- 篩選 => 轉元件 -->
    <div class="card bg-light p-3 mb-4">
      <div class="d-flex flex-column gap-3">
        <input type="search" v-model="searchKeyword" class="form-control" placeholder="請輸入關鍵字">
        <select name="filterCategory" id="filterCategory" class="form-select" v-model="filterCategory">
          <option value="" selected>全部類別</option>
          <option v-for="item in category" :key="item" :value="item">{{item}}</option>
        </select>
        <select name="filterStatus" id="filterStatus" class="form-select" v-model="filterStatus">
          <option value="" selected>狀態篩選</option>
          <option value="1">已啟用</option>
          <option value="0">未啟用</option>
        </select>
        <select name="sortItem" id="sortItem" class="form-select" v-model="sortItem">
          <option value="" selected>{{type}}排序</option>
          <option v-for="item in sort" :key="item" :value="item">{{item}}</option>
        </select>
        <button class="btn btn-primary" @click="clearFilter">清除篩選</button>
      </div>
    </div>

    <!-- 產品列表 -->
    <div class="d-flex flex-column">
      <div class="d-flex">
        <button class="btn btn-success ms-auto" @click="openModal('create')">新增</button>
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <tr class="bg-light">
            <th>產品類別</th>
            <th>產品名稱</th>
            <th>原價</th>
            <th>價格</th>
            <th>狀態</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortItems" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td>{{item.origin_price}}</td>
            <td>{{item.price}}</td>
            <td>
              <div v-if="item.is_enabled" class="text-success">已啟用</div>
              <div v-else class="text-muted">未啟用</div>
            </td>
            <td class="d-flex gap-3">
              <button class="btn btn-primary" @click="openModal('edit', item)">編輯</button>
              <button class="btn btn-danger" @click="openModal('delete', item)">刪除</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="bg-light">
              <p class="text-end mb-0">
                共 {{getItemLength}} 項{{type}}
              </p>
            </td>
          </tr>
        </tfoot>
      </table>

      <!-- 分頁 => 已轉元件 -->
      <!-- component: pagination, getAll -->
      <page-component :pagination="pagination" :get-pages="getAll"></page-component>
    </div>
  </div>

  <!-- 新增、編輯模板 => 已轉元件 -->
  <!-- component: isNew, tempItem, updateItem -->
  <div class="modal fade" ref="updateModal" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <update-modal :admin-type="type" :is-new="isNew" :admin-item="tempItem" @update-item="updateItem"></update-modal>
  </div>

  <!-- 刪除模板 => 已轉元件 -->
  <!-- component: type, tempItem, deleteItem -->
  <div class="modal fade" ref="deleteModal" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <delete-modal :admin-type="type" :temp-item="tempItem" :delete-item="deleteItem"></delete-modal>
  </div>
</template>


<script>
const { VITE_PATH, VITE_URL } = import.meta.env;
import Modal from "bootstrap/js/dist/modal";
import { Toast, Alert } from "@/mixins/swal.js";
import updateModal from "@/components/admin/modals/productModal.vue"; //*
import deleteModal from "@/components/admin/modals/deleteModal.vue";
import pageComponent from "@/components/pageComponent.vue";

export default {
  components: {
    // filterComponent
    updateModal,
    deleteModal,
    pageComponent,
  },
  data() {
    return {
      //* filter
      searchKeyword: "",
      filterCategory: "",
      category: ["生乳捲", "美式塔派", "生日蛋糕", "甜甜圈"],
      sortItem: "",
      sort: ["價格：由高至低", "價格：由低至高"],
      filterStatus: "",
      unit: ["個"],

      // item
      allItem: [],
      itemLength: "",
      tempItem: { //*
        category: "",
        unit: "",
      },

      // pagination
      pagination: {},

      //* document
      type: "商品",
      apiType: "product",
      isLoading: false,

      // modal 模板實體化
      updateModal: null,
      deleteModal: null,
      isNew: false,
    };
  },
  mounted() {
    this.getAll();
    this.updateModal = new Modal(this.$refs.updateModal);
    this.deleteModal = new Modal(this.$refs.deleteModal);
    document.title = `甜福屋 | ${this.type}管理`;
  },
  computed: {
    filterItems() {
      let itemList = this.allItem;

      // 關鍵字搜尋
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        itemList = itemList.filter((item) =>
          item.title.toLowerCase().match(keyword)
        );
      }

      // 類型篩選
      if (this.filterCategory) {
        itemList = itemList.filter(
          (item) => item.category === this.filterCategory
        );
      }

      // 狀態篩選(針對is_enabled為false直接不顯示而處理)
      if (this.filterStatus !== "") {
        itemList = itemList.filter((item) => {
          if (this.filterStatus == true) {
            return item.is_enabled == true;
          } else {
            return (
              (item.is_enabled !== undefined && item.is_enabled === false) ||
              (item.is_enabled === undefined && this.filterStatus === "0")
            );
          }
        });
      }

      return itemList;
    },

    sortItems() {
      const itemList = this.filterItems.slice();

      // 價格排序
      if (this.sortItem === "價格：由高至低") {
        itemList.sort((a, b) => b.price - a.price);
      } else if (this.sortItem === "價格：由低至高") {
        itemList.sort((a, b) => a.price - b.price);
      }

      return itemList;
    },

    //* 數值變動後立即更新
    getItemLength() {
      return this.itemLength;
    },
  },
  methods: {
    clearFilter() {
      this.searchKeyword = "";
      this.filterCategory = "";
      this.filterStatus = "";
      this.sortItem = "";
    },

    getAll(page = 1) {
      const itemUrl = `${VITE_URL}/api/${VITE_PATH}/admin/${this.apiType}s/all`;
      const pageUrl = `${VITE_URL}/api/${VITE_PATH}/admin/${this.apiType}s?page=${page}`;
      this.$http
        .get(itemUrl)
        .then((res) => {
          // console.log(`成功取得全部${this.type}資料列表`, res);
          this.itemLength = Object.values(res.data[`${this.apiType}s`]).length;
        })
        .catch(() => {
          // console.log(`${this.type}列表取得失敗`, err.response.data);
          Alert.fire({
            icon: "error",
            title: `${this.type}資料取得失敗`,
          });
        });

      this.$http
        .get(pageUrl)
        .then((res) => {
          // console.log(`成功取得頁碼${this.type}資料`,res)
          this.allItem = Object.values(res.data[`${this.apiType}s`]);
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          // console.log(`${this.type}取得失敗`, err.response.data);
          Alert.fire({
            icon: "error",
            title: `${this.type}資料取得失敗`,
          });
        });
    },

    openModal(status, item) {
      if (status === "create") {
        // console.log(`這是${status}狀態`);
        this.isNew = true;
        this.updateModal.show();
        if (this.tempItem) {
          this.tempItem = { //*
            category: "",
            unit: "",
          };
        }
      } else if (status === "edit") {
        // console.log(`這是${status}狀態`, item);
        this.isNew = false;
        this.updateModal.show();
        this.tempItem = JSON.parse(JSON.stringify(item));
      } else if (status === "delete") {
        // console.log(`這是${status}狀態`, item);
        this.deleteModal.show();
        this.tempItem = JSON.parse(JSON.stringify(item));
      }
    },

    updateItem() {
      const method = this.isNew ? "post" : "put";
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.apiType}/`;
      const uid = this.isNew ? "" : `${this.tempItem.id}`;
      const msg = this.isNew ? "新增" : "更新";
      // console.log(method, url, uid, msg)

      this.$http[method](`${url}${uid}`, { data: this.tempItem })
        .then(() => {
          // console.log(`成功${msg}${this.type}`, res);
          this.getAll();
          this.tempItem = {};
          Toast.fire({
            title: `成功${msg}${this.type}`,
            icon: "success",
          });
          this.updateModal.hide();
        })
        .catch(() => {
          // console.log(`${this.type}取得${msg}`, err.response.data);
          Alert.fire({
            title: `${msg}${this.type}失敗`,
            text: "請確認必填欄位是否已填寫",
            icon: "error",
          });
        });
    },

    deleteItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.apiType}/${id}`;
      this.$http
        .delete(url)
        .then(() => {
          // console.log(`成功刪除${this.type}`, res);
          this.getAll();
          this.deleteModal.hide();
          Toast.fire({
            icon: "success",
            title: `成功刪除${this.type}`,
          });
        })
        .catch(() => {
          // console.log(`刪除${this.type}失敗`,err.response.data);
          Alert.fire({
            icon: "error",
            title: `刪除${this.type}失敗，請再試一次！`,
          });
        });
    },
  },
};
</script>