<template>
  <!-- 1. breadcrumb -->
  
  
  <!-- 2. article list -->
  <!-- article card: imageUrl, create_at, author, title, description -->
  <div v-for="item in articles" :key="item.id">
    <router-link :to="`/article/${item.id}`">
      {{item.title}}
    </router-link>
  </div>


  <!-- 3. article pagination -->
  <page-component :pagination="pagination" :get-pages="getArticles"></page-component>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import articleStore from '@/stores/articleStore'
import pageComponent from '@/components/pageComponent.vue'

export default {
  components: {
    pageComponent
  },
  mounted(){
    this.getArticles()
  },
  methods: {
    ...mapActions(articleStore, ["getArticles", "getArticle"])
  },
  computed: {
    ...mapState(articleStore, ["articles", "article", "pagination"])
  }
}
</script>