import { defineStore } from 'pinia'
const { VITE_URL, VITE_PATH } = import.meta.env;
import axios from 'axios'

export default defineStore ('article', {
  state: () => {
    return {
      articles: [],
      article: {},
      pagination: {},
      currentArticle: 0,
    }
  },
  actions: {
    getArticles(page = 1){
      const url = `${VITE_URL}/api/${VITE_PATH}/articles?page=${page}`
      console.log('getArticles 取得所有文章', url)
      axios.get(url)
        .then(res => {
          // console.log('取得所有文章',res)
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          // console.log(this.articles, this.pagination)
          console.log('getArticle 取得所有文章', this.articles)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    
    getArticle(id){
      // const {id} = this.$route.params
      // 取得該文章的索引
      // 推算該文章前後索引
      // 取得前後索引資料
      const url = `${VITE_URL}/api/${VITE_PATH}/article/${id}`
      console.log('取得單一文章',url)
      axios.get(url)
        .then(res => {
          console.log(res)
          // this.currentArticle = this.article.filter(item => )
          this.article = res.data.article
          this.currentArticle = this.article.findIndex(item => item.id === id)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  getters: {
    getPrevArticle(){

    },
    getNextArticle(){
      
    }
  }
})