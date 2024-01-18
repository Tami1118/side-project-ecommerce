<template>
  <div class="container">
    <div class="d-flex flex-column gap-6">
      <div aria-label="Color System">
        <h2 class="border-bottom pb-1 mb-4">Color System</h2>
        <div class="d-flex flex-column gap-3">
          主要色
          <div class="row row-cols-3 row-cols-md-6 g-3">
            <div class="col">
              <div class="bg-primary ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-theme-primary ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-secondary ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-theme-secondary ratio ratio-1x1"></div>
            </div>
          </div>
          中性色
          <div class="row row-cols-3 row-cols-md-6 g-3">
            <div class="col">
              <div class="bg-black ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-900 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-800 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-700 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-600 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-500 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-400 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-300 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-200 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-100 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-50 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-white border ratio ratio-1x1"></div>
            </div>
          </div>
          語意輔助色
          <div class="row row-cols-3 row-cols-md-6 g-3">
            <div class="col">
              <div class="bg-danger ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-success ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-info ratio ratio-1x1"></div>
            </div>
          </div>
        </div>
      </div>

      <div aria-label="Icon">
        <h2 class="border-bottom pb-2 mb-4">Icon</h2>
        <div class="d-flex flex-wrap gap-3">
          <i class="fi fi-br-search"></i>
          <i class="fi fi-ss-shopping-bag"></i>
          <i class="fi fi-sr-menu-burger"></i>
          <i class="fi fi-sr-user"></i>
          <i class="fi fi-bs-angle-right"></i>
          <i class="fi fi-bs-angle-left"></i>
          <i class="fi fi-bs-angle-up"></i>
          <i class="fi fi-bs-angle-down"></i>
          <i class="fi fi-sr-angle-circle-right"></i>
          <i class="fi fi-sr-angle-circle-left"></i>
          <i class="fi fi-brands-line"></i>
          <i class="fi fi-brands-instagram"></i>
          <i class="fi fi-brands-facebook"></i>
          <i class="fi fi-brands-youtube"></i>
        </div>
      </div>

      <div aria-label="Logo">
        <h2 class="border-bottom pb-2 mb-4">Logo</h2>
        <div></div>
      </div>

      <div aria-label="Button">
        <h2 class="border-bottom pb-2 mb-4">Button</h2>
        <div class="d-flex flex-column gap-3">
          Primary
          <div class="d-flex flex-wrap gap-3">
            <button type="button" class="btn btn-primary">Button</button>
            <button type="button" class="btn btn-primary active">Button</button>
            <button type="button" class="btn btn-primary" disabled>Button</button>
            <button type="button" class="btn btn-primary d-flex gap-2">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-primary d-flex gap-2 active">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-primary d-flex gap-2" disabled>Button<i class="fi fi-sr-woman-head"></i></button>
          </div>

          Secondary
          <div class="d-flex flex-wrap gap-3">
            <button type="button" class="btn btn-secondary">Button</button>
            <button type="button" class="btn btn-secondary active">Button</button>
            <button type="button" class="btn btn-secondary" disabled>Button</button>
            <button type="button" class="btn btn-secondary d-flex gap-2">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-secondary d-flex gap-2 active">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-secondary d-flex gap-2" disabled>Button<i class="fi fi-sr-woman-head"></i></button>
          </div>

          Primary-outline
          <div class="d-flex flex-wrap gap-3">
            <button type="button" class="btn btn-outline-primary">Button</button>
            <button type="button" class="btn btn-outline-primary active">Button</button>
            <button type="button" class="btn btn-outline-primary" disabled>Button</button>
            <button type="button" class="btn btn-outline-primary d-flex gap-2">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-outline-primary d-flex gap-2 active">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-outline-primary d-flex gap-2" disabled>Button<i class="fi fi-sr-woman-head"></i></button>
          </div>

          Secondary-outline
          <div class="d-flex flex-wrap gap-3">
            <button type="button" class="btn btn-outline-secondary">Button</button>
            <button type="button" class="btn btn-outline-secondary active">Button</button>
            <button type="button" class="btn btn-outline-secondary" disabled>Button</button>
            <button type="button" class="btn btn-outline-secondary d-flex gap-2">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-outline-secondary d-flex gap-2 active">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-outline-secondary d-flex gap-2" disabled>Button<i class="fi fi-sr-woman-head"></i></button>
          </div>

          Ghost
          <div class="d-flex flex-wrap gap-3">
            <a href="#" class="link-primary">Button</a>
            <a href="#" class="link-primary active">Button</a>
            <button class="link-primary border-none bg-transparent" disabled>Button</button>
          </div>
        </div>
      </div>

      <div aria-label="Input Feild">
        <h2 class="border-bottom pb-2 mb-4">Input Feild</h2>
        <div class="d-flex flex-column gap-3">
          <input type="text" class="form-control" placeholder="請輸入文字">
          <input type="text" class="form-control" placeholder="請輸入文字">
        </div>
      </div>

      <div aria-label="Dropdown">
        <h2 class="border-bottom pb-2 mb-4">Dropdown</h2>
        <div></div>
      </div>

      <div aria-label="Slider">
        <h2 class="border-bottom pb-2 mb-4">Slider</h2>
        <div></div>
      </div>

      <div aria-label="Card">
        <h2 class="border-bottom pb-2 mb-4">Card</h2>
        <div class="bg-gray-50 p-5">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="col">
              <router-link to="/" class="product-card card border-0 h-100">
                <div class="position-relative overflow-hidden">
                  <div style="height: 296px" class="img-gradient overflow-hidden">
                    <img class="h-100 w-100 object-fit-cover object-position-center" src="https://images.unsplash.com/photo-1560180474-e8563fd75bab?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="...">
                  </div>
                  <button class="btn-add position-absolute start-0 w-100 btn btn-primary py-2 z-3">
                    <i class="fi fi-ss-shopping-bag-add me-2"></i>加入購物車
                  </button>
                </div>
                <div class="p-4">
                  <h3 class="fs-5 text-center mb-2">橘香美式塔派</h3>
                  <div class="d-flex flex-column align-items-center">
                    <div class="fs-4 fw-600 text-secondary">NT$ 100</div>
                    <del class="fs-3h fw-400 text-gray-500">NT$ 120</del>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div aria-label="Detail Card">
        <h2 class="border-bottom pb-2 mb-4">Detail Card</h2>
        <div class="">

        </div>
      </div>

    </div>
  </div>
</template>
