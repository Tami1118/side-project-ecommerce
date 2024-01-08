<script>
import { articleFields, localeSet } from "@/mixins/fields";
import ClassEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: {
    adminItem: Object,
    adminType: String,
    isNew: Boolean,
  },
  data() {
    return {
      tempItem: {
        content: "",
        contents: "",
      },
      create_at: "",
      today: "",
      editor: ClassEditor,
      editorConfig: {
        toolbar: ["heading","|","bold","italic","link","|","Undo","Redo",],
        placeholder: "請輸入文章",
      },
      articleFields,
      localeSet,
    };
  },
  mounted() {
    this.today = new Date().toISOString().split("T")[0];
  },
  watch: {
    adminItem() {
      this.tempItem = this.adminItem;
      this.create_at = new Date(this.tempItem.create_at * 1000).toISOString().split("T")[0];
    },
    create_at() {
      this.tempItem.create_at = Math.floor(new Date(this.create_at).getTime() / 1000);
    },
    // why: 因api無法取得 content，先利用 contents 替代，當 contents 變動，content 也會一起變動
    "tempItem.contents"(value) {
      this.tempItem.content = value;
    },
  },
  methods: {
    resetTemp() {
      this.tempItem = {};
    },
    createTag() {
      this.tempItem.tag = [];
      this.tempItem.tag.push("");
    },
  },
};
</script>

<template>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{isNew? "新增":"編輯"}}{{adminType}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <VForm class="d-flex flex-column" style="gap: 16px" v-slot="{ errors }">
          <div v-for="item in articleFields" :key="item.id" class="position-relative pb-4">
            <label :for="item.id" class="form-label">{{item.label}}</label>
            <span v-if="item.required" class="text-danger"> *</span>

            <VField v-if="item.as === 'input' && item.type === 'text'" :type="item.type" :id="item.id" :name="item.name" :class="{'is-invalid': errors[item.name]}" :rules="item.rules" v-model="tempItem[item.model]" :placeholder="item.placeholder" class="form-control" />
            <VField v-else-if="item.type === 'number'" :type="item.type" :id="item.id" :name="item.name" :class="{'is-invalid': errors[item.name]}" :rules="item.rules" v-model.number="tempItem[item.model]" :placeholder="item.placeholder" class="form-control" />
            <VField v-else-if="item.as === 'select'" :as="item.as" :id="item.id" :name="item.name" :class="{'is-invalid': errors[item.name]}" :rules="item.rules" v-model="tempItem[item.model]" :placeholder="item.placeholder" class="form-select">
              <option value="" selected>請選擇</option>
              <option v-for="option in item.options" :key="option" :value="option">{{option}}</option>
            </VField>
            <VField v-else-if="item.as === 'textarea'" :as="item.as" :id="item.id" :name="item.name" :class="{'is-invalid': errors[item.name]}" :rules="item.rules" v-model="tempItem[item.model]" :placeholder="item.placeholder" class="form-control" cols="30" rows="3" />

            <ErrorMessage :name="item.name" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div>

          <div>
            <label for="articleContent" class="form-label">文章內容</label>
            <span class="text-danger"> *</span>
            <ckeditor id="articleContent" :editor="editor" :config="editorConfig" v-model="tempItem.contents"></ckeditor>
          </div>

          <div>
            <label for="articleContent" class="form-label">文章簡介</label>
            <ckeditor id="articleContent" :editor="editor" :config="editorConfig" v-model="tempItem.description"></ckeditor>
          </div>

          <div>
            <label for="articleImageUrl" class="form-label">文章主圖</label>
            <div>
              <img :src="tempItem.imageUrl" class="w-100" :alt="tempItem.title">
              <input type="text" v-model="tempItem.imageUrl" id="articleImageUrl" class="form-control">
            </div>
          </div>

          <div>
            <label for="articleTag" class="form-label">標籤</label>
            <div class="row g-2">
              <template v-if="tempItem.tag?.length">
                <div v-for="(item, key) in tempItem.tag" :key="key" class="col-4">
                  <div class="input-group">
                    <input type="text" v-model="tempItem.tag[key]" class="form-control">
                    <button type="button" class="btn btn-outline-primary" @click="tempItem.tag.splice(key, 1)">X</button>
                  </div>
                </div>
                <div v-if="tempItem.tag[tempItem.tag?.length - 1]" class="col-4">
                  <button type="button" class="btn btn-primary w-100" @click="tempItem.tag.push('')">新增標籤</button>
                </div>
              </template>
              <template v-else>
                <button type="button" class="btn btn-primary col-4" @click="createTag">新增標籤</button>
              </template>
            </div>
          </div>

          <div>
            <label for="articleCreateAt" class="form-label">建立日期</label>
            <VField type="date" :min="today" id="articleCreateAt" name="建立日期" :class="{'is-invalid': errors['建立日期']}" rules="required" v-model="create_at" class="form-control" />
            <ErrorMessage name="建立日期" class="invalid-feedback position-absolute bottom-0 start-0" />
          </div>

          <div class="form-check">
            <input id="articleIsPublic" type="checkbox" v-model="tempItem.isPublic" class="form-check-input" :true-value="true" :false-value="false">
            <label for="articleIsPublic" class="form-check-label">已啟用</label>
          </div>
        </VForm>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" @click="resetTemp">清除</button>
        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button class="btn btn-primary" @click="$emit('update-item', updateItem)">{{isNew? "新增":"更新"}}</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ck-editor__editable {
  min-height: 100px;
}
</style>

<!-- 
"data": {
  "title": "新增第一篇文章", => input:text *
  "author": "alice", => input:text *
  "create_at": 1555459220, => input:date *
  "isPublic": false, => input:checkbox(true/false)
  
  // todo
  "content": "這是內容" => textarea * => CKEditor V
  "description": "文章內容", => textarea => CKEditor V
  "image": "test.testtest", => input:text => createImage
  "tag": [ => input:text => createTag
    "tag1"
  ],
}
 -->