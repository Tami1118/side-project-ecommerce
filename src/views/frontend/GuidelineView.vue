<template>
  <div class="container">
    <div class="d-flex flex-column gap-6">
      <div aria-label="Color System">
        <h2 class="border-bottom pb-1 mb-4">Color System</h2>
        <div class="d-flex flex-column gap-3">
          主要色
          <div class="row row-cols-3 row-cols-md-6 g-3">
            <div class="col">
              <div class="bg-primary rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-theme-primary rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-secondary rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-theme-secondary rounded-2 ratio ratio-1x1"></div>
            </div>
          </div>
          中性色
          <div class="row row-cols-3 row-cols-md-6 g-3">
            <div class="col">
              <div class="bg-black rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-900 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-800 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-700 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-600 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-500 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-400 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-300 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-200 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-100 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-gray-50 rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-white border rounded-2 ratio ratio-1x1"></div>
            </div>
          </div>
          語意輔助色
          <div class="row row-cols-3 row-cols-md-6 g-3">
            <div class="col">
              <div class="bg-danger rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-success rounded-2 ratio ratio-1x1"></div>
            </div>
            <div class="col">
              <div class="bg-info rounded-2 ratio ratio-1x1"></div>
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
          <div class="d-flex gap-3">
            <button type="button" class="btn btn-primary">Button</button>
            <button type="button" class="btn btn-primary active">Button</button>
            <button type="button" class="btn btn-primary" disabled>Button</button>
            <button type="button" class="btn btn-primary d-flex gap-2">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-primary d-flex gap-2 active">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-primary d-flex gap-2" disabled>Button<i class="fi fi-sr-woman-head"></i></button>
          </div>
          Secondary
          <div class="d-flex gap-3">
            <button type="button" class="btn btn-outline-primary">Button</button>
            <button type="button" class="btn btn-outline-primary active">Button</button>
            <button type="button" class="btn btn-outline-primary" disabled>Button</button>
            <button type="button" class="btn btn-outline-primary d-flex gap-2">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-outline-primary d-flex gap-2 active">Button<i class="fi fi-sr-woman-head"></i></button>
            <button type="button" class="btn btn-outline-primary d-flex gap-2" disabled>Button<i class="fi fi-sr-woman-head"></i></button>
          </div>
          Ghost
          <div class="d-flex gap-3">
            <a href="#" class="link-primary">Button</a>
            <a href="#" class="link-primary active">Button</a>
            <a href="#" class="link-primary" disabled>Button</a>
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
        <div class="">
          <div class="card">
            
          </div>
        </div>
      </div>

    </div>
  </div>
</template>