<template>
  <div class="api-menu">
    <div class="header">
      <!--<img src="../../assets/images/headerBg.png" />-->
    </div>
    <div class="api-modal-box">
      <div class="api-item-box" v-for="item in menu" :id="item.id" :key="item.id" :class="clickEvent" @click="hanldleOpenModal($event)">
        <div class="api-item" v-if="item.children && item.children.length !==0">
          <img v-for="list in item.children" :key="list.id"  :src="list.img" alt="">
        </div>
        <div class="api-item-name">{{item.name}}</div>
      </div>
    </div>
    <Modal class="menuList" v-model="modal" :mask-closable="false"  @on-cancel="cancel">
      <div class="menuBoxList">
        <div class="menuBox"  v-for="list in modalData" :key="list.id">
          <router-link :disabled="list.visible >0" :to={name:list.path,params:{id:list.id}}>
            <img :src="list.img" alt="">
            <div class="api-item-name">{{list.name}}</div>
          </router-link>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import {getGroup2, getGroupMenu} from "../../api/group";
  import {getUser} from "../../api/login";
  import {mapMutations} from 'vuex'
  export default {
    name: "indexModel",
    data() {
      return {
        clickEvent: '',
        modal: false,
        modalData:[],
        menu: [
          {
            id: 2,
            name: '支持实体',
            path: 'grcList',
            img:'../../../static/img/grc.png',
            desc: null,
            children: [
              {
                id: 1 - 1,
                name: '银行卡开立情况',
                desc: null,
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                path: 'bankApi',
                img:'../../../static/img/bankCards.png',
              },
              {
                id: 1 - 2,
                name: '账户开立情况',
                desc: null,
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                path: 'accountApi',
                img:'../../../static/img/accountApi.png',
              },
              {
                id: 1 - 3,
                name: '行业数据分享',
                desc: null,
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                path: 'dataSharing',
                img:'../../../static/img/dataSharing.png',
              }
            ]
          },
          {
            id: 7,
            name: '风险合规',
            desc: null,
            path: 'riskList',
            img:'../../../static/img/risk.png',
            children: [
              {
                id: 1 - 1,
                name: '对公流水验真',
                desc: null,
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                path: 'publicClient',
                img:'../../../static/img/verificationOfBublic.png',
              },
              {
                id: 1 - 2,
                name: '信贷资金流向',
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                desc: null,
                path: 'creditFunds',
                img:'../../../static/img/loanFunds.png',
              },
              {
                id: 1 - 2,
                name: '监管法规查询',
                startTime: "2018-10-31T16:00:00.000+0000",
                endTime:'2018-10-31T16:00:00.000+0000',
                desc: null,
                path: 'codeSearch',
                img:'../../../static/img/codeSearch.png',
              },
            ]
          },
        ],
        menu: [],
        siderList: [],
        activeMenu: 1,
        currentMenuName: '',
        tableData: [],
        total: 1,
        info: [],
        isLoading: true
      }
    },
    components: {},
    mounted(){
      this.updateNav('1')
      this.updateSider('1')
    },
    created() {
      this.handleGetUser()
      this.handleGetGroup()
    },
    methods: {
      // 获取用户
      handleGetUser() {
        getUser().then(res => {
          sessionStorage.setItem('username', res.data.username)
        })
      },
      // 获取菜单列表
      handleGetGroup() {
        getGroup2().then(res => {
          this.menu = res.data
        })
      },
      hanldleOpenModal(e) {
        this.clickEvent = 'vague';
        this.modal = true;
        const id = e.currentTarget.id;
        this.menu.forEach( item => {
          if ( item.id === parseInt(id)) {
              this.modalData = item.children;
              console.log(this.modalData)
          }
        })
      },
      cancel() {
        this.clickEvent = ''
      },
      ...mapMutations({
        updateNav:'UPDATE_NAV',
        updateSider:'UPDATE_SIDER'
      })
    }
  }
</script>

<style lang="scss">
  .vague {
    filter: blur(4px);
  }
  .api-modal-box {
    overflow: hidden;
  }
  .api-menu{
    height: 100vh;
    background: url("../../assets/images/login-bg.png") no-repeat center;
    .header {
      text-align: center;
    }
    .api-modal-box{
      text-align: left;
      display: flex;
      justify-content:center;
      flex-wrap: wrap;
      margin: 16px 48px;
      padding: 40px 29px;
      .api-item-box{
        width: 220px;
        height: 220px;
        margin-right: 30px;
        margin-bottom: 30px;
        &:hover{
          .api-item{
            margin-top: 10px;
            transition: 0.2s ease-in-out;
          }
          cursor: pointer;
        }
        .api-item{
          width: 216px;
          height: 216px;
          align-items: center;
          border-radius: 30px;
          background: rgba(255,255,255,.1);
          margin: 20px auto;
          padding: 15px;
          img{
            width: 45px;
            height: 45px;
            margin-left: 8px;
            margin-right: 8px;
          }
        }
        .api-item-name{
          text-align: center;
          font-size: 18px !important;
          color:#fff;
        }
      }
    }

  }

</style>
