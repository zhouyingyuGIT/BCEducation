<template>
  <div>
    <Header class="apiHeader">
      <Menu mode="horizontal" theme="dark" :active-name="activeMenuName" @on-select="selectItem">
        <div class="layout-logo">
          <img class="layout-logo-img" src="../assets/img/logo.png" alt="">
        </div>
<!--        新增-->
<!--        <div class="layout-nav">-->
<!--          <MenuItem name="1" style="width: 120px">-->
<!--              <img class="item-logo" src="../../static/img/shujuApi.png" alt="">-->
<!--              数据API-->
<!--          </MenuItem>-->
<!--          <MenuItem name="2" style="width: 120px">-->
<!--            <div class="message-tip-box">-->
<!--              <img class="item-logo" src="../../static/img/fuhe.png" alt="">-->
<!--              <div v-if="msgTotal >0"  :class="msgTotal> 99 ? 'largeRed-tip' :'red-tip' "><span v-if="msgTotal >0">{{msgTotal}}</span></div>-->
<!--              数据复核-->
<!--            </div>-->
<!--          </MenuItem>-->
<!--        </div>-->
        <div class="user-box">
<!--          <div class="feedback" @click="handleFeedBack">-->
<!--            <img src="../../static/img/fankuiyijian.png" alt="">-->
<!--            <span>写反馈</span>-->
<!--          </div>-->
          <img class="avator" src="../assets/images/touxiang.png" alt="">
          <Dropdown>
            <a href="javascript:void(0)" class="user-name">
              {{username}}
              <img src="../assets/img/Path.png" alt="">
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>
                <span @click="handleResetPasssword">修改密码</span>
              </DropdownItem>
              <DropdownItem>
                <span @click="logout">退出登录</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Menu>
    </Header>
    <!--    反馈-->
    <feed-back ref="feedback"></feed-back>
    <!--    修改密码-->
    <reset-password ref="resetPassword"></reset-password>
  </div>
</template>

<script>
  import feedBack from '../components/feedback';
  import resetPassword from '../components/resetPassword'
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'
  export default {
    name: "apiHeader",
    data() {
      return {
        // activeMenuName:'',
        passwordModal: false,
        modal_loading: false,
        username: sessionStorage.getItem('username') || "管理员：admin",
      }
    },
    created(){
      //console.log('初始化' + sessionStorage.getItem('selectedItem'));
      // if(sessionStorage.getItem('selectedItem') == null){
      //   this.activeMenuName = '1'
      //   this.$nextTick(()=>{
      //     this.activeMenuName = '1'
      //   })
      // }else{
      //   this.$nextTick(()=>{
      //     this.activeMenuName = sessionStorage.getItem('selectedItem')
      //   })
      // }
    },
    components: {
      feedBack,
      resetPassword
    },
    computed:{
      ...mapGetters([
        'activeMenuName',
        'msgTotal'
      ])
    },
    methods: {
      // 选择模块
      selectItem(name){
        // console.log(name);
        if(name ==2){
          this.$router.push('/review')
        }else{
          this.$router.push('/index')
        }
        // this.activeMenuName = name

        this.updateNav(name)
        this.updateSider(name)
        //
        // sessionStorage.setItem('selectedItem',name)
        // this.$emit('eventSelectItem',name);
      },
      // 返回着陆页
      goIndex(){
        this.$router.push('/indexModel')
      },
      // 退出
      logout() {
        sessionStorage.clear()
        this.updateNav(1)
        this.updateSider(1)
        this.$router.push('/')
      },
      // 打开反馈模态框
      handleFeedBack() {
        this.$nextTick(() => {
          this.$refs.feedback.init()
        })
      },
      //打开修改密码模态框
      handleResetPasssword() {
        this.$nextTick(() => {
          this.$refs.resetPassword.init()
        })
      },
      ...mapMutations({
        updateNav:'UPDATE_NAV',
        updateSider:'UPDATE_SIDER'
      })
    }
  }
</script>

<style lang="scss" scoped>
  /*颜色定义规范*/
  $color-theme: #F90;
  $color-background: #2E3C6A;
  $color-text: #fff;
  //字体定义规范
  $font-size-small: 14px;
  $font-size-normal: 16px;
  $font-size-large: 18px;
  $font-size-large-x: 20px;
  .apiHeader {
    height: 70px;
    background: $color-background;
    /*修改layout-header默认样式*/
    .ivu-layout-header, .ivu-menu-dark {
      background: $color-background !important;
    }

    .ivu-menu-horizontal {
      line-height: 0px;
    }

    .layout-logo {
      height: 68px;
      float: left;
      line-height: 68px;
      cursor: pointer;
      .layout-logo-img {
        display: inline-block;
        vertical-align: middle;
        height: 40px;
        width: 275px;
      }
    }

    /*新增*/
    .layout-nav{
      height: 68px;
      line-height: 68px;
      float: left;
      margin-left: 58px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      .ivu-menu-item{
        box-sizing: border-box;
      }
      .ivu-menu-item-selected{
        box-sizing: border-box;
        background: #253057;
        //border-bottom: 1px solid #1585FF;
        transition: all 0.2s ease-in-out
      }
      .item-logo{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }

    }
    .user-box {
      height: 100%;
      float: right;
      line-height: 66px;
      margin-right: 20px;
      .feedback {
        display: inline-block;
        margin-right: 20px;
        /*font-weight: 600;*/
        font-family: PingFangTC-Regular;
        color: $color-text;
        font-size: $font-size-normal;

        div {
          display: inline-block;
          cursor: pointer;
        }

        span {
          cursor: pointer;
        }

        img {
          display: inline-block;
          vertical-align: text-bottom;
          width: 25px;
          height: 25px;
          margin-right: 9px;
        }

      }

      .avator {
        display: inline-block;
        vertical-align: text-bottom;
        height: 16px;
        width: 14.5px;
        border-radius: 50%;
      }

      .user-name {
        margin-left: 6px;
        /*font-weight: 600;*/
        font-family: PingFangTC-Regular;
        color: $color-text;
        font-size: $font-size-normal;

        img {
          width: 12px;
          height: 7.2px;
          margin-left: 12px;
        }
      }
    }

    .ivu-dropdown-item {
      font-size: 16px !important;
      color: #444;
    }

    .ivu-dropdown-item:hover {
      color: #fff;
      background: #429DFF !important;
    }

  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
   /*小红点*/
  .message-tip-box{
    position: relative;
    .red-tip{
      position: absolute;
      right: -17px;
      top: 19px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #E33E3E;
      border: 1px solid #2E3C6A;
      font-size: 10px;
      line-height: 20px;
      text-align: center;
    }
    .largeRed-tip{
      position: absolute;
      top: 19px;
      width: 25px;
      height: 20px;
      border-radius: 50%;
      background: #E33E3E;
      border: 1px solid #2E3C6A;
      font-size: 10px;
      text-align: center;
      right: -20px;
      font-size: 10px;
      line-height: 17px;
    }
  }
</style>
