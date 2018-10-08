<template>
  <div class="silde-container" :class="active">
    <div class="silde-title" @click="show = !show" :class="show==true?'active':''">{{question}}<i class="iconfont icon-jiantou-shang"></i></div>
    <transition name="slide-fade">
      <div v-if="show" class="silde-content">{{content}}</div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "CodeSet",
    data() {
      return {
        active: "",
        show: false,
      };
    },
    props: {
      question: {
        type: String
      },
      content: {
        type: String
      }
    },
    components: {},

    computed: {},

    methods: {

    }
  };
</script>
<style lang='postcss' scoped>
  .silde-container{
    font-size: 14px;
    line-height: 1.4;
    color: #333333;
    background-image: linear-gradient(
      180deg,
      #d9d9d9,
      #d9d9d9 50%,
      transparent 50%
    );
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: -18px bottom;
    background-origin: content-box;
    overflow: hidden;
    & .silde-title{
      position: relative;
      margin: 12px 26px 12px 16px;
      & .iconfont{
        position: absolute;
        right: -10px;
        top: 50%;
        margin-top: -11px;
        transform: rotate(0deg);
        transform-origin: center center;
        transition: all .3s ease;
        color: #ccc;
      }
      &.active .iconfont{
        transform: rotate(180deg);
      }
    }
    & .silde-content{
      margin: 0px 16px 12px 16px;
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>

