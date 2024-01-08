import Modal from 'bootstrap/js/dist/modal'

export default {
  data(){
    return {
      modal: {},
    }
  },
  mounted(){
    this.modal = new Modal(this.$refs.targetModal)
  },
  methods: {
    openModal(){
      this.modal.show()
    },
    hideModal(){
      this.modal.reset()
      this.modal.hide()
    }
  }
}