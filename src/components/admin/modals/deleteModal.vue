<script>
export default {
  props: {
    adminType: { type: String, required: true },
    tempItem: { type: Object, required: true },
    deleteItem: { type: Function },
  },
};
</script>

<template>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">刪除{{adminType}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        刪除後的{{adminType}}不得再復原，確定要刪除 <span class="text-primary">{{tempItem.title}}</span> {{adminType}}？
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button class="btn btn-primary" @click="deleteItem(tempItem.id)">確定刪除</button>
      </div>
    </div>
  </div>
</template>
