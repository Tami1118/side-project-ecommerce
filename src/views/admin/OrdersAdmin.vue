<template>
  <div class="py-4 d-flex flex-column">
    <!-- 篩選 => 轉元件 -->
    <div class="card bg-light p-3 mb-4">
      <div class="d-flex flex-column gap-3">
        <input type="search" v-model="searchKeyword" class="form-control" placeholder="請輸入電話號碼">
        <select name="filterStatus" id="filterStatus" class="form-select" v-model="filterStatus">
          <option value="" selected>訂單狀態</option>
          <option value="true">已付款</option>
          <option value="false">未付款</option>
        </select>
        <select name="sortItem" id="sortItem" class="form-select" v-model="sortItem">
          <option value="" selected>{{type}}排序</option>
          <option v-for="item in sort" :key="item" :value="item">{{item}}</option>
        </select>
        <button class="btn btn-primary" @click="clearFilter">清除篩選</button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="d-flex flex-column">
      <table class="table table-hover align-middle">
        <thead>
          <tr class="bg-light">
            <th>訂單日期</th>
            <th>Email</th>
            <th>Tel</th>
            <th>付款進度</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortItems" :key="item.id">
            <td>{{dateFormat(item.create_at)}}</td>
            <td>{{item.user.email}}</td>
            <td>{{item.user.tel}}</td>
            <td>
              <div v-if="item.is_paid" class="text-success">已付款</div>
              <div v-else class="text-muted">未付款</div>
            </td>
            <td class="d-flex gap-3">
              <button class="btn btn-primary" @click="openModal('edit', item)">編輯</button>
              <button class="btn btn-danger" @click="openModal('delete', item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁 => 已轉元件 -->
      <!-- component: pagination, getAll -->
      <page-component :pagination="pagination" :get-pages="getAll"></page-component>
    </div>
  </div>

  <!-- 新增、編輯模板 => 已轉元件 -->
  <!-- component: isNew, tempItem, updateItem -->
  <div class="modal fade" ref="modal" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
import { dateFormat } from "@/mixins/format.js";
import updateModal from "@/components/admin/modals/orderModal.vue";
import deleteModal from "@/components/admin/modals/deleteModal.vue";
import pageComponent from "@/components/pageComponent.vue";

export default {
  components: {
    updateModal,
    deleteModal,
    pageComponent,
  },
  data() {
    return {
      //* filter
      searchKeyword: "",
      sortItem: "",
      sort: ["訂單時間：由新至舊", "訂單時間：由舊至新"],
      filterStatus: "",

      // item
      allItem: [],
      tempItem: {},
      due_date: "",
      today: "",

      // pagination
      pagination: {},

      // document
      type: "訂單",
      apiType: "order",
      isLoading: false,

      // modal 模板實體化
      updatemodal: null,
      deleteModal: null,
      isNew: false,
    };
  },
  mounted() {
    this.getAll();
    this.updateModal = new Modal(this.$refs.modal);
    this.deleteModal = new Modal(this.$refs.deleteModal);
    document.title = `甜福屋 | ${this.type}管理`;
    [this.today] = new Date().toISOString().split("T");
  },
  computed: {
    filterItems() {
      let itemList = this.allItem;

      // 電話搜尋
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        itemList = itemList.filter((item) =>
          item.user.tel.toLowerCase().match(keyword)
        );
      }

      // 狀態篩選
      if (this.filterStatus !== "") {
        itemList = itemList.filter((item) => {
          if (this.filterStatus == 'true') {
            return item.is_paid == true;
          } else {
            return item.is_paid == false;
          }
        });
      }

      return itemList;
    },

    sortItems() {
      const itemList = this.filterItems.slice();

      // 時間排序
      if (this.sortItem === "訂單時間：由新至舊") {
        itemList.sort((a, b) => b.create_at - a.create_at);
      } else if (this.sortItem === "訂單時間：由舊至新") {
        itemList.sort((a, b) => a.create_at - b.create_at);
      }

      return itemList;
    },

    dateFormat() {
      return dateFormat;
    },
  },
  methods: {
    clearFilter() {
      this.searchKeyword = "";
      this.filterStatus = "";
      this.sortItem = "";
    },

    getAll(page = 1) {
      const pageUrl = `${VITE_URL}/api/${VITE_PATH}/admin/${this.apiType}s?page=${page}`;

      this.$http
        .get(pageUrl)
        .then((res) => {
          this.allItem = Object.values(res.data[`${this.apiType}s`]);
          this.pagination = res.data.pagination;
          console.log(this.allItem)
        })
        .catch(() => {
          Alert.fire({
            icon: "error",
            title: `${this.type}資料取得失敗`,
          });
        });
    },

    openModal(status, item) {
      if (status === "create") {
        this.isNew = true;
        this.updateModal.show();
        if (this.tempItem) {
          this.tempItem = {};
        }
      } else if (status === "edit") {
        this.isNew = false;
        this.updateModal.show();
        this.tempItem = JSON.parse(JSON.stringify(item));
      } else if (status === "delete") {
        this.deleteModal.show();
        this.tempItem = JSON.parse(JSON.stringify(item));
      }
    },

    updateItem() {
      const method = this.isNew ? "post" : "put";
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/${this.apiType}/`;
      const uid = this.isNew ? "" : `${this.tempItem.id}`;
      const msg = this.isNew ? "新增" : "更新";

      this.$http[method](`${url}${uid}`, { data: this.tempItem })
        .then((res) => {
          console.log(`成功${msg}${this.type}`, res);
          this.getAll();
          Toast.fire({
            title: `成功${msg}${this.type}`,
            icon: "success",
          });
          this.modal.hide();
        })
        .catch((err) => {
          console.log(`${this.type}取得${msg}`, err.response.data);
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
          this.getAll();
          this.deleteModal.hide();
          Toast.fire({
            icon: "success",
            title: `成功刪除${this.type}`,
          });
        })
        .catch(() => {
          Alert.fire({
            icon: "error",
            title: `刪除${this.type}失敗，請再試一次！`,
          });
        });
    },
  },
};
</script>