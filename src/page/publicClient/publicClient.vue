<template>
  <div>
    <div class="my-breadCrumb">当前位置: 首页 - 风险合规 - 对公流水验真</div>
    <div class="my-content">
      <h3 class="my-menu-name">对公流水验真</h3>
      <div class="form-box" style="padding: 25px 0px 0px 34px">
        <template>
          <Tabs value="name1">
            <TabPane label="单条查询" name="name1">
              <div class="my-tab-content">
                <div class="my-text-tip">
                  <p><img src="../../assets/img/tip.png" alt=""><span>1.只能查询北京辖内的银行流水</span>
                    <span>2.查询时间段：{{startTime}}～{{endTime}}</span>
                    <span>3.只能查询500元及其以上的流水金额</span></p>
                </div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">

                  <FormItem label="开户行" prop="orgNo">
                    <Select style="width: 404px !important;" v-model="formValidate.orgNo" filterable placeholder="请选择开户行">
                      <Option :value="item.code" v-for="(item,index) in bankList" :key="index" >{{item.name}}</Option>
                    </Select>
                  </FormItem>
                  <Row>
                    <div class="spe_select" style="float:left;width: 200px">
                      <FormItem  label="交易账号" prop="identifyType" >
                        <Select v-model="formValidate.identifyType" style="width: 100px !important;" placeholder="记账账号">
                          <Option value="KH">客户账号</Option>
                          <Option value="HQCKZH">记账账号</Option>
                        </Select>
                      </FormItem>
                    </div>
                    <div class="spec_input" style="float:left;width: 300px;">
                      <FormItem class="spec_lable" prop="identifyCode">
                        <Input v-model="formValidate.identifyCode" class="formWidth" autocomplete="off" :placeholder="placeholder"></Input>
                      </FormItem>
                    </div>
                  </Row>
                  <FormItem label="交易日期" prop="transactionDate">
                    <Row>
                      <DatePicker type="date" v-model="formValidate.transactionDate"
                                  format="yyyy-MM-dd"   placeholder="请选择交易日期" ></DatePicker>
                    </Row>
                  </FormItem>
                  <FormItem label="交易金额" prop="transactionAmount" style="position: relative">
                    <Input v-model="formValidate.transactionAmount" type="number" class="formWidth"
                           placeholder="保留小数点后两位" autocomplete="off"></Input><span class="unit">元</span>
                  </FormItem>
                  <FormItem class="btn-box">
                    <Button  class="my-btn handle" @click="handleSubmit('formValidate')">查询</Button>
                    <Button  class="my-reset-btn" @click="handleReset('formValidate')" >重置</Button>
                  </FormItem>
                </Form>
                <div class="result" v-if="result != ''">
                  <span class="title">查询结果:</span>
                  <span class="text" style="margin-left: 6px" :class="result =='否'?'active':'' ">{{result}}</span>
<!--                  <img v-if="img_status === true" src="../../assets/img/success.png">-->
<!--                  <img v-if="img_status === false" src="../../assets/img/fail.png">-->
                </div>
