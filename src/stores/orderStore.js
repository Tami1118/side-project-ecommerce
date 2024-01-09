const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import axios from 'axios'
// import { Toast, Alert } from '@/mixins/swal'
import { Alert } from '@/mixins/swal'

export default defineStore('order', {
  state: () => {
    return {
      type: 'order',
      order: {},
      orders: [],
    }
  },

  actions: {
    // 取得所有訂單資訊
    getOrders() {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}s`
      // console.log('gerOrders 取得所有訂單', url)

      axios.get(url)
        .then(res => {
          console.log('gerOrders 成功取得所有訂單', res)
          const {orders} = res.data
          this.orders = orders
        })
        .catch(err => {
          console.log('gerOrders 失敗', err.response)
          Alert.fire({
            title: '資料有誤，請稍後再試一次',
            icon: 'error'
          })
        })
    },

    // 取得單一訂單資訊
    getOrder(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}/${id}`
      // console.log('gerOrder 取得單一訂單資訊', url)

      axios.get(url)
        .then(res => {
          console.log('getOrder 取得單一訂單資訊', res)
          const { order } = res.data
          this.order = order
          this.user = order.user
        })
        .catch(err => {
          console.log('getOrder 失敗', err.response)
          Alert.fire({
            title: '資料有誤，請稍後再試一次',
            icon: 'error'
          })
        })
    },
  }
})