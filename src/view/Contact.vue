<template>
  <div class="contact-container">
    <div class="white-bg">
      <mt-cell title="客服电话"><a :href="'tel:'+contactObj.kfTel">{{contactObj.kfTel}}</a></mt-cell>
      <mt-cell title="微信服务号"><a @click.prevent="copytoWeixin(contactObj.wechatNumber)">{{contactObj.wechatNumber}}</a></mt-cell>
      <mt-cell title="专属理财师电话" v-if="isShowFinancialAccount"><a :href="'tel:'+contactObj.financialAccount">{{contactObj.financialAccount}}</a></mt-cell>
      <mt-cell title="专属理财师微信" v-if="isShowWechatAccount"><a @click.prevent="copytoWeixin(contactObj.wechatAccount)">{{contactObj.wechatAccount}}</a></mt-cell>
    </div>
    <transition name="slide-fade">
      <div v-if="show" class="silde-content">服务时间 ：上午：9:30-12:00 下午：14:00-18:30</div>
    </transition>
  </div>
</template>
<script>
import slideCell from '@/components/SlideCell.vue'
export default {
  name: "CodeSet",
  components: {
    slideCell
  },
  data() {
    return {
      show: true,
      isShowFinancialAccount:false,
      isShowWechatAccount:false,
      contactObj: {
        kfTel: '400-1160588',
        wechatNumber: 'caimiaoxingqiu',
        financialAccount: '',
        wechatAccount: '',
      },
    };
  },
  created(){
    window.contactObjCallback=this.contactObjCallback;
    this.getContactObj();
  },
  computed: {},

  methods: {
    getContactObj(){
      
      let json={
        url:'/app/financial/getFinancialAccount',
        reqData:{},
        callback:'contactObjCallback'
      }
      this.GeneralGetData(json);
    },
    contactObjCallback(data){

      if (data.isSuccess==0) {
        let responseData=data.responseData;
        if (responseData) {
          let f=responseData.financialAccount;
          let w=responseData.wechatAccount;
          this.contactObj.financialAccount=f;
          this.contactObj.wechatAccount=w;
          this.isShowFinancialAccount=f?true:false;
          this.isShowWechatAccount=w?true:false;
        }
      }
      // alert(JSON.stringify(data))
    },
    copytoWeixin(key) {
      this.$messageBox({
        title: '',
        message: '复制微信号并跳转到微信',
        showCancelButton: true,

      }).then(action => {

        if (action === 'confirm') {
          this.toWeixin({ key: key });
        } else {
          console.log(action)
        }
      });

    },
  }
};

</script>
<style lang='postcss'>
.mint-msgbox {
  border-radius: .6em;
}
 .mint-msgbox-message{
  color:#333;
}
.mint-msgbox-cancel{
  color:#999;
}
.mint-msgbox-confirm{
  color:#3F75DD;
}

.contact-container {
  & .mint-cell a {
    font-size: 14px;
    color: #4477DD;
  }
  .white-bg {
    background-color: #fff;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  & .slide-fade-enter-active {
    transition: all .3s ease;
  }

  & .slide-fade-leave-active {
    transition: all .3s ease;
  }

  & .slide-fade-enter,
  & .slide-fade-leave-to {

    transform: translateY(10px);
    opacity: 0;
  }
  & .silde-content {
    padding:10px 10px;
    bottom:33px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:left;
    font-size: 14px;
    color: #A4A4A4;
  }

}

</style>
