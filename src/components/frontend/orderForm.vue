<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      storeList: ["板橋總店", "中山店", "台北店", "萬華店", "中和店", "新莊店"],
      user: {
        address: '',
        name: 'Tami',
        email: 'tami1234@gmail.com',
        tel: '0987654321'
      },
      message: "",
      orderId: "",
    };
  },
  methods: {
    // 新增訂單
    createOrder(){
      const url = `${VITE_URL}/api/${VITE_PATH}/order`
      // console.log('createOrder 新增訂單', url)
      const data = {
        user: this.user,
        message: this.message
      }
      
      this.$http.post(url, {data})
        .then(res => {
          console.log(res)
          this.orderId = res.data.orderId
          this.$router.push(`/order-pay/${this.orderId}`)
        })
    }
  }
};
</script>

<template>
  <form action="">
    <div class="d-flex flex-column gap-4">
      <div>
        <label class="form-label" for="orderName">姓名</label>
        <input class="form-control" id="orderName" v-model="user.name" type="text" placeholder="請輸入真實姓名">
      </div>
      <div>
        <label class="form-label" for="orderEmail">E-mail</label>
        <input class="form-control" id="orderEmail" v-model="user.email" type="email" placeholder="請輸入電子信箱">
      </div>
      <div>
        <label class="form-label" for="orderTel">聯絡電話</label>
        <input class="form-control" id="orderTel" v-model="user.tel" type="tel" placeholder="請輸入手機號碼">
      </div>
      <div>
        <label class="form-label" for="orderAddress">取貨分店</label>
        <select class="form-select" name="orderAddress" id="orderAddress" v-model="user.address">
          <option value="" selected>請選擇</option>
          <option :value="item" v-for="(item, key) in storeList" :key="key">{{item}}</option>
        </select>
      </div>
      <div>
        <label for="getProductTime" class="form-label">提貨時間</label>
        <div class="row">
          <div class="col-6"><input type="date" class="form-control" id="getProductTime" v-model="user.date"></div>
          <div class="col-6"><input type="time" class="form-control" id="getProductTime" v-model="user.time"></div>
        </div>
      </div>
      <div>
        <label class="form-label" for="orderMessage">留言</label>
        <textarea class="form-control" name="orderMessage" id="orderMessage" v-model="message" cols="5" rows="5" placeholder="留言"></textarea>
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click.prevent="createOrder">送出訂單</button>
  </form>
</template>