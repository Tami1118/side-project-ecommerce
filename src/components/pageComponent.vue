<script>
export default {
  props: {
    pagination: { type: Object, required: true },
    getPages: { type: Function, required: true },
  },
};
</script>

<template>
  <div class="d-flex">
    <ul class="pagination-nav">
      <li v-for="item in pagination.total_pages" :key="item">
        <a class="pagination-link" :class="{'active': pagination.current_page === item}" @click.prevent="getPages(item)">{{ item }}</a>
      </li>
    </ul>

    <!-- <div>
      <a class="pagination-link" @click.prevent="getPages(pagination.current_page - 1)" :disabled="!pagination.has_pre">Prev</a>
      <a class="pagination-link" @click.prevent="getPages(pagination.current_page + 1)" :disabled="!pagination.has_next">Next</a>
    </div> -->
  </div>


  <!-- <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a class="page-link" @click.prevent="getPages(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="item in pagination.total_pages" :key="item" :class="{ active: pagination.current_page === item }">
        <a class="page-link" @click.prevent="getPages(item)">{{ item }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a class="page-link" @click.prevent="getPages(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav> -->
</template>

