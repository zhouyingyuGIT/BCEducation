<template>
  <div>
    <div class="layout">
      <Layout>
        <api-header></api-header>
        <Layout>
          <Content class="layout-content">
            <Layout>
              <Sider hide-trigger>
                <template v-if="activeSiderIndex == '1'">
                  <div class="my-menu" v-for="item in menu" :key="item.id">
                    <ul class="my-menu-box" v-if="item.children && item.children.length !==0">
                      <li class="my-menu-p" slot="title">
                        <router-link :to={name:item.path,params:{id:item.id}}>
                          <Icon color="#465585" class="my-icon" type="md-arrow-dropdown" />
                          <img :src="item.img" alt="">
                          <span class="tab-link">{{item.name}}</span>
                        </router-link>
                      </li>
                      <li class="my-menu-c" v-for="sub in item.children" :key="sub.id">
                        <router-link :to="{name:sub.path,params: {startTime: sub.startTime,endTime:sub.endTime,id:sub.id}}" >
                          <span class="tab-link">{{sub.name}}</span>
                        </router-link>
                      </li>
                    </ul>
                    <ul v-else>
                      <li class="my-menu-p">
                        <router-link :to="item.path">
                          <img :src="item.img" alt="">
                          <span class="tab-link">{{item.name}}</span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </template>
                <template v-if="activeSiderIndex =='2'">
                  <div class="my-menu">
                    <ul class="my-menu-box">
                      <li class="my-menu-p">
                        <router-link :to="{name:'watingProcess'}" >
                          <span class="tab-link">待我处理<b :class="checkCodeList.length > 99 ? 'largeMsgNum' : 'msgNum'" v-if="checkCodeList.length>0">{{checkCodeList.length}}</b> </span>
                        </router-link>
                      </li>
                      <li class="my-menu-p">
                        <router-link :to="{name:'myApply'}" >
                          <span class="tab-link">我的申请<b :class="commitCodeList.length > 99 ? 'largeMsgNum' : 'msgNum'" v-if="commitCodeList.length >0">{{commitCodeList.length}}</b> </span>
                        </router-link>
                      </li>
<!--                      <li class="my-menu-p" v-for="item in menu2" :key="item.id">-->
<!--                        <router-link :to="{name:item.path}" >-->
<!--                          <span class="tab-link">{{item.name}}</span>-->
<!--                        </router-link>-->
<!--                      </li>-->
                    </ul>
                  </div>
                </template>
              </Sider>
              <Content class="layout-content-box">
                <router-view></router-view>
              </Content>
            </Layout>
          </Content>
        </Layout>
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
        menu: [
          {
            id: 1,
            name: '风控API',
            desc: null,
            path: 'riskList',
            img:'../../../static/img/risk.png',
            children: [
              {
                id: 1 - 1,
                name: '对公客户交易流水验真',
                desc: null,
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                path: 'publicClient',
              },
              {
                id: 1 - 2,
                name: '信贷资金流向监控',
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                desc: null,
                path: 'creditFunds',
              }
            ]
          },
          {
            id: 2,
            name: '合规API',
            path: 'grcList',
            desc: null,
            img:'../../../static/img/grc.png',
            children: [
              {
                id: 1 - 2,
                name: '银行卡和账户情况查询',
                desc: null,
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                path: 'bankApi',
              }
            ]
          }
        ],
        menu2:[
              {
                id: 1,
                name: '待我处理',
                path: 'watingProcess',
              },
              {
                id: 2,
                name: '我的申请',
                path: 'myApply',
              }
        ],
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

</style>
