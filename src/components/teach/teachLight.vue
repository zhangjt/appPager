<template>
  <div class="s-scroll-view" ref="box">
    <swiper :options="swiperOption" ref="myswiper">
      <!-- 课程亮点 -->
      <swiper-slide :class="{'max-height':showingIndex!=0}">
        李新，喜剧编剧、导演、即兴喜剧演员培训师。美国南加州大学戏剧学院访问学者，师从《老友记》导演Peter Bonerz。
        <div class="empty" v-show="listDataBigEmpty">
          <img src="~@/assets/images/empty_wap.png" alt="">
        </div>
      </swiper-slide>
      <!-- 目录 -->
      <swiper-slide :class="{'max-height':showingIndex!=1}">
        <div class="content">
          课程内容简介 《政治经济学》国家级精品资源共享课  课程简介 【课程目标】 《政治经济学》课程的教学目标在于使学生系统了解马克思主义经济学的基础知识和一般原理，认识商品、价值、货币、资本、剩余价值、利润等基本范畴，掌握其内在关系及运动规律。同时，通过介绍当代资本主义和经济全球化发展现状，使学生加强对具有中国特色的社会主义经济实践和经济发展趋势的认识。通过该课程的学习使学生能够用马克思主义经济学和社会主义
        </div>
        <div class="empty" v-show="listDataEmpty">
          <img src="~@/assets/images/empty_wap.png" alt="">
        </div>
      </swiper-slide>
      <!-- 讲师简介 -->
      <swiper-slide :class="{'max-height':showingIndex!=2}">
        <div class="content">
          李新，喜剧编剧、导演、即兴喜剧演员培训师。美国南加州大学戏剧学院访问学者，师从《老友记》导演Peter Bonerz。
        </div>
        <div class="empty" v-show="listDataMultyEmpty">
          <img src="~@/assets/images/empty_wap.png" alt="">
        </div>
      </swiper-slide>
      <!-- tab -->
      <div class="swiper-pagination swiper-pagination-bullets s-menu" slot="pagination" ref="scrollMenu"></div>
      <div class="swiper-scrollbar" slot="scrollbar" ref="scrollMenuBar"></div>
    </swiper>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import http from "@/utils/http";

export default {
  components: {
    swiper,
    swiperSlide,

  },
  data() {
    var vm = this;
    return {
      //滚动触发
      busy: false,
      showingIndex: "0",
      listDataEmpty: false,
      listDataMultyEmpty: false,
      listDataBigEmpty: false,
      listData: [],
      listDataMulty: [],
      listDataBig: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            var menu = ["课程亮点", "目录", "讲师简介"];

            var img = '';
            return `<span class="${className}">${menu[index]} ${
              index == 2 ? img : ""
            }</span>`;
          }
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false
        },
        on: {
          slideChange: function() {
            vm.showingIndex = this.activeIndex;
          }
        }
      }
    };
  },
  computed: {

    searchVal() {}
  },

  watch: {
    '$route' () {
      //var s= this.$refs.myswiper.swiper.updateSlides();
      // if (this.$route.params.refresh) {
      //   this.$refs.myswiper.swiper.slideTo(0);;
      //   this.$refs.myswiper.swiper.updateSlides();
      // }
    }
  },
  methods: {
    getList(params, list) {
      http.post("/web/rebateTower/list", params).then(res => {
        if (res && res.list) {
          this[list] = res.list.list;
          if (!this[list][0]) {
            let s = list + 'Empty';
            this[s] = true;
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getMoreData(params, callback) {
      http.post("/web/rebateTower/list", params).then(res => {
        if (res && res.list) {
          callback(res.list.list);
          // this[list].push() = res.list.list;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    scrollHandle() {

      let el = this.$refs.scrollMenu;
      let elB = this.$refs.scrollMenuBar;
      let t = el.parentNode.offsetTop;
      var s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (s >= t) {
        el.classList.add('fixed');
        elB.classList.add('fixed')
      } else {
        el.classList.remove('fixed');
        elB.classList.remove('fixed')
      }

    },
  },
  created() {
    var params1 = {
      first: 0,
      limit: 500,
      page: 1,
      plateName: ""
    };
    var params2 = {
      first: 1,
      limit: 500,
      page: 1,
      plateName: ""
    };
    var params3 = {
      first: 2,
      limit: 500,
      page: 1,
      plateName: ""
    };
    // this.getList(params1, 'listData');
    // this.getList(params2, 'listDataMulty');
    // this.getList(params3, 'listDataBig');
  }
};

</script>
<style lang="less">
:focus {
  outline: none;
}

html,
body {
  overflow: auto; //-webkit-overflow-scrolling: touch;
}

.s-scroll-view {
  background-color: #fff;
}

.max-height {
  max-height: 380px;
}

.s-menu {
  position: absolute;
  top: 0;
  height: 39px;
  overflow: hidden;
  display: flex;
  span {
    flex: 1;
    display: block;
    height: 39px;
    background-color: #fff !important;
    border-radius: 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #1c2042;
    letter-spacing: -0.23px;
    margin: 0 !important;
    line-height: 39px;
    opacity: 1;
    border: none;
    border-radius: 0;
  }

  .swiper-pagination-bullet-active {
    font-weight: bold;
  }
}

.s-vip {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  padding-bottom: 2.5px;
  box-sizing: content-box;
}

.swiper-wrapper {
  padding-top: 39px;
}

.swiper-scrollbar {
  height: 3px !important;
  position: absolute;
  top: 36px;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  .swiper-scrollbar-drag {
    height: 3px;
    background: #ffa300;
    border-radius: 3px;
  }
}

.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: default;
}

.swiper-pagination-bullet-custom {
  width: 10px;
  height: 10px;
  text-align: center;
  line-height: 10px;
  font-size: 6px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}

.empty {
  position: relative;
  .nodata {
    position: absolute;
    top: 265px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    color: #AEAEAE;
  }
  img {
    width: 100%;
  }
}

.fixed {
  position: fixed !important;
}

</style>
