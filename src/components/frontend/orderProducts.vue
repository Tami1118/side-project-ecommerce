<script>
export default {
  props: ["order", "originTotal"],
};
</script>

<template>
  <div class="d-flex flex-column">
    <table class="table-gray-100">
      <thead>
        <tr class="bg-gray-200">
          <th class="text-center py-1" colspan="2">商品</th>
          <th class="text-end">數量</th>
          <th class="text-end">小計</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-bottom" v-for="item in order.products" :key="item.id">
          <td class="p-3">
            <div style="height: 72px">
              <img class="w-100 h-100 object-fit-cover" :src="item.product.imageUrl" :alt="item.product.title">
            </div>
          </td>
          <td>
            {{item.product.title}} <br>
            <p class="fs-3">NT$ {{item.product.price}}/{{item.product.unit}}</p>
          </td>
          <td class="text-end">x {{item.product.num}}</td>
          <td class="text-end">{{item.total}}</td>
        </tr>
      </tbody>
      <tfoot class="border-bottom">
        <tr v-if="originTotal !== order.total">
          <td class="text-end text-gray-500 py-1" colspan="3">商品金額</td>
          <td class="text-end text-gray-500" colspan="2">{{originTotal}}</td>
        </tr>
        <tr v-if="originTotal !== order.total">
          <td class="text-end text-gray-500 py-1" colspan="3">優惠折扣</td>
          <td class="text-end text-gray-500" colspan="2">{{order.total - originTotal}}</td>
        </tr>
        <tr class="border-top bg-gray-200">
          <td class="text-end text-danger fw-500 py-1" colspan="3">訂單金額</td>
          <td class="text-end text-danger fw-500" colspan="2">NT$ {{order.total}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

