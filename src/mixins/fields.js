import * as Yup from 'yup';

// 待辦
// 電話號碼errormessage
// 日期必須為明天開始
// 時間必須間隔 30 分鐘

const localeSet = Yup.setLocale({
  string: {
    email: "請輸入正確${path}格式",
  },
  mixed: {
    required: "${path} 為必填欄位",
  },
  number: {
    typeError: "請輸入數字",
    positive: "請輸入正數",
    integer: "請輸入整數",
    required: "${path} 為必填欄位",
  },
});

const loginFields = [
  {
    as: 'input',
    type: 'email',
    id: 'useremail',
    name: 'E-mail',
    label: '電子信箱',
    placeholder: '請輸入電子信箱',
    rules: Yup.string().email().required().label("電子信箱"),
    model: 'username',
  },
  {
    as: 'input',
    type: 'password',
    id: 'password',
    name: '密碼',
    label: '密碼',
    placeholder: '請輸入密碼',
    rules: Yup.string().required().label("密碼"),
    model: 'password',
  },
]

// const productFields = {
//   input: [
//     {
//       as: 'input',
//       type: 'text',
//       id: 'productTitle',
//       name: '產品名稱',
//       label: '產品名稱',
//       placeholder: '請輸入產品名稱',
//       rules: Yup.string().required(),
//       model: 'title',
//     },
//     {
//       as: 'input',
//       type: 'number',
//       id: 'productOriginPrice',
//       name: '原價',
//       label: '原價',
//       placeholder: '原價',
//       rules: Yup.number().required(),
//       model: 'origin_price',
//     },

//     {
//       as: 'input',
//       type: 'number',
//       id: 'productPrice',
//       name: '特價',
//       label: '特價',
//       placeholder: '特價',
//       rules: Yup.number().required(),
//       model: 'price',
//     },
//   ],
//   select: [
//     {
//       as: 'select',
//       id: 'productCategory',
//       name: '類型',
//       label: '類型',
//       rules: Yup.string().required(),
//       model: 'category',
//     },
//     {
//       as: 'select',
//       id: 'productUnit',
//       name: '單位',
//       label: '單位',
//       rules: Yup.string().required(),
//       model: 'unit',
//     },
//   ],
//   textarea: [
//     {
//       as: 'textarea',
//       id: 'productDescription',
//       name: '產品介紹',
//       label: '產品介紹',
//       rules: Yup.string(),
//       model: 'description'
//     },
//     {
//       as: 'textarea',
//       id: 'productContent',
//       name: '產品內容',
//       label: '產品內容',
//       rules: Yup.string(),
//       model: 'content'
//     }
//   ]
// }

const productFields = [
  {
    as: 'input',
    type: 'text',
    id: 'productTitle',
    name: '產品名稱',
    label: '產品名稱',
    placeholder: '請輸入產品名稱',
    rules: Yup.string().required().label("產品名稱"),
    required: true,
    model: 'title',
  },
  {
    as: 'input',
    type: 'number',
    id: 'productOriginPrice',
    name: '原價',
    label: '原價',
    placeholder: '請輸入原價',
    rules: Yup.number().required().min(0).label("原價").test(
      'is-positive',
      '特價必須為0或0以上之正數',
      value => value >= 0
    ),
    required: true,
    model: 'origin_price',
  },
  {
    as: 'input',
    type: 'number',
    id: 'productPrice',
    name: '特價',
    label: '特價',
    placeholder: '請輸入特價',
    rules: Yup.number().required().min(0).label("特價").test(
      'is-positive',
      '特價必須為0或0以上之正數',
      value => value >= 0
    ),
    required: true,
    model: 'price',
  },
  {
    as: 'select',
    id: 'productCategory',
    name: '類型',
    label: '類型',
    rules: Yup.string().required().label("類型"),
    required: true,
    model: 'category',
    options: ["生乳捲", "美式塔派", "生日蛋糕", "甜甜圈"]
  },
  {
    as: 'select',
    id: 'productUnit',
    name: '單位',
    label: '單位',
    rules: Yup.string().required().label("單位"),
    required: true,
    model: 'unit',
    options: ["個"]
  },
  {
    as: 'textarea',
    id: 'productDescription',
    name: '產品介紹',
    label: '產品介紹',
    placeholder: '請輸入產品介紹',
    rules: Yup.string(),
    model: 'description'
  },
  {
    as: 'textarea',
    id: 'productContent',
    name: '產品內容',
    label: '產品內容',
    placeholder: '請輸入產品內容',
    rules: Yup.string(),
    model: 'content'
  }
]