<!--                <div class="review" v-if="result != ''">-->
<!--                  <p class="review-tip">如对流水验真查询返回数据存在的疑义,可点击下方按钮申请数据复核</p>-->
<!--                  <Button class="my-btn" @click="openApplyReviewModal">申请数据复核</Button>-->
<!--                </div>-->
              </div>
            </TabPane>
            <TabPane label="批量查询" name="name2">
              <div class="my-tab-content">
                <div class="my-text-tip">
                  <p><img src="../../assets/img/tip.png"><span>1.只能查询北京辖内的银行流水</span>
                    <span>2.查询时间段：{{startTime}}～{{endTime}}</span>
                    <span>3.只能查询500元及其以上的流水金额</span></p>
                </div>
                <Form :label-width="80">
                  <FormItem class="tem_label" label="模板下载">
                    <Button class="tem_upload" @click="templateDownload()" type="dashed" ghost>
                      <img src="../../assets/img/download.png">
                      <div style="margin-top: 5px;font-family: PingFangSC-Regular;font-size: 16px;color: #A1ADB6;">下载excel模板</div>
                      <div class="tips" >
                        <div class="out"></div>
                        <pre class="infomation">
 <span>excel模版填写说明:</span>
 01.只能查询北京辖内的银行流水。
 02.查询时间段：{{startTime}}~{{endTime}}。
 03.只能查询500元及其以上的流水金额
 金额保留小数点后两位。
 04.开户行必填。
 05.一行记录中记账账号、客户账号任选其一
 且只能填写其中一项，不同行可选不同项
 填写。
 06.最多只能填写200条数据。
            </pre>
                      </div>
                    </Button>

                  </FormItem>
                  <FormItem label="批量查询">
                    <Upload
                      :max-size="1024"
                      :before-upload="handleUpload"
                      action="">
                      <Button style="padding: 12px;width: 220px;font-size: 16px;background: #F8FAFF;border-style: solid;border-color: #D7DAE3 !important;box-shadow: none">请上传查询文件</Button>
                    </Upload>
                    <div v-if="file !== null" style="font-size: 16px;color: #1a5ab5;">上传查询文件: {{ file.name }}</div>
                    <div v-if="msg !== ''" style="font-size: 16px;color: red;">Excel格式不对: {{ msg }}</div>
                  </FormItem>
                  <FormItem>
                    <Button v-if="file !== null" type="primary" class="btn1" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '点击上传' }}</Button>
                    <Button v-if="loadResult === true" class="btn1" @click="getDownloadResult" type="primary"  :loading="loadingUplodeStatus"  size="large">{{ loadingUplodeStatus ? '下载中...' : '下载查询结果' }}</Button>
                  </FormItem>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </template>
      </div>
    </div>
<!--    申请复核模态框-->
    <apply-review ref="applyReview"></apply-review>
  </div>
</template>

