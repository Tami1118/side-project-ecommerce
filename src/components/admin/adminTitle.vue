<script>
export default {
  props: {
    pageType: String,
    datas: Object,
  }
}
</script>

<template>
  <div class="bg-gray-100">
    <div class="container py-3 px-10">
      <p class="fs-5 fw-500">{{ pageType }}管理<span v-if="datas" class="fs-3h"> (共 <strong class="text-secondary">{{ datas.length }}</strong> 筆資料)</span></p>
    </div>
  </div>
</template>