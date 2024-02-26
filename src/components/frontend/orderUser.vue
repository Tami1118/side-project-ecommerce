<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import { Toast, Alert } from "@/mixins/swal";

export default {
  props: ["order", "user"],
  methods: {
    payOrder() {
      const id = this.$route.params.id;
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`;
      this.$http.post(url)
        .then((res) => {
          console.log("payOrder 成功訂單付款", res);
          this.$router.push(`/order-complete/${id}`);
          Toast.fire({
            title: '付款成功',
            icon: 'success'
          })
        })
        .catch((err) => {
          console.log("payOrder 失敗", err.response);
          Alert.fire({
            title: "資料有誤，請稍後再試一次",
            icon: "error",
          });
        });
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <table class="table-gray-100 align-middle w-100">
      <tbody>
        <tr>
          <td class="py-2">付款狀態</td>
          <td>
            <p v-if="order.is_paid" class="text-success fw-600">已付款</p>
            <p v-else class="text-danger fw-600">尚須付款 NT${{order.total}}</p>
          </td>
        </tr>
        <tr>
          <td class="py-2" width="35%">訂購人姓名</td>
          <td>{{user.name}}</td>
        </tr>
        <tr>
          <td class="py-2">電子信箱</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td class="py-2">聯絡電話</td>
          <td>{{user.tel}}</td>
        </tr>
        <tr>
          <td class="py-2">取貨分店</td>
          <td>{{user.address}}</td>
        </tr>
        <tr>
          <td class="py-2">取貨日期及時間</td>
          <td>{{user.date}} {{user.time}}</td>
        </tr>
        <tr>
          <td class="py-2">留言</td>
          <td>
            {{order.message}}
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="$route.name === 'order-pay'" type="button" @click.prevent="payOrder" class="btn btn-primary py-2">信用卡付款</button>
  </div>
</template>
