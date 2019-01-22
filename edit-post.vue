<template>
  <div>
    <b>Создать статью</b><br />
    <el-button-group class="uk-margin">
<el-button type="primary"  size="small" @click="postPost(1)"> Опубликовать </el-button>
  <el-button type="primary"  size="small" @click="postPost(0)" > Сохранить </el-button>
</el-button-group>
  <form class="uk-form-horizontal"> <div class="uk-margin">
<div class="uk-grid">
  <div class="uk-width-1-2">

    <div class="uk-margin">

       <el-input v-model="post.title" placeholder="Название"></el-input>
     </div>
     <div class="uk-margin">
         <el-input v-model="post.description" placeholder="Описание"></el-input>
        </div>


         <el-input v-model="post.image" type="hidden" placeholder="обложка"></el-input>
  </div>
  <div class="uk-width-1-2">
    <div  class="prev-post">
      <img v-if="post.image" class="uk-margin-bottom " width="280" :src="this.$store.state.apiUrl+post.image"  alt=""><br />
    </div>
    <a class="uk-link " @click="toggleShow" > <i uk-tooltip="Загрузить обложку" class="material-icons">
  backup
  </i> </a>
  <a class="uk-link " @click="getImages('slider')"><i uk-tooltip="Выбрать обложку" class="material-icons">
folder_open
</i> </a>
<a class="uk-link " @click="post.image=''"><i uk-tooltip="Убрать обложку" class="material-icons">
remove_circle
</i> </a>
<my-upload

field="image"
    langType="ru"
@crop-upload-success="cropUploadSuccess"
    v-model="slide"
    :noCircle=true
    :width="postResize2.width"
    :height="postResize2.height"
    ki="0"
    :url="this.$store.state.apiUrl+'api/v1/posts/preview-upload?dir=slider'"
    :headers="{ Authorization: 'Bearer '+this.$store.state.token }"
    img-format="jpg"
    ></my-upload>

  </div>
</div>
  </div>


      <div id="img-box" v-if="imgBox==true">
        <div class="dirs">
          <i class="material-icons close" @click="imgBox=false,imgBoxFile=null">
  close
  </i>
<span>{{dir}}</span>
        </div>
<div>
  <div v-for="item in imgBoxFile" :key="item" class="uk-inline-clip uk-transition-toggle uk-light" tabindex="0">
       <img class="preview" :src="$store.state.apiUrl+item" style="padding: 5px;" height="100">
       <div class="uk-position-center imgBoxMenu">
         <span style="margin: 5px;" uk-tooltip="Удалить"  @click="delImages(item)"><i class="material-icons uk-transition-fade">
delete_sweep
</i> </span>
   <span v-if="dir=='preview'" style="margin: 5px;" uk-tooltip="Обложка"  @click="post.image=item">
<i class="material-icons uk-transition-fade">
insert_photo
</i></span>
    </div>
   </div>

</div>

      </div>
      <quill-editor v-model="post.body"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
                <div id="toolbar" slot="toolbar">
                  <!-- Add a bold button -->

             <!-- Add font size dropdown -->
             <select class="ql-header">
               <option value="1"></option>
               <option selected></option>
               <option value="2"></option>
               <option value="3"></option>
               <option value="4"></option>
               <option value="5"></option>
             </select>
             <button class="ql-bold">Bold</button>
             <button class="ql-italic">Italic</button>
             <button class="ql-underline">underline</button>
             <button class="ql-strike">strike</button>
             <select class="ql-font">
               <option selected="selected"></option>
               <option value="serif"></option>
               <option value="monospace"></option>
             </select>
             <!-- Add subscript and superscript buttons -->
             <button class="ql-script" value="sub"></button>
             <button class="ql-script" value="super"></button>
             <select class="ql-align">
             </select>
             <button class="ql-link">link</button>
             <button class="ql-image"></button>
             <button type="button" @click="getImages('img')"><i class="material-icons" style="font-size: 19px;">folder_open</i></button>
             <button class="ql-video">strike</button>
             <button class="ql-list" value="ordered">list</button>
             <button class="ql-list" value="bullet">list</button>
             <button class="ql-color" ></button>
             <button class="ql-background" ></button>
             <button class="ql-clean" ></button>
             <!-- You can also add your own -->

                </div>
  </quill-editor>

  </form>
