import { defineStore } from 'pinia'
const { VITE_URL, VITE_PATH } = import.meta.env;
import axios from 'axios'
import { Alert } from '@/mixins/swal'

export default defineStore('product', {
  state: () => {
    return {
      type: 'product',
      product: {},
      products: [],
      productAll: [],
      pagination: {},
      
      // filter
      // select-category
      selectCategory: '全部類別',
      categories: [],
      // select-price
      selectSort: '',
      sortItems: ['商品排序', '價格：由高至低', '價格：由低至高'],
      // search-keyword
      searchKey: '',
    }
  },

  actions: {
    // 取得所有商品資料
    getProducts(page = 1) {
      // 使用 let 利於變更值
      let url = `${VITE_URL}/api/${VITE_PATH}/${this.type}s?page=${page}`

      // 如具備 category 類型條件，則 url 進行變更
      if (this.selectCategory !== "全部類別" || !this.selectCategory) {
        url = `${VITE_URL}/api/${VITE_PATH}/${this.type}s?page=${page}&category=${this.selectCategory}`
      }
      // console.log('getProducts 取得所有商品資料', url)

      axios.get(url)
        .then(res => {
          console.log('getProducts 取得所有商品資料', res)
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
        })
        .catch(err => {
          console.log('getProducts 失敗', err.response)
          Alert.fire({
            title: '資料錯誤，請稍後再試一次',
            icon: 'error'
          })
        })
    },

    // 取得商品類別
    getProductAll() {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}s/all`
      // console.log('getProductAll 取得全部商品資料', url)

      axios.get(url)
        .then(res => {
          // console.log('getProductAll 取得所有商品資料', res)
          const { products } = res.data
          this.productAll = products

          // Array.from 迭代轉陣列
          this.categories = Array.from(
            // new Set 集合不重複的值; map 抽取 category 值
            new Set(this.productAll.map(item => item.category))
          )
          this.categories.unshift('全部類別')
        })
        .catch(err => {
          console.log('getProductAll 失敗', err.response)
          Alert.fire({
            title: '資料錯誤，請稍後再試一次',
            icon: 'error'
          })
        })
    },

    // 取得單一商品資料
    getProductItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}/${id}`
      // console.log('getProductItem 取得單一商品資料', url)

      axios.get(url)
        .then(res => {
          // console.log('getProductItem 取得單一商品資料', res)
          const { product } = res.data
          this.product = product
        })
        .catch(err => {
          console.log('getProductItem 失敗', err.response)
          Alert.fire({
            title: '資料錯誤，請稍後再試一次',
            icon: 'error'
          })
        })
    },

    // 篩選類別
    getCategory(item) {
      this.selectCategory = item
      console.log(this.selectCategory)
      this.getProducts()
    },

    // 選擇排序
    getSort(item) {
      this.selectSort = item
      // console.log(this.selectSort)
    },

    // 搜尋產品
    // searchItem(item){
      
    // }
  },

  getters: {
    filterProducts: state => {
      // slice 回傳新陣列物件
      let productList = state.products.slice()

      if (state.selectCategory !== "全部類別") {
        productList.filter(item => item.category === state.selectCategory)
      }
      
      // 商品排序為初始，如不等於商品排序則進行新陣列排序
      if (state.selectCategory !== "商品排序") {
        if (state.selectSort === "價格：由高至低") {
          productList.sort((a, b) => b.price - a.price)
        } else if (state.selectSort === "價格：由低至高") {
          productList.sort((a, b) => a.price - b.price)
        }
      }

      return productList
    },
  }
})