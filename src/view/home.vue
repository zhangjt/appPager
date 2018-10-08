<template>
  <div class="home">
    <!-- <rebate-scroll-view></rebate-scroll-view> -->

  </div>
</template>

<script>
import http from '@/utils/http'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
  },
  data () {
    return {
      imgShow: false,
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        autoplay: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: -70, // slide左右距离
            depth: 400, // slide前后距离
            modifier: 0.5, //
            slideShadows: false // 滑块遮罩层
        },
        loop: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
      },
      bannerList: [{}]
    }
  },
  computed: {

  },
  created () {
   
  },
  mounted() {
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.home{
  background-color: #F6F7F8;
}
.home-header{
  width: 100%;
  position: fixed;
  top: 0;
}
.single-image{
  border-radius: 8px;
  overflow: hidden;
  margin: 44px 5px 0;
  & a{
    display: block;
  }
  & img{
    width: 100%;
    height: 100%;
    vertical-align: middle;

  }
}
  .home-swipe{
    height: 115px;
  }
  .swiper-container{
    z-index: 0;
    margin: 0;
    padding: 4px 0 6px;
  }
  .swiper-slide{
    width: 315px;
    height: 112px;
  }
  [slide-block]{
    width: 315px;
    height: 112px;
  }
  .swiper-slide img{
    display: block;
    margin: 0 auto;
    width: 98%;
    height: 98%;
    margin-top: 2%;
    vertical-align: middle;
    -webkit-transition: all 1s ease 0s;
    -moz-transition: all 1s ease 0s;
    -ms-transition: all 1s ease 0s;
    -o-transition: all 1s ease 0s;
    transition: all 1s ease 0s;
    box-shadow: 0px 2px 3px #999;
    border-radius: .3rem;
  }
  .swiper-slide-active img{
    margin-top: 0;
    width: 100%;
    height: 100%;
  }
  .home-top{
    background-color: #fff;
    /* margin-bottom: 15px; */
  }
  .home-nav{
    display: flex;
    padding: 15px 0;
    font-size: 12px;
  }

</style>
