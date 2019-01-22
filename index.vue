
<template>
  <div class="">
        <b>Слайдер</b><br />
     <nuxt-link  to="/post/slider/edit-post"><el-button type="primary"  size="small" > Cоздать </el-button>
  </nuxt-link>
    <el-button-group class="uk-margin">
      <el-button v-if="this.$store.state.role=='admin'||this.$store.state.role=='manager'" type="primary"  size="small" @click="postPublic(multipleSelection,1)"  > Опубликовать </el-button>
      <el-button v-else type="primary"  size="small" @click="postPublic(multipleSelection,2)"  > Опубликовать </el-button>

<el-button type="primary"  size="small" @click="postPublic(multipleSelection,0)"> Снять </el-button>
<el-button type="primary"  size="small" icon="el-icon-delete" @click="delPublic(multipleSelection)" uk-tooltip="Удалить" >  </el-button>
</el-button-group>
    <el-table
    ref="multipleTable"

      :data="posts"


      @selection-change="handleSelectionChange">

      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column width="55"
        label="id">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="Обложка">
      <template slot-scope="scope">
        <img v-if="scope.row.image" width="150" :src="setUrl()+scope.row.image" />
          </template>
      </el-table-column>
      <el-table-column
        label="Название"
        prop="title">
          <template slot-scope="scope">
          <nuxt-link   class="uk-link uk-link-text" :to="'/post/slider/update-post/'+scope.row.id">   {{scope.row.title}}</nuxt-link>
            </template>
      </el-table-column>
      <el-table-column
        label="Статус"
        prop="public">
        <template slot-scope="scope">
        <span class="uk-text-warning" v-if="scope.row.public==0">черновик</span>
        <span class="uk-text-primary" v-if="scope.row.public==2">на модерации</span>
        <span class="uk-text-primary" v-if="scope.row.public==1">опубликован</span>
              </template>
      </el-table-column>
      <el-table-column
      sortable
        label="Дата события"
        prop="created_at">
      </el-table-column>


    </el-table>
  <!---->  <infinite-loading
          @infinite="infiniteHandler">
          <div slot="no-more"> </div>
        </infinite-loading>
        <div class="block uk-text-center">

<!--  <el-pagination
  @current-change="infiniteHandler"
    layout="prev, pager, next"
    :total="allPge*10">
  </el-pagination>-->
</div>
  </div>
</template>

<script>
import {httpf} from '~/plugins/micro.js'
import InfiniteLoading from 'vue-infinite-loading';
export default {
  components: {
   InfiniteLoading
  },
  asyncData({params,app,store }) {
httpf.defaults.headers.common['Authorization'] = 'Bearer '+store.state.token;
    return  httpf.get(`posts/search?category_id=3&public=true`)
      .then((res) => {
        console.log(res);
        return { posts: res.data,
          refresh:true,
       multipleSelection: [],
     page:0
    }

      })

  },

  methods: {
    infiniteHandler($state) {
    this.page += 1;
    httpf.get('posts/search?category_id=3&page='+this.page+'&public=true')
    .then(response => {

      if (this.page<=response.headers['x-pagination-page-count']) {
         this.posts=this.posts.concat(response.data);
         $state.loaded();
      } else {
        $state.complete();
      }
    });
    /**/
   },
    setUrl(){
      return this.$store.state.apiUrl;
    },
   handleSelectionChange(val) {
this.$refs.multipleTable.sort('id');
  this.multipleSelection=val
  console.log(this.multipleSelection)
         },
         postPublic(val,status){
           httpf.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.token;
  if (val) {
            val.forEach(val => {
              const { data } =  httpf.patch('posts/'+val.id, {
                      'public':status
                    })
            });
               }
this.getPost();
 this.getPost();
        //  location.reload(true)
         },
         delPublic(val){
           httpf.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.token;
  if (val) {
            val.forEach(val => {
               httpf.delete('posts/'+val.id)
            });
               }
               this.getPost();
               this.getPost();
         },
 getPost(){
  httpf.get('posts/search?category_id=3&page='+this.page+'&public=true')  .then((res) => {
    console.log(res);
this.posts=res.data;
});

},
     handleEdit(index, row) {
       console.log(index, row);
     },
     handleDelete(index, row) {
       console.log(index, row);
     }
   },
}
</script>
<style>

</style>
