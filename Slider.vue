<template>
  <div class="slider">

    <div uk-parallax="bgy: -200" class="uk-position-relative uk-visible-toggle uk-light" uk-slider="center: true;autoplay: true">

        <ul class="uk-slider-items " >
            <li  v-for="(item, index) in data1.data"  :key="index" >
              <div class="uk-cover-container" >

                <img :src="$store.state.apiUrl+item.image" alt="" >
                <div  class="uk-position-top-left uk-panel uk-padding" uk-slider-parallax="x: 100,-100">
                <nuxt-link  :to="'/post/slider/'+item.id"><span class="uk-h1" >{{item.title}}</span><br />

                  <span>{{item.description}}</span>

                </nuxt-link>
                </div>
                  <span class="uk-position-bottom-left uk-padding" >
<div class="slider-date uk-grid uk-grid-small" v-if="item.created_at" v-html="steps(item.created_at)" >

<!--
<div class="slider-d"><b>27 </b>  </div><div class="slider-m-y">декабря,<br />четверг</div> <div class="slider-d"><b>6:15</b></div>-->
</div>
                  </span>
                  </div>
            </li>

        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover link-inverse" style="color: white" href="#" uk-slider-item="previous">
          <i class="material-icons" style="font-size: 35px;">
arrow_back_ios
</i></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover link-inverse" href="#"  uk-slider-item="next">
          <i class="material-icons" style="font-size: 35px;" >
          arrow_forward_ios
          </i>

        </a>
 <ul class="uk-slider-nav uk-position-bottom-center uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
  </div>
</template>

<script>
import formatdate from '~/components/formatDate.vue'
export default {
  components:{
  formatdate
} ,
  props: ['data1']
  ,
  methods:{
    steps(val){

var arr = val.split(' ');
      return '<div class="slider-d"><b>'+arr[0]+' </b>  </div><div class="slider-m-y">'+arr[1]+'<br />'+arr[2]+'</div> <div class="slider-d"><b>'+arr[3]+'</b></div>';
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.slider{
  background: black;
}
.slider-d{
      font-size: 33px;
}
.slider-m-y{
  line-height: 1.1;
  margin: auto;
  font-size: 14px;
}
</style>
