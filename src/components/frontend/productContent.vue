<template>
  <div class="px-0 px-md-20">
    <div class="border-bottom">
      <div class="row py-8">
        <div class="col-md-4 mb-4 mb-md-0">
          <h3 class="text-primary fs-5 fs-md-6 text-center text-md-start">
            <i class="fi fi-rr-salt-shaker me-2"></i> <br class="d-md-none">
            商品內容
          </h3>
        </div>
        <div class="col-md-8">
          <p class="text-justify fw-300">{{product.content}}</p>
        </div>
      </div>
    </div>
    <div class="border-bottom">
      <div class="row py-8">
        <div class="col-md-4 mb-4 mb-md-0">
          <h3 class="text-primary fs-5 fs-md-6 text-center text-md-start">
            <i class="fi fi-rr-pie me-2"></i> <br class="d-md-none">
            商品介紹
          </h3>
        </div>
        <div class="col-md-8">
          <p class="text-justify fw-300">{{product.description}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="border-bottom">
      <div class="row py-8">
        <div class="col-md-4 mb-4 mb-md-0">
          <h3 class="text-primary fs-5 fs-md-6 text-center text-md-start">
            <i class="fi fi-rs-tree-deciduous me-2"></i> <br class="d-md-none">
            精選原料
          </h3>
        </div>
        <div class="col-md-8">
          <div class="text-justify">
            <div class="d-flex flex-column gap-3">
              <div>
                <h4 class="fs-4 mb-1 font-bold">創新口味搭配</h4>
                <p class="fs-4 text-gray-600 fw-300">塔派系列以台灣當地的新鮮水果、堅果等為基底，確保口感和風味的多樣性。這不僅讓顧客感受到原汁原味的美味，更連結了當地農產品，提升了食材的品質保證，使每一口都充滿新鮮感。</p>
              </div>
              <div>
                <h4 class="fs-4 mb-1 font-bold">口味多元創新</h4>
                <p class="fs-4 text-gray-600 fw-300">塔派系列不僅致力於甜美口味，更在口味創新上大膽嘗試，融入台灣風味元素。例如，鳳梨酥塔、芋頭塔等獨特口味，滿足了顧客對於多樣風味的追求，帶來一場層次豐富的味蕾饗宴。</p>
              </div>
              <div>
                <h4 class="fs-4 mb-1 font-bold">天然原料運用</h4>
                <p class="fs-4 text-gray-600 fw-300">我們精心挑選的澱粉質地經過巧妙處理，保有外層的酥脆，內部則展現出綿密口感。這項巧妙的澱粉運用，使得塔派在質感上更為出眾，讓顧客感受到繁複工藝背後的品質保證。</p>
              </div>
              <div>
                <h4 class="fs-4 mb-1 font-bold">風味層次豐富</h4>
                <p class="fs-4 text-gray-600 fw-300">塔派系列注重層次豐富的風味搭配，巧妙結合奶油、果醬、堅果等元素，使每一口都像是一場風味的音樂會，豐富的層次感令人難以忘懷。品味塔派，就是品味一場獨特風味的美好體驗，並以使用天然原料的承諾，為消費者提供最純粹的享受。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>