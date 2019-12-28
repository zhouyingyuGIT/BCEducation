<template>
  <div class="details">
    <div class="my-breadCrumb">当前位置: 首页 - 数据复合 - 我复核的申请 - 数据复核详情</div>
    <div class="my-content">
      <h3 class="my-menu-name">数据复核详情</h3>
      <template>
        <div class="details-content">
          <template>
            <div class="searchDetails applyDetails">
              <p class="title">申请详情</p>
              <ul>
                <li><span>申请原因</span><span class="applyDetails-text">{{detailsRes.commitDesc}}</span></li>
                <li>
                  <span class="spec-span">附件</span>
                  <span class="downloadList">
                     <ul>
                        <li v-if="detailsRes.commitFileInfoList.length ==0">暂无附件</li>
                       <li v-for="(item,index) in detailsRes.commitFileInfoList">
                         <p>{{item.fileName}}</p><a href="#" @click="handledownload(item)">下载</a>
                       </li>
                     </ul>
                   </span>
                </li>
                <li><span>复核请求ID</span><span>{{detailsRes.applyCode}}</span></li>
                <li><span class="spec-span">当前状态</span><span>{{formatter(detailsRes.applyStatus)}}</span></li>
                <li><span>申请提交时间</span><span>{{formatterTime(detailsRes.commitTime)}}</span></li>
              </ul>
            </div>
          </template>
          <template>
            <div class="searchDetails">
              <p class="title">查询详情</p>
              <ul>
                <li><span>API名称</span><span>{{detailsRes.commitApiName}}</span></li>
                <li><span>开户行</span><span>{{detailsRes.checkerBankName}}</span></li>
                <li><span>交易日期</span><span>{{formatterTime(detailsRes.commitApiDetail.transactionDate,'0')}}</span></li>
                <li class="spe-li"><span>交易账号</span><span v-if="detailsRes.commitApiDetail.identifyType =='HQCKZH'">记账账号</span>
                  <span v-if="detailsRes.commitApiDetail.identifyType =='KH'">客户账号</span><span>{{detailsRes.commitApiDetail.identifyCode}}</span></li>
                <li><span>交易金额</span><span>{{detailsRes.commitApiDetail.transactionAmount}}元</span></li>
                <li><span>查询结果</span><span>{{detailsRes.commitApiResult}}</span></li>
              </ul>
            </div>
          </template>
          <template>
            <div class="detailsHandle">
              <Button class="my-btn" @click="openProcessModal">查看处理流程</Button>
              <Button class="my-btn" @click="openResultModal" v-if="detailsRes.applyStatus !==0">查看复核结果</Button>
              <Button class="my-btn" @click="openReviewModal" v-if="detailsRes.applyStatus ==0">复核</Button>
              <Button class="my-btn" @click="openRejectModal" v-if="detailsRes.applyStatus ==0">拒绝</Button>
<!--              <Button class="my-btn" @click="openResultModal" v-if="detailsRes.applyStatus !==0">查看复核结果</Button>-->
<!--              <Button class="my-btn" @click="openReviewModal" v-if="detailsRes.applyStatus !==0">复核</Button>-->
<!--              <Button class="my-btn" @click="openRejectModal" v-if="detailsRes.applyStatus !==0">拒绝</Button>-->
            </div>
          </template>
        </div>
      </template>
    </div>
    <!--     查看处理流程-->
    <process-modal ref="processModal"></process-modal>
    <!--     查看复核结果模态框-->
    <result-modal ref="resultModal"></result-modal>
    <!--     复核模态框-->
    <review-modal ref="reviewModal" @refreshDetails="handleApplyCheckDetail"></review-modal>
    <!--     拒绝复核模态框-->
    <reject-modal ref="rejectModal" @refreshDetails="handleApplyCheckDetail"></reject-modal>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {applyCheckDetail,applyFiledownload,applyMsgRead} from "../../../api/review";
  import {formatAllTime} from "../../../utils/tools";
  import  processModal from '../reviewDetails/processModal'
  import resultModal from '../reviewDetails/resultModal'
  import reviewModal from '../reviewDetails/reviewModal'
  import rejectModal from '../reviewDetails/rejectModal'
  export default {
    data(){
      return{
        showResult:false,
        detailsId:'',
        detailsRes:{
          commitApiDetail:{
            transactionAmount:'',
            identifyCode:'',
            identifyType:'',
            transactionDate:''
          },
          commitFileInfoList:[],
          Filename:''
        },
        processId:''
      }
    },
    components:{
      processModal,
      resultModal,
      reviewModal,
      rejectModal
    },
    mounted(){
      this.updateNav('2')
      this.updateSider('2')
      this.detailsId = this.$route.query.detailsId
      if(this.$route.query.detailsId){
        let params = {
          applyCode:this.$route.query.applyCode,
          msgType:1
        }
        this.handleApplyMsgRead(params)
        this.handleApplyCheckDetail()
      }
    },
    methods:{
      //查询详情
      handleApplyCheckDetail(){
        let params = {
          id:this.$route.query.detailsId
        }
        applyCheckDetail(params.id).then((res) => {
          console.log(res);
          this.detailsRes = res.data
          this.detailsRes.commitApiDetail = JSON.parse(res.data.commitApiDetail)
          // 上传文件
          this.detailsRes.commitFileInfoList = res.data.commitFileInfoList
          //查看流程传参
          this.processId =res.data.id
        })
      },
      formatter(val){
        if(val ==0){
          return val = '待复核'
        }else if(val == -1){
          return val = '已拒绝'
        }else if(val ==1){
          return val = '已复核'
        }
      },
      formatterTime(val,type){
        return formatAllTime(new Date(val),type)
      },
      handledownload(item){
        console.log(item);
        // setTimeout(() => {
        //   this.$Notice.success({
        //     title: '下载成功!',
        //     duration: 10
        //   })
        // }, 1000);
        this.fileName = item.fileName
        applyFiledownload(item.id).then((res) => {
          var blob  = new Blob([res]);
          var url = URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', this.fileName)
          document.body.appendChild(link);
          link.click();
        }).catch(err => {
          console.log(err);
        })
      },
      //打开查询处理流程模态框
      openProcessModal(){
        this.$nextTick(() =>{
          let params ={
            id:this.processId,
            show:false
          }
          this.$refs.processModal.init('查看处理流程',params)
        })
      },
      // 打开查询复核结果模态框
      openResultModal(){
        this.$nextTick(() => {
          let params ={
            id:this.processId
          }
          this.$refs.resultModal.init('查看复核结果',params)
        })
      },
      //打开复核模态框
      openReviewModal(){
        this.$nextTick(() => {
          let params ={
            id:this.processId
          }
          this.$refs.reviewModal.init('复核',params)
        })
      },
      //打开拒绝复核模态框
      openRejectModal(){
        this.$nextTick(() => {
          let params ={
            id:this.processId
          }
          this.$refs.rejectModal.init('拒绝复核',params)
        })
      },
      // 消息已读
      handleApplyMsgRead(params){
        applyMsgRead(params).then((res) => {
          this.updateMsgTotal(res.data.total)
          this.updateCheckList(res.data.checkCodeList)
          this.updateCommitList(res.data.commitCodeList)
        })
      },
      ...mapMutations({
        updateNav:'UPDATE_NAV',
        updateSider:'UPDATE_SIDER',
        updateMsgTotal:'UPDATE_MSGTOTAL',
        updateCommitList:'UPDATE_COMMITLIST',
        updateCheckList:'UPDATE_CHECKLIST',
      })
    }
  }
