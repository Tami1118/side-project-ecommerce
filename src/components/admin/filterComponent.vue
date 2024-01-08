<script>
export default {
  props: {
    category: Array,
    sort: Array,
    allItem: Object,
  },
  data() {
    return {
      filterCategory: "",
      filterStatus: "",
      sortItem: "",
      searchKeyword: "",
    };
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

      // 狀態篩選
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
  },
  methods: {
    clearFilter() {
      this.$emit("clear-filter");
    },
  },
};
</script>

<template>
  <!-- 
  v-model => searchKeyword, filterCategory, filterStatus, sortItem
  item => category, sort, allItem
  computed => filterItems, sortItems
 -->
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
        <option value="" selected>商品排序</option>
        <option v-for="item in sort" :key="item" :value="item">{{item}}</option>
      </select>
      <button class="btn btn-primary" @click="clearFilter">清除篩選</button>
    </div>
  </div>
</template>
