<template>
  <div v-if="article">
    <div class="page-banner text-white">
      <div class="container">
        <h2>{{ article.title }}</h2>
      </div>
      <img :src="article.imageUrl" :alt="`${article.title} 圖片`" class="object-image h-400">
    </div>

    <!-- 1. breadcrumb -->


    <!-- 2. article's content -->
    <!-- title, create_at, author, tag, imageUrl, content -->

    <!-- 3. prev/next article link -->
    <!-- {{articles[currIndex - 1].title}}
    {{articles[currIndex].title}}
    {{articles[currIndex + 1].title}} -->

    <!-- 4. article sidebar -->
    <!-- last article list * 5, if have time to do tag -->
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      article: {},
      articles: [],
      pagination: {},
      currIndex: null,
      prevIndex: null,
      nextIndex: null,
    };
  },
  mounted() {
    this.getArticles();
    this.getArticle();
  },
  computed: {
    // currentArticle(){
    //   return this.articles.findIndex(item => item.id === this.article.id)
    // },
    // nextArticle(){
    //   const currentIndex = this.articles.findIndex(item => item.id === this.article.id)
    //   return this.articles[currentIndex + 1]
    // },
    // prevArticle(){
    //   const currentIndex = this.articles.findIndex(item => item.id === this.article.id)
    //   return this.articles[currentIndex - 1]
    // }
  },
  methods: {
    getArticles() {
      const url = `${VITE_URL}/api/${VITE_PATH}/articles`;
      console.log("getArticles 取得所有文章", url);
      this.$http
        .get(url)
        .then((res) => {
          // console.log('取得所有文章',res)
          const { articles, pagination } = res.data
          this.articles = articles
          this.pagination = pagination
          console.log("getArticle 取得所有文章", this.articles);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getArticle() {
      const { id } = this.$route.params;
      const url = `${VITE_URL}/api/${VITE_PATH}/article/${id}`;
      this.$http
        .get(url).then((res) => {
          console.log(res);
          const article = res.data.article
          this.article = article
          this.currIndex = this.articles.findIndex(item => item.id === this.article.id)
          // 發現有時間差，會導致 index 會跑出 -1
          // console.log(this.article.id)
          // console.log('取得文章索引',this.articles.find(item => item.id === this.article.id))
        })
        .catch(err => {
          console.log(err)
        });
    },
    // 1. getArticles 取得得所有文章 => articles
    // 2. getArticle 取得單一文章 => article
    // 3. articles.findIndex(item => item.id === this.article.id) 取得該篇文章索引
    // 4. 賦予值 currentIndex 索引值
    // 5. 上一篇 currentIndex - 1, 下一篇 currentIndex + 1 取得索引值
    // 6. articles[currentIndex - 1], articles[currentIndex + 1] 取得 id
    // 7. 將 id 帶入 getArticle 取得上一篇及下一篇詳細資料

    nextArticle() {
      this.nextIndex = this.currIndex + 1
    },
    prevArticle() {
      this.prevIndex = this.currIndex - 1
    }
  },
};
</script>