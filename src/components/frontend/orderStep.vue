<template>
  <div class="row">
    <div class="col">
      <div class="step active d-flex flex-column align-items-center p-4">
        <p>Step 1</p>
        <p>填寫資料</p>
      </div>
    </div>
    <div class="col">
      <div class="step d-flex flex-column align-items-center p-4">
        <p>Step 2</p>
        <p>確認付款</p>
      </div>
    </div>
    <div class="col">
      <div class="step d-flex flex-column align-items-center p-4">
        <p>Step 3</p>
        <p>完成訂單</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.step {
  border: 1px solid #64748b;
  color: #64748b;

  &.active{
    border: 1px solid #42625D;
    color: white;
    background: #42625D;
  }
}
</style>