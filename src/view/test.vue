<template>
  <div class="help-container" v-if="isShow">
    <div class="white-bg">
      <div class="slide-nav">
        <div v-for="(one,index) in list" :key="index" :class="active==one.tagId?'active':''" size="small" @click.prevent="active = one.tagId">{{one.title}}</div>
      </div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
          <mt-tab-container-item v-for="(one,index) in list" :key="index" :id="one.tagId">
            <slide-cell v-for="(item,index) in one.content" :key="index" :title="one.tagId" :question="item.subject" :content="item.answer"></slide-cell>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <div class="white-bg more">
      还有更多问题? 欢迎
      <router-link to="/contact" class="contactus">联系我们 &gt;</router-link>
    </div>
  </div>
</template>
<script>
import slideCell from '@/components/SlideCell.vue'
import http from '@/utils/public'
import { baseUrl } from '@/utils/env'
export default {
  name: "CodeSet",
  components: {
    slideCell
  },
  data() {
    let vm = this;
    return {
      isShow: false,
      active: '',
      list: [{
          title: 'app',
          tagId: 'tab-container1',
          content: [{
              subject: '少年,想加速到更快的境界么?',
              answer: '.....'
            },
            {
              subject: '少年,想加速到更快的境界么?',
              answer: '.....'
            }
          ]

        },
        {
          title: 'app2',
          tagId: 'tab-container2',
          content: [{
              subject: '少年,想加速到更快的境界么?',
              answer: '.....'
            },
            {
              subject: '少年,想加速到更快的境界么?',
              answer: '.....'
            }
          ]

        }
      ],

    };
  },

  computed: {
    // active:{
    //   get:function(){
    //     let s=this.list[0].tagId;
    //     return s
    //   },
    //   set:function(val){
    //     console.log(val)
    //     this.list[0].tagId=val;
    //   }
    // },
  },
  created() {
    this.getList();
    top.window.getListCallBack=this.getListCallBack;
  },
  methods: {
    getList() {
      let data = {
        'reqData': "",
        'url': "/help/question/list",
        'callback': "getListCallBack"
      }
      http.postWithoutCode(data);

    },
    getListCallBack(res){
      let map = res.map;
      // console.log(res)
      this.list = [];
      for (let i in map) {

        // console.log(map[i])

        let one = map[i];
        let newOne = {};
        if (one) {
          newOne.title = one[0].tag;
          newOne.tagId = 'tab-container' + one[0].tagId;
          newOne.content = one;

          this.list.push(newOne)

        }

      }
      this.active = this.list[0].tagId;
      this.isShow = true;
    }
  }
};

</script>
<style lang='postcss' scoped>
.help-container {
  & .white-bg {
    background-color: #fff;
  }

  & .slide-nav {
    margin: 0 16px;
    display: flex;
    position: -webkit-sticky;
    position: sticky;
    &>div {
      width: 50%;
      color: #1c2042;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
    }
    &>div.active {
      font-weight: bold;
      border-bottom: 2px solid #5838be;
    }
  }

  & .more {
    display: flex;
    justify-content: center;
    margin-top: 0px;
    padding: 8px 16px;
    font-size: 12px;

    & .contactus {
      color: #6B3AE3;
    }
  }
}

</style>
