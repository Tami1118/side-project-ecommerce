<template>
  <div>
    <button @click="openModal" class="btn btn-primary">開啟模板</button>
    <!-- Modal -->
    <div ref="testModal" class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="productModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <VForm ref="testForm"> <!-- wrap your form with VForm -->
              <VField type="text" v-model="email" name="email" rules="email|required" class="form-control" />
                <!-- <input type="text" v-model="email" rules="email|required"> -->
              <!-- </VField> -->
            </VForm>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="resetForm()">清除欄位</button>
            <button type="button" class="btn btn-primary" @click="closeModal">關閉模板</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      email: '',
      testModal: null,
    }
  },
  mounted() {
    this.testModal = new Modal(this.$refs.testModal);
  },
  methods: {
    openModal() {
      this.testModal.show()
    },
    closeModal() {
      this.testModal.hide();
      this.$refs.testForm.reset(); // reset Vuelidate validation state
      this.resetForm(); // clear form fields
    },
    resetForm() {
      this.email = ''
    }
  }
}
</script>