const couponFields = [
  {
    as: 'input',
    type: 'text',
    id: 'couponTitle',
    name: '優惠券名稱',
    label: '優惠券名稱',
    placeholder: '請輸入優惠券名稱',
    rules: Yup.string().required().label("優惠券名稱"),
    required: true,
    model: 'title',
  },
  {
    as: 'input',
    type: 'text',
    id: 'couponCode',
    name: 'Code',
    label: 'Code',
    placeholder: '請輸入Code名稱',
    rules: Yup.string().required().label("Code"),
    required: true,
    model: 'code',
  },
  {
    as: 'input',
    type: 'number',
    id: 'couponPercent',
    name: '優惠券折數',
    label: '優惠券折數',
    placeholder: '請輸入優惠券折數',
    rules: Yup.number().required().max(100).min(0).label("優惠券折數"),
    required: true,
    model: 'percent',
  },
]

const articleFields = [
  {
    as: 'input',
    type: 'text',
    id: 'articleTitle',
    name: '文章標題',
    label: '文章標題',
    placeholder: '請輸入文章標題',
    rules: Yup.string().required().label("文章標題"),
    required: true,
    model: 'title',
  },
  {
    as: 'input',
    type: 'text',
    id: 'articleAuthor',
    name: '作者',
    label: '作者',
    placeholder: '請輸入作者名稱',
    rules: Yup.string().required().label("作者"),
    required: true,
    model: 'author',
  },
  // {
  //   as: 'textarea',
  //   id: 'articleContent',
  //   name: '文章內容',
  //   label: '文章內容',
  //   placeholder: '請輸入文章內容',
  //   rules: Yup.string().required().label("文章內容"),
  //   required: true,
  //   model: 'contents',
  // },
  // {
  //   as: 'textarea',
  //   id: 'articleDescription',
  //   name: '文章簡介',
  //   label: '文章簡介',
  //   placeholder: '請輸入文章簡介',
  //   rules: Yup.string(),
  //   model: 'description',
  // },
]

// const orderFields = [
//   {
//     as: 'input',
//     type: 'text',
//     id: 'orderAddress',
//     name: '地址',
//     label: '地址',
//     rules: Yup.string().required().label("文章標題"),
//     model: 'address',
//   },
//   {
//     as: 'input',
//     type: 'email',
//     id: 'orderEmail',
//     name: '電子信箱',
//     label: '電子信箱',
//     rules: Yup.string().required().label("文章標題"),
//     model: 'address',
//   },
// ]

const userFields = [
  {
    as: 'input',
    type: 'text',
    id: 'orderName',
    name: '訂購人姓名',
    label: '訂購人姓名',
    placeholder: '請輸入真實姓名',
    rules: Yup.string().required().label("訂購人姓名"),
    required: true,
    model: 'name',
  },
  {
    as: 'input',
    type: 'email',
    id: 'orderEmail',
    name: '電子信箱',
    label: '電子信箱',
    placeholder: '請輸入電子信箱',
    rules: Yup.string().email().required().label("電子信箱"),
    required: true,
    model: 'email',
  },
  {
    as: 'input',
    type: 'tel',
    id: 'orderTel',
    name: '聯絡電話',
    label: '聯絡電話',
    placeholder: '請輸入手機號碼',
    rules: Yup.string().required().min(10).label("聯絡電話"),
    required: true,
    model: 'tel',
  },
  {
    as: 'select',
    id: 'orderStore',
    name: '取貨分店',
    label: '取貨分店',
    rules: Yup.string().required().label("取貨分店"),
    required: true,
    model: 'address',
    options: ["板橋總店", "中山店", "台北店", "萬華店", "中和店", "新莊店"]
  },
  {
    as: 'input',
    type: 'date',
    id: 'orderDate',
    name: '取貨日期',
    label: '取貨日期',
    rules: Yup.string().required().label("取貨日期"),
    required: true,
    model: 'date',
  },
  {
    as: 'input',
    type: 'time',
    id: 'orderTime',
    name: '取貨時間',
    label: '取貨時間',
    rules: Yup.string().required().label("取貨時間"),
    required: true,
    model: 'time',
  },
  {
    as: 'textarea',
    id: 'orderMessage',
    name: '留言',
    label: '留言',
    placeholder: '請輸入留言內容',
    rules: Yup.string().label("留言"),
  },
]


export {
  localeSet,
  loginFields,
  productFields,
  couponFields,
  articleFields,
  // orderFields,
  userFields,
}