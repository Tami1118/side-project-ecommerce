<script>
import { mapActions, mapState } from "pinia";
import productStore from "@/stores/productStore";

export default {
  // Q: 為什麼這個需要在自己的元件進行函數操作，不能直接用 store 來操作呢？
  // A: 由於該元件 button 文字需使用到data，因此需要取得 selectSort 值，這裡需要再把 changeSort 取得值
  
  data() {
    return {
      selectSort: "商品排序",
      isDropdown: false, // 啟用 dropdown 下拉
    };
  },
  methods: {
    ...mapActions(productStore, ["getSort"]),
    changeSort(item) {
      this.selectSort = item;
      this.getSort(item);
    },
  },
  computed: {
    ...mapState(productStore, ["sortItems"]),
  },
};
</script>

<template>
  <div class="dropdown d-flex justify-content-end" @click="isDropdown = !isDropdown">
    <button class="btn border-secondary btn-sm" :class="{'btn-primary': selectSort !== '商品排序','border-0': selectSort !== '商品排序'}" type="button" data-bs-toggle="dropdown">
      {{selectSort !== '商品排序' ? selectSort: '商品排序'}}
      <!-- {{isDropdown}} -->
    </button>
    <ul class="dropdown-menu" :class="{'d-block':isDropdown}">
      <li v-for="(item, key) in sortItems" :key="key" @click="changeSort(item)">
        <div class="dropdown-item" :class="{'bg-secondary': item === selectSort}">{{item}}</div>
      </li>
    </ul>
  </div>
</template>