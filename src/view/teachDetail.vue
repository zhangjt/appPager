<template>
  <div class="home">
    <div class="home-top">
      <!-- 视频 -->
      <div class="activity">
        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
      </div>
      <div style="width: 100%;height: 10px;background: #FAFAFA"></div>
      <!-- article and curriculum -->
      <teach-light></teach-light>
    </div>
  </div>
</template>
<script>
import http from '@/utils/http'
import 'swiper/dist/css/swiper.css'
import teachLight from '@/components/teach/teachLight'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { baseUrl } from '@/utils/env'

import list from "@/components/teach/List";
export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
    teachLight,
    list,
  },
  data() {
    return {
      imgShow: false,
      activityShow: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          type: "video/ogg",
          type: "video/webm",
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: require('@/assets/images/teach/test.png'), //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }

    }
  },
  computed: {
    banner() {
      return this.bannerList;
    },
    activity() {
      return this.activityList
    }
  },
  created() {


  },
  mounted() {},
  methods: {

  }
}

</script>
<style lang="postcss" scoped>
.home {
  background-color: #F6F7F8;
}

.home-header {
  width: 100%;
  position: fixed;
  top: 0;
}

.single-image {
  border-radius: 8px;
  overflow: hidden;
  margin: 44px 5px 0;
  & a {
    display: block;
  }
  & img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}

.home-swipe {
  height: 115px;
}

.swiper-container {
  z-index: 0;
  margin: 0;
  padding: 4px 0 6px;
}

.swiper-slide {
  width: 315px;
  height: 112px;
}

[slide-block] {
  width: 315px;
  height: 112px;
}

.swiper-slide img {
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

.swiper-slide-active img {
  margin-top: 0;
  width: 100%;
  height: 100%;
}

.home-top {
  background-color: #fff;
  /* margin-bottom: 15px; */
}

.home-nav {
  display: flex;
  padding: 15px 0;
  font-size: 12px;
}


.cardWrap {
  background: #fff;
}

.empty {
  width: auto;
  margin: 0px 20px;
  & img {
    width: 100%;
  }
}




/*activity-start*/

.activity {
  border-radius: 0px;
  overflow: hidden;
  margin: 10px 10px 15px;
  & a {
    display: block;
  }
  & img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}




/*activity-end*/

</style>
