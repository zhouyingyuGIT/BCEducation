<template>
  <div>
    <div class="layout">
      <Layout>
        <api-header></api-header>
        <Layout>
          <Content class="layout-content-box">
            <router-view></router-view>
          </Content>
        </Layout>
        <Footer class="footer">京ICP备20003021号</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
  import {getGroup, getGroupMenu} from "../../api/group";
  import apiHeader from '../../components/apiHeader'
  import {getUser} from "../../api/login";
  import {mapGetters} from 'vuex'
  import {mapState} from 'vuex'
  export default {
    name: "index",
    data() {
      return {
        siderList: [],
        activeMenu: 1,
        currentMenuName: '',
        tableData: [],
        total: 1,
        info: [],
        isLoading: true
      }
    },
    components: {
      apiHeader
    },
    created() {
      this.handleGetUser()
      this.handleGetGroup()
    },
    mounted(){
      console.log(this.activeSiderIndex)
    },
    computed:{
      // ...mapGetters([
      //   'activeSiderIndex'
      // ]),
      ...mapState(['activeSiderIndex','checkCodeList','commitCodeList'])
    },
    methods: {
      // 获取用户
      handleGetUser() {
        getUser().then(res => {
          sessionStorage.setItem('username', res.data.username)
        })
      },
      // 获取侧边栏列表
      handleGetGroup() {
        getGroup().then(res => {
          this.menu = res.data
        })
      },
      // 获取子组件传过来的值
      eventSelectItem(name){
        // sessionStorage.setItem('selectedItem',name)
        // this.activeSiderIndex = name
        //console.log("父组件接收" + name);
      }
    }
  }
</script>

<style lang="scss">
  /*颜色定义规范*/
  $color-theme: #429DFF;
  $color-text:#E6EBFF;
  //字体定义规范
  $font-size-small:14px;
  $font-size-normal:16px;
  $font-size-large:18px;
  $font-size-large-x:20px;
  ul, li {
    list-style: none;
  }

  .my-menu {
    .my-menu-p, .my-menu-c {
      margin-right: 15px;
      font-family: PingFangTC-Regular;
      font-size: $font-size-normal;
      a {
        display: flex;
        width: 100%;
        flex-direction: row;
        height: 40px;
        align-items: center;
        margin-bottom: 7px;
        padding-left: 8px;
        color: $color-text !important;
        &:hover {
          font-family: PingFangTC-Semibold;
          color: #1585FF !important;
          font-weight: bold;
          b{
            color:#fff;
          }
        }

        &.router-link-active {
          background: #1B2748;
          border-radius: 2px;
          .tab-link {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #1585FF;
            b{
              color:#fff;
            }
          }
        }
        .my-icon{
          margin-right: 7px;
        }
        img{
          margin-right: 10px;
          width: 18.4px;
          height: 16px;
          vertical-align: middle;
        }
      }
    }
    .my-menu-c {
      padding-left: 54px;
      a{
        /*box-sizing: border-box;*/
        padding-left: 20px;
        padding-right: 15px;
        width: 170px;
      }
    }
    .my-menu-p{
      margin-left:15px;
    }
  }

  .ivu-table-row {
    /*height: 120px;*/
  }

  .ivu-table-cell {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  //消息数字
  .msgNum{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin-left: 10px;
    background: #E33E3E;
    border-radius: 50%;
    font-size: 10px;
  }
  .largeMsgNum{
    display: inline-block;
    width: 25px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin-left: 10px;
    background: #E33E3E;
    border-radius: 50%;
    font-size: 10px;
  }

  .footer{
    background: #000;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }

</style>
