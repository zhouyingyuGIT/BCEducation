<template>
  <div class="my-modal" v-show="showModal">
    <div class="my-modal-wrapper">
      <div class="my-modal-content">
        <div class="my-modal-body">
          <div class="my-success-body-box">
            <Icon size="50" color="#0DA10D" type="ios-checkmark-circle-outline" />
            <p>{{title}}</p>
            <p>复核申请ID:{{res.applyCode}}</p>
          </div>
          <div class="success-btn">
            <Button class="my-btn" @click="handleSee">查看</Button>
            <Button class="my-reset-btn" @click="handleClose">返回</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return{
        showModal:false,
        title:'',
        res:{
          applyCode:'',
          applyStatus:'',
          committerName:'',
          checkerBankName:''
        }
      }
    },
    methods:{
      // 初始化
      init(title,res){
        this.showModal = true
        this.title = title
        this.res = res
        console.log(this.res);
      },
      // 关闭
      handleClose(){
        this.showModal = false
        this.$emit('closeModal',false);
      },
      //查看申请详情
      handleSee(){
        this.$router.push('/myApply')
        this.updateNav('2')
        this.updateSider('2')
      },
      ...mapMutations({
        updateNav:'UPDATE_NAV',
        updateSider:'UPDATE_SIDER'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .my-modal{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.3);
    .my-modal-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 999;
      background: #F8FAFF;
      box-shadow: 0 4px 12px 0 rgba(0,0,0,0.15);
      border-radius: 4px;
      .my-modal-content{
        width: 300px;
        box-sizing: border-box;
        .my-modal-body{
          .my-success-body-box{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            margin-top: 20px;
            p{
              margin-top: 10px;
              font-family: PingFangSC-Regular;
              font-size: 20px;
              color: #425263;
              &:last-child{
                font-size: 16px;
                color: #A1ADB6;
              }
            }
          }
        }
        .success-btn{
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin: 15px 0px;
        }
      }
    }
  }
</style>
