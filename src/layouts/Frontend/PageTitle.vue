<script>
export default {
  props: ["title"]
}
</script>

<template>
  <div class="page-banner d-flex justify-content-center align-items-end overflow-hidden">
    <h2 class="page-title">{{ title }}</h2>
  </div>
</template>