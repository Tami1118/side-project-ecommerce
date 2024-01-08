<script>
import { mapActions, mapState } from "pinia";
import productStore from "@/stores/productStore";

export default {
  methods: {
    ...mapActions(productStore, ["getCategory"]),
  },
  computed: {
    ...mapState(productStore, ["selectCategory", "categories"]),
  },
};
</script>

<template>
  <div class="card">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" :class="{'active': item === selectCategory}" v-for="item in categories" :key="item" @click="getCategory(item)" style="cursor: pointer;">{{item}}</li>
    </ul>
  </div>
</template>