<template>
  <div>
    <!-- 1. banner -->
    <page-title title="News"></page-title>

    <!-- 2. breadcrumb -->

    <!-- 3. article list -->
    <!-- article card: imageUrl, title, description, create_at -->
    <div class="container section-space">
      <p class="fs-5 fs-6 mb-4">最新消息一覽</p>
      <div class="row row-cols-md-2 row-cols-xl-3 g-4">

        <router-link :to="`/article/${article.id}`" v-for="article in articles" :key="article.id" class="col-12">
          <div class="row g-0">
            <div class="col-4 col-md-12">
              <img :src="article.imageUrl" class="article-card-image" :alt="`${article.title}圖片`">
            </div>
            <div class="col-8 col-md-12">
              <div class="article-card">
                <h3 class="article-card-title">{{ article.title }}</h3>
                <p class="article-card-content ellipsis-multiple" v-html="article.description"></p>
                <p class="article-card-date">{{ article.create_at }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>


      <!-- 4. article pagination -->
      <p>總頁{{ pagination.total_pages }}</p>
      <p>目前{{ pagination.current_page }}</p>
      <p>上頁{{ pagination.has_pre }}</p>
      <p>下頁{{ pagination.has_next }}</p>
      <p>類別{{ pagination.category }}</p>
      <page-component :pagination="pagination" :get-pages="getArticles"></page-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import articleStore from '@/stores/articleStore'
import pageComponent from '@/components/pageComponent.vue'
import PageTitle from '@/layouts/Frontend/PageTitle.vue'

export default {
  components: {
    pageComponent,
    PageTitle
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    ...mapActions(articleStore, ["getArticles", "getArticle", "paginatoin"]),
  },
  computed: {
    ...mapState(articleStore, ["articles", "article", "pagination"]),
  }
}
</script>