<!---->


  </div>

</template>

<script>

import {httpf} from '~/plugins/micro.js'
import UIkit from 'uikit'
import myUpload from 'vue-image-crop-upload';

export default {
  components: {
  myUpload
  },

  async asyncData({ store ,params }) {
httpf.defaults.headers.common['Authorization'] = 'Bearer '+store.state.token;
   const { data } = await httpf.get(`categories`)
   console.log(data)
   return {
      postResize2:{width:800,height:340},
      slide: false,
     dir: null,
     imgBox: false,
     imgBoxFile:null,
     post: {
       'title':'',
       'description':'',
       'body':'',
       'image':'',
       'category_id':'',
       'created_at':'',
       'expired_at':''

     },
     editorOption: {
              modules: {
                   imageUpload: {
                     url: store.state.apiUrl+'api/v1/file/upload', // server url. If the url is empty then the base64 returns
                     method: 'POST', // change query method, default 'POST'
                     name: 'image', // custom form name
                     withCredentials: false, // withCredentials
                     headers: {Authorization: "Bearer "+store.state.token }, // add custom headers, example { token: 'your-token'}
                     callbackOK: (serverResponse, next) => {
                    next(store.state.apiUrl+serverResponse);
                },
                // personalize failed callback
                callbackKO: serverError => {

                    alert(serverError);
                }
                   },
                toolbar: '#toolbar',
                history: {
                  delay: 1000,
                  maxStack: 50,
                  userOnly: false
                },
                imageDrop: true,
                imageResize: {
                  displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                  },
                  modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                }
              }
          }
          }

   },

    methods: {
      toggleShow() {
  this.slide = !this.slide;
                },
      async postPost(val) {
httpf.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.token;

      try {
        if(val==1){
          //для публикации
          const { data1 } = await httpf.post('posts', {
              'title':this.post.title,
              'description':this.post.description,
              'body':this.post.body,
              'public':1,
                'category_id':3,
              'image':this.post.image
      })
    }else{
        const { data1 } = await httpf.post('posts', {
      'title':this.post.title,
      'description':this.post.description,
      'body':this.post.body,
        'category_id':3,
      'image':this.post.image
      })
    }


      } catch (e) {
        this.formError = e.response
      }finally {
        if(this.formError==null){
        UIkit.notification({
        message:   this.response,
        status: 'primary',
        pos: 'top-right',
        timeout: 5000
    });
        //  this.$router.push('/')
        }
      }
    },

    onEditorBlur(quill) {
     console.log('editor blur!', quill)
   },
   onEditorFocus(quill) {
     console.log('editor focus!', quill)
   },
   onEditorReady(quill) {
     console.log('editor ready!', quill)
   },
   onEditorChange({ quill, html, text }) {
     console.log('editor change!', quill, html, text)
     this.content = html
   },

  async getImages(dir){
  if(this.imgBox==true) {
    this.imgBox=false;
    return false;
  }
    this.dir=dir;
     httpf.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.token;
           try {
               const { data } = await httpf.get('file/get-images?dir='+dir)
this.imgBoxFile=data
this.imgBox=true
           } catch (e) {
             alert (e.response)
           }
   },
   async delImages(url){

      httpf.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.token;
            try {
                const { data } = await httpf.delete('file/'+url)
              this.getImages(this.dir)
            } catch (e) {
              alert (e.response)
            }
    },

            /**
             * upload success
             *
             * [param] jsonData  server api return data, already json encode
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
              this.post.image=jsonData
                console.log('-------- upload success --------');
                console.log(jsonData);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */



    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.prev-post{
    border: 1px solid #dcdfe6;
        width: 280px;
    height: 180px;
}
.ql-editor {
    min-height: 200px;
}
#img-box{
  max-height: 180px;
overflow-y: auto;
}
.preview{
  height: 100px;
}
.close{
  cursor: pointer;
}
.imgBoxMenu>span{
  color: #38659e;

}
.imgBoxMenu>span:hover{
  cursor: pointer;
    color: #327cda;
}
.close:hover{
  color: #717171;
}
.dirs{
  position: absolute;
z-index: 1;
background: white;
width: 100px;
}
</style>
