const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
// import axios from 'axios'

export default defineStore('order', {
  state: () => {
    return {
      type: 'order',
      order: {},
      orders: [],
    }
  },

  actions: {
    // 新增訂單(表單)
    createOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}`
      console.log('createOrder', url)

      // axios.post()
    },

    // 取得單一訂單資訊
    getOrder(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}/${id}`
      console.log('gerOrder', url)

      // axios.get()
    },

    // 取得所有訂單資訊
    getOrders() {
      const url = `${VITE_URL}/api/${VITE_PATH}/${this.type}s`
      console.log('gerOrders', url)

      // axios.get()
    },

    // 訂單付款
    payOrder(id){
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`
      console.log('payOrder 訂單付款',url)
      // axios.post()
    }

 
  }
})