<script>
  import {
    getBankList,
    publicSearch,
    uploadFile,
    getTemplateDownload,
    getDownloadResult
  } from "../../api/manageRisk";
  import applyReview from '../../components/review/applyReview/applyReview'
  import {formatDate,formatTime,format} from "../../utils/tools";
  import { Notice } from 'iview'
  import {readmsg} from "../../api/review";

  export default {
    name: "publicCredit",
    data() {
      const validatePassCheck = (rule, value, callback) => {
        if(value.indexOf('.') == -1){
          callback();
        }else{
          let val = value.toString().slice(value.indexOf('.')+1)
          if (val.length >2) {
            callback(new Error('小数点后面只能保留两位'));
          } else {
            callback();
          }
        }

      };
      return {
        sid:'',
        placeholder:'请填写交易账号或对公借记卡卡号',
        startTime:'',
        endTime:'',
        queryUrl: '',
        queryMethod: '',
        bankList: [],
        dis: true,
        file:null,
        loadResult:false,
        img_status:'',
        msg:'',
        id:'',
        loadingStatus: false,
        loadingUplodeStatus:false,
        formValidate: {
          orgNo: '',
          identifyType: 'HQCKZH',
          identifyCode: '',
          transactionDate: '',
          transactionAmount: '',
        },
        tempDate:'',
        dateRules: {
          disabledDate(date) {
            return date && date.valueOf() < 1454083200776;
          }
        },
        ruleValidate: {
          orgNo: [
            {required: true, message: '请选择开户行', trigger: 'change'}
          ],
          identifyType: [
            {required: true, message: '', trigger: 'change'}
          ],
          identifyCode: [
            {required: true, message: '请填写交易账号或对公借记卡卡号', trigger: 'blur'}
          ],
          transactionDate: [
            {required: true, type: 'date', message: '请选择交易日期', trigger: 'change'}
          ],
          transactionAmount: [
            {required: true, message: '请填写交易金额', trigger: 'blur'}
          ]

        },
        result: '',
        params:{},
        submitParams:{}
      }
    },
    created() {
      // 消息
      readmsg()
      if(this.$route.params.startTime !==undefined){
        this.startTime = format(this.$route.params.startTime)
        sessionStorage.setItem('publicStart',format(this.$route.params.startTime))
      }else{
        this.startTime = sessionStorage.getItem('publicStart')
      }

      if(this.$route.params.endTime !== undefined){
        this.endTime = format(this.$route.params.endTime)
        sessionStorage.setItem('publicEnd',format(this.$route.params.endTime))
      }else{
        this.endTime = sessionStorage.getItem('publicEnd')
      }
      if(this.$route.params.id !== undefined){
        this.sid = this.$route.params.id
        sessionStorage.setItem('sid',this.$route.params.id)
      }else{
        this.sid = sessionStorage.getItem('sid')
      }
      //console.log(this.queryUrl)
      this.handleGetBank()
    },
    components:{
      applyReview
    },
    methods: {
      //银行列表
      handleGetBank() {
        getBankList().then(res => {
          this.bankList = res.data
        })
      },
      changeDate(date){
        //console.log(date)
        this.formValidate.transactionDate = date
      },
      //表单提交
      handleSubmit(name) {
        // 清除之前结果
        this.result = ''
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.tempDate = this.formValidate.transactionDate //辅助格式化
            //console.log(this.formValidate.transactionDate)
            this.formValidate.transactionDate = formatTime(this.formValidate.transactionDate)
            //console.log(this.formValidate.transactionDate)
            let par = {
              param: this.formValidate
            }
            //传递给复核modal
            this.params = par.param
            this.handelPublicSearch(par)
          } else {
            return
          }
        })
      },
      handelPublicSearch(params) {
        // this.formValidate.transactionDate = this.tempDate
        publicSearch(params).then(res => {
          this.formValidate.transactionDate = this.tempDate
          if(res.data !==null){
            this.result = res.data;
            //传递给复核modal
            this.submitParams = {
              commitApiId:this.sid,
              commitApiDetail:this.params,
              commitApiType:'0', //0 代表单条查询，1代表批量查询
              commitApiResult:res.data,
              checkerBankCode:this.params.orgNo
            }
            if ( res.data === '该交易属实') {
              this.img_status = true;
            } else {
              this.img_status =  false;
            }
          }
        })
      },
      //表单重置
      handleReset(name) {
        this.$refs[name].resetFields();
        this.result = ''
      },
      /*手动选择文件*/
      handleUpload (file) {
        this.loadResult =  false;
        this.msg = '';
        let arry_ = file.name.split('.');
        if(file.size < 1048576){
          console.log(arry_[arry_.length-1])
          if (arry_[arry_.length-1] === 'xls') {
            this.file = file;
            return false;
          } else {
            Notice.error({
              title: '文件格式不正确,请上传Excel(xls)文件!',
              duration: 10
            })
            // this.$Message.warning('文件格式不正确,请上传Excel(xlsx,xls)文件!')
            return false;
          }
        }else{
          Notice.error({
            title: '请使用正确的模版',
            duration: 10
          })
        }
      },
      /*上传文件*/
      upload () {
        const params = new FormData();
        params.append('file', this.file);
        uploadFile(params).then((res) =>{
          if ( res.msg !== null ) {
            this.msg = res.msg;
            this.loadingStatus = true;
            setTimeout(() => {
              this.file = null;
              this.loadingStatus = false;
              // Notice.error({
              //   title: '上传失败',
              //   duration: 10
              // })
              // this.$Message.warning('上传失败!')
            }, 1500);
          } else {
            this.loadingStatus = true;
            this.id = res.data.id;
            setTimeout(() => {
              this.file = null;
              this.loadingStatus = false;
              Notice.success({
                title: '上传成功',
                duration: 10
              })
             // this.$Message.success('上传成功！')
              this.loadResult = true;
            }, 1500);
          }
        })
      },
      /*下载查询结果excel*/
      getDownloadResult () {
        const params = {
          param:{
            id: this.id
          }
        };
        this.loadingUplodeStatus = true
        getDownloadResult(params).then((res) =>{
          if ( 'msg' in res ) {
            this.loadingUplodeStatus = false
            this.loadingStatus = true;
            setTimeout(() => {
              this.file = null;
              this.loadingStatus = false;
              Notice.error({
                title: '下载失败!',
                duration: 10
              })
             // this.$Message.warning('下载失败!')
              this.msg = res.msg;
            }, 2000);
          } else {
            setTimeout(() => {
              this.file = null;
              this.loadingStatus = false;
              this.loadingUplodeStatus = false
              Notice.success({
                title: '下载成功!',
                duration: 10
              })
              //this.$Message.success('下载成功!')
              this.loadResult = false;
            }, 2000);
            let url = window.URL.createObjectURL(new Blob([res]));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', '批量查询结果.xls');
            document.body.appendChild(link);
            link.click();
          }
        })
      },
      //模板下载
      templateDownload(params) {
        getTemplateDownload(params).then(res => {
          setTimeout(() => {
            Notice.success({
              title: '下载成功!',
              duration: 10
            })
            //this.$Message.success('下载成功!')
          }, 1000);
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = 'excel批量查询模板.xls'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        }).catch(err => {
          console.log(err);
        })
      },
      // 打开申请复核模态框
      openApplyReviewModal(){
        this.$nextTick(() => {
          this.$refs.applyReview.init('申请数据复核',this.submitParams)
        })
      }
    }
  }
