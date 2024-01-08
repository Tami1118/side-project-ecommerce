import { defineStore } from 'pinia'
const { VITE_URL, VITE_PATH } = import.meta.env;
import axios from 'axios'
import { Toast, Alert } from '@/mixins/swal'

export default defineStore('cart', {
  state: () => {
    return {
      type: 'cart',
      carts: [],
      code: '',
      cartNum: 0,
      total: 0,
      final_total: 0,
    }
  },

  actions: {
    // 新增購物車
    addCart(item, qty = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}`
      // console.log('addCart 新增購物車', url)
      const data = {
        data: {
          product_id: item.id,
          qty: qty
        }
      }
      axios.post(url, data)
        .then(res => {
          console.log('addCart 成功新增購物車', res)
          this.getCart()
          Toast.fire({
            title: res.data.message,
            icon: 'success',
          })
        })
        .catch(err => {
          console.log('addCart 失敗', err.response)
          Alert.fire({
            title: '資料錯誤，請稍後再重新再試一次',
            icon: 'error'
          })
        })
    },

    // 取得購物車資訊
    getCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}`
      // console.log('getCart 取得購物車資訊', url)

      axios.get(url)
        .then(res => {
          console.log('getCart 成功取得購物車資訊', res)
          const { carts, total, final_total } = res.data.data
          this.carts = carts
          this.total = total
          this.final_total = final_total
          this.cartNum = this.carts.reduce((a, b) => a + b.qty, 0)
        })
        .catch(err => {
          console.log('getCart 失敗', err.response)
          Alert.fire({
            title: '資料錯誤，請稍後再重新再試一次',
            icon: 'error'
          })
        })
    },

    // 編輯購物車商品數量
    updateItem(item) {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}/${item.id}`
      // console.log('updateItem 編輯購物車', url)

      item.isDisabled = true // 操作 disabled
      const data = {
        data: {
          product_id: item.product.id,
          qty: item.qty
        }
      }
      axios.put(url, data)
        .then(res => {
          console.log('updateItem 更新成功', res)
          item.isDisabled = false
          this.getCart()
          Toast.fire({
            title: '數量更新成功',
            icon: 'success'
          })
        })
        .catch(err => {
          console.log('updateItem 失敗', err)
          Alert.fire({
            title: '數量更新失敗，請稍後再重新操作一次',
            icon: 'error'
          })
        })
    },

    // 刪除單一購物車商品
    deleteItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}/${id}`
      // console.log('deleteItem 刪除單一商品', url)

      axios.delete(url)
        .then(res => {
          console.log('deleteItem 成功刪除單一商品', res)
          this.getCart()
          Toast.fire({
            title: '成功刪除商品',
            icon: 'success'
          })
        })
        .catch(err => {
          console.log('deleteItem 失敗', err.response)
          Alert.fire({
            title: '請稍後再重新刪除商品',
            icon: 'error'
          })
        })
    },

    // 刪除購物車全部商品
    deleteAllCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}s`
      // console.log('deleteAllCart 刪除全部商品', url)

      axios.delete(url)
        .then(res => {
          console.log('deleteAll 成功刪除全部商品', res)
          this.getCart()
          Toast.fire({
            title: '成功刪除購物車',
            icon: 'success'
          })
        })
        .catch(err => {
          console.log('deleteAll 失敗', err.response.data)
          Alert.fire({
            title: '請稍後再重新刪除所有購物車',
            icon: 'error'
          })
        })
    },

    // 使用優惠券
    useCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/coupon`
      console.log('useCoupon 這是優惠券按鈕', url)

      axios.post(url, {
        "data": {
          "code": '123'
        }
      })
        .then(res => {
          console.log(res)
          this.getCart()
        })
    }
  },

  getter: {
    cartNum() {
      return this.cartNum
    }
  }
})
