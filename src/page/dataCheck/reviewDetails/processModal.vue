<template>
  <transition name="confirm-fade">
    <div class="my-modal" v-show="showModal">
      <div class="my-modal-wrapper">
        <div class="my-modal-content">
          <div class="my-modal-header">
            <div class="my-modal-header-box">
              <p>{{title}}</p>
              <img @click="close" src="../../../assets/images/guanbi.png" alt="">
            </div>
          </div>
          <div class="my-modal-body">
            <div class="my-process-modal-body-box">
              <template>
                <template>
                  <div class="my-list-table-box">
                    <table class="my-list-table">
                      <tr class="my-list-table-header">
                        <th>操作人</th>
                        <th>所属机构</th>
                        <th>操作时间</th>
                        <th>操作</th>
                        <th>说明</th>
                      </tr>
                      <template>
                        <tr class="my-list-table-content" v-for="(item,index) in operatorList" :key="index">
                          <td>{{item.name}}</td>
                          <td>{{item.bank}}</td>
                          <td>{{formatterTime(item.date)}}</td>
                          <td>{{item.operate}}</td>
                          <td style="width: 300px">{{item.desc}}</td>
                        </tr>
                      </template>
                    </table>
                  </div>
                </template>
                <template>
                  <div class="my-modal-btn" @click="close">
                    <Button class="my-btn">取消</Button>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {formatAllTime} from "../../../utils/tools";
  import {applyProcess} from "../../../api/review";

  export default {
    data(){
      return{
        showModal:false,
        title:'',
        params:null,
        operatorList:[]
      }
    },
    methods:{
      init(title,params){
        this.showModal = true
        this.title = title
        console.log(params)
        this.handleApplyProcess(params)
      },
      handleApplyProcess(params){
        applyProcess(params).then((res) => {
          console.log(res);
          this.operatorList =res.data.operatorList
        })
      },
      formatterTime(val){
       return formatAllTime(new Date(val))
      },
      close(){
        this.showModal = false
      }
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
    z-index: 998;
    background: rgba(0, 0, 0, 0.3);
    &.confirm-fade-enter-active{
      animation: confirm-fadein 0.3s
    }
    &.my-modal-content{
      animation: confirm-zoom 0.3s
    }
    .my-modal-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 999;
      background: #EEF0F8;
      border-radius: 5px;
      .my-modal-content{
        width: 980px;
        box-sizing: border-box;
        .my-modal-header{
          width: 100%;
          height: 60px;
          border-bottom: 1px solid #D7DAE3;;
          .my-modal-header-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0px 22px;
            font-family: PingFangTC-Regular;
            font-size: 16px;
            color: #425263;
            img{
              width: 12px;
              height: 12px;
              cursor: pointer;
            }
          }
        }
        .my-modal-body{
          .my-process-modal-body-box{
            padding: 20px;
            .my-list-table-box{
              margin: 0;
              .my-list-table-content{
                 text-align: left;
                  td{
                    text-align: left;
                    line-height: 50px;
                    &:last-child{
                      text-align: left;
                      line-height: 20px;
                      padding-left: 20px;
                    }
                  }
              }
            }
          }
          .my-modal-btn{
            margin: 14px 0px 0px
          }
        }

      }
    }
  }
  @keyframes confirm-fadein{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  @keyframes confirm-zoom {
    0%{
      transform: scale(0);
    }
    50%{
      transform: scale(0.8);
    }
    100%{
      transform: scale(1);
    }
  }

</style>