</script>

<style lang="scss">
  .details{
    .details-content{
      //步骤图
      .review-step{
        width: 800px;
        margin: 30px auto 5px;
        .ivu-steps .ivu-steps-head{
          background: #EEF0F8;

        }
        /*title*/
        .ivu-steps .ivu-steps-title{
          font-family: PingFangTC-Regular;
          font-size: 16px;
          color: #62717E;
          background: #EEF0F8;
        }
        //描述
        .ivu-steps-horizontal .ivu-steps-content{
          padding-left: 0px;
          margin-top: 10px;
          font-family: PingFangTC-Regular;
          font-size: 16px;
          color: #62717E;
        }
        //待完成线条
        .ivu-steps-item.ivu-steps-status-process .ivu-steps-tail > i{
          background: #D7DAE3;
        }
      }
      //查询详情
      .searchDetails{
        margin-left: 37px;
        .title{
          margin-left: 39px;
          margin-bottom: 15px;
          font-family: PingFangTC-Medium;
          font-size: 16px;
          color: #A1ADB6;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          margin-left: 30px;
          li{
            width: 50%;
            margin-bottom: 20px;
            span{
              display: inline-block;
              width: 64px;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #425263;
              text-align: right;
              &:nth-child(2){
                display: inline-block;
                box-sizing: border-box;
                width: 450px;
                height: 50px;
                line-height: 50px;
                text-align: left;
                margin-left: 10px;
                padding-left: 12px;
                background: #F8FAFF;
                border: 1px solid #D7DAE3;
                border-radius: 3px;
                color: #62717E;
              }
            }
          }
          .spe-li{
            span:nth-child(2){
              width: 130px;
            }
            span:last-child{
              width: 310px;
              display: inline-block;
              box-sizing: border-box;
              height: 50px;
              line-height: 50px;
              text-align: left;
              margin-left: 6px;
              padding-left: 12px;
              background: #F8FAFF;
              border: 1px solid #D7DAE3;
              border-radius: 3px;
              color: #62717E;
            }
          }
        }
      }
      .applyDetails{
        margin-top: 30px;
        margin-left: 20px;
        ul{
          margin-left: 13px;
          li:nth-child(1),li:nth-child(2){
            span:nth-child(1){
              vertical-align: top;
              margin-top: 15px;
            }
            .applyDetails-text{
              padding: 15px 12px;
              height: 220px;
              overflow-y: auto;
              line-height: 1.4;
            }
            span:nth-child(2){
              height: 220px;
              overflow-y: auto;
              word-break: break-all;
            }
            .downloadList{
              box-sizing: border-box;
              padding: 12px 12px;
              height: 220px;
              /*overflow-y: scroll;*/
              line-height: 2;
              margin-left: 4px;
              ul{
                margin: 0;
              }
              ul>li{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                margin: 0;
                &:hover{
                  cursor: pointer;
                }
                a{
                  cursor: pointer;
                }
              }
            }
          }
          li>span{
            width: 96px;
          }
          .spec-span{
            width: 80px;
          }
        }
      }
      .detailsHandle{
        margin-left: 138px;
        .my-btn{
          margin-right: 10px;
          &:first-child,&:nth-child(2){
            width: 120px;
          }
        }
      }
    }
  }
</style>
