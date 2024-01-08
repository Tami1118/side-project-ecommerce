<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>我是中文內容</p>
    <p>{{data}}</p>
    <button class="btn btn-primary">我是按鈕</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>

<script>
const {VITE_PATH} = import.meta.env

export default {
  data(){
    return {
      data: {}
    }
  },
  mounted(){
    this.$http.get(VITE_PATH)
    .then(res => {
      this.data = res.data.results[0];
    })
  }
}
</script>
