import { defineStore } from 'pinia'

export default defineStore('coupon', {
  state: () => {
    return {
      discountNews: [
        {
          category: '滿額',
          content: '全店滿額 500 享八折優惠'
        },
        {
          category: '優惠',
          content: '領取優惠券最高享九折優惠'
        },
      ]
    }
  }
})