</script>

<style lang="scss">
  .special {
    margin-bottom: 10px;

    .ivu-form-item-error-tip {
      display: none !important;
    }
  }
  .unit {
    position: absolute;
    top: 0;
    left: 200px;
    display: inline-block;
    height: 55px;
    line-height: 55px;
    font-size: 20px;
    vertical-align: middle;
    font-family: PingFangSC-Regular;
    color: #444444;
    margin-left: 30px;
  }

  .result {
    padding: 30px 0px 15px;
    .title{
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #425263;
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #A1ADB6;
    }
    .text{
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #62717E;
      font-weight: bold;
    }
    img {
      position: absolute;
      width: 25px;
    }

    .active {
      color: red
    }
  }
  .ivu-tabs-bar{
    border-bottom: 0px;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    color: #425263;
    text-align: left;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #1585FF;
  }
  .icon_action {
    font-size: 18px;
    color: #81A0D0;
  }


  .loadResult {
    text-align: center;
    button {
      font-size: 20px;
      margin-top: 30px;
    }
  }

  .fileName {
    color: #2d8cd3;
    text-align: left;
    font-size: 20px;
  }

  .tem_upload {
    width: 220px;
    height: 190px;
    background: #fafafa;
    color: #57a3f3 !important;
    border-color: #57a3f3 !important;
  }

  .tips {
    display: none;
    text-align: left;
    margin-top: -150px;
    margin-left: 230px;
    position: absolute;
    width: 335.5px;
    height: 270px;
    border-radius: 4px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
    box-shadow: -6px 8px 12px 0 rgba(0, 0, 0, 0.15);
    span{
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #A1ADB6;
      margin-bottom: 10px;
    }
  }
  pre.infomation {
    //color: #77797f;
    margin: 10px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #425263;
  }
  .out{
    transform: rotate(270deg);
    position: absolute;
    width: 0;
    height: 0px;
    border: 10px solid transparent;
    //border-bottom-color: #77797f
    border-bottom-color: #fff;
    top: 80px;
    left: -6%;
  }
  .tem_upload:hover .tips {
    display: block;
  }

  .btn-box{
     /*padding-top: 20px;*/
  }
  /*申请复核*/
  .review{
    margin-left: 79px;
    .review-tip{
      display: block;
      /*height: 22px;*/
      line-height: 22px;
      /*width: 1029px;*/
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #425263;
    }
    .my-btn{
      margin-top: 24px;
      width: 120px;
    }
  }

</style>


