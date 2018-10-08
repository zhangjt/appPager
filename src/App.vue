<template>

  <div id="app" >
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import "@/assets/css/iconfont.css"; /*引入图标字体公共样式*/
export default {
  name: "App",
};
</script>

<style>
img {
  /* 图片兼容性处理 */
  content: normal !important;
}
html ,body {
  /* 去滚动条 */
  overflow: scroll;
  overflow-x: hidden;
  background-color: #f6f7f8;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.activity{
  & .video-js .vjs-big-play-button{
    left:50%;
    top:50%;
    margin-top:-.75em;
    margin-left: -1.5em;
  }
}
.help-container{
 & .silde-container .silde-content{
   font-size:12px;
 } 
}

</style>
