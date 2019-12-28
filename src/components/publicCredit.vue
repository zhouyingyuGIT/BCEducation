<template>
  <div class="publicCredit">
    <div class="form-box" style="padding: 5px 20px">
      <div class="my-title">
<!--        <p>请填写以下信息</p>-->
        <p>注:可查询数据时间范围:{{startTime}}--{{endTime}}</p>
      </div>
      <template>
        <Tabs value="name1">
          <TabPane label="单条查询" name="name1">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
              <FormItem label="开户行" prop="orgNo" class="selectWidth">
                <Select v-model="formValidate.orgNo" filterable placeholder="请选择开户行">
                  <Option :value="item.code" v-for="(item,index) in bankList" :key="index">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="企业信息" prop="identifyType" class="special">
                <RadioGroup v-model="formValidate.identifyType">
                  <!--              <Radio label='ZJHM'>组织机构代码</Radio>-->
                  <Radio label='KH'>客户账号</Radio>
                  <Radio label='HQCKZH'>记账账号</Radio>
                  <!--              <Radio label='XYZDM'>统一社会信用证代码</Radio>-->
                </RadioGroup>
              </FormItem>
              <FormItem label="" prop="identifyCode">
                <Input v-model="formValidate.identifyCode" class="formWidth" placeholder="请填写企业信息"></Input>
                <p style="font-size: 18px;color:#81A0D0;">注：以上两项任选一项填写即可</p>
              </FormItem>
              <FormItem label="交易日期" prop="transactionDate">
                <Row>
                  <DatePicker type="date" v-model="formValidate.transactionDate"
                              format="yyyy-MM-dd"   placeholder="请选择交易日期" style="width: 200px"></DatePicker>
                </Row>
              </FormItem>
              <FormItem label="交易金额" prop="transactionAmount">
                <Input v-model="formValidate.transactionAmount" type="number" class="formWidth"
                       placeholder="保留小数点后两位"></Input><span class="unit">元</span>
              </FormItem>
              <FormItem>
                <Button class="btn" type="primary" @click="handleSubmit('formValidate')" size="large">查询</Button>
                <Button class="btn1" type="primary" @click="handleReset('formValidate')"  size="large">重置</Button>
              </FormItem>
            </Form>
            <div class="result" v-if="result != ''">
              <span>查询结果:</span><span style="margin-left: 6px" :class="result =='否'?'active':'' ">{{result}}</span>
            </div>
          </TabPane>
          <TabPane label="批量查询" name="name2">
            <Row>
              <Col span="4">模板下载</Col>
              <Col span="12">
                <div style="padding: 20px 0">
                  <Icon type="md-cloud-download" size="52" style="color: #3399ff" />
                  <p>Click or drag files here to upload</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="4">批量查询</Col>
              <Col span="12">
                <input title="请上传excel模板" id="h5Input3"  accept="*/*" type="file" name="file" webkitRelativePath>
              </Col>
            </Row>
            <Row>
              <Col span="4"></Col>
              <Col span="12">
                <div>
                  <Button class="btn" type="primary"  size="large">上传</Button>
                  <Button class="btn1" type="primary"  size="large">下载查询结果</Button>
                </div>
              </Col>
            </Row>
            <!--<Button @click="templateDownload()" type="dashed" ghost><span class="icon_action"><Icon type="ios-cloud-download" />模板下载</span></Button>
            <pre class="infomation">
excel填写说明:
1、开户行必填
2、一行记录中客户账号、记账账号两项任选其一，且只能填写其中一项，不同行可选不同项填写
3.交易金额保留小数点后两位
4.最多只能填写1000条数据
            </pre>
            <Upload
              :before-upload="handleUpload"
              action="">
              <div style="padding: 10px 0;cursor:pointer ">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p style="color: #fff;font-size: 18px;">点击选取查询模板进行上传并下载查询结果</p>
                <p style="color: red;font-size: 18px;">{{msg}}</p>
              </div>
            </Upload>
            <div v-if="file !== null">
              <Row class="fileName">
                {{file.name}}
              </Row>
              <Row class="loadResult">
                <Button :loading="loadingStatus" @click="uploadExcel" type="primary"><Icon type="ios-cloud-download" />{{ loadingStatus ? '下载中...' : '下载查询结果' }}</Button>
              </Row>
            </div>-->
          </TabPane>
        </Tabs>
      </template>
    </div>
  </div>
</template>

<script>
  import {
    getBankList,
    publicSearch,
    getTemplateDownload,
    getDownloadResult
  } from "../api/manageRisk";
  import {formatDate,formatTime} from "../utils/tools";

  export default {
    name: "publicCredit",
    props:{
      startTime:{
        type:String,
        default:'--'
      },
      endTime: {
        type:String,
        default:'--'
      }
    },
    data() {
      return {
        queryUrl: '',
        queryMethod: '',
        bankList: [],
        dis: true,
        file:null,
        msg:'',
        loadingStatus: false,
        formValidate: {
          orgNo: '',
          identifyType: 'KH',
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
            {required: true, message: '请填写企业信息', trigger: 'blur'}
          ],
          transactionDate: [
            {required: true, type: 'date', message: '请选择交易日期', trigger: 'change'}
          ],
          transactionAmount: [
            {required: true, message: '请填写交易金额', trigger: 'blur'}
          ]

        },
        result: ''
      }
    },
    created() {
      //console.log(this.queryUrl)
      this.handleGetBank()
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
            this.result = res.data
          }
        })
      },
      //表单重置
      handleReset(name) {
        this.$refs[name].resetFields();
        this.result = ''
      },
      handleUpload (file) {
        this.msg = '';
        let arry_ = file.name.split('.');
        if ( arry_[arry_.length-1] === 'xlsx' || arry_[arry_.length-1] === 'xls') {
          this.file = file;
          return false;
        } else {
          this.$Message.warning('文件格式不正确,请上传Excel(xlsx,xls)文件!')
        }
      },
      uploadExcel () {
        const params = new FormData();
        params.append('file', this.file);
        getDownloadResult(params).then((res) =>{
          if ( 'msg' in res ) {
            this.msg = res.msg;
            this.loadingStatus = true;
            setTimeout(() => {
              this.file = null;
              this.loadingStatus = false;
              this.$Message.warning('下载失败!')
            }, 2000);
          } else {
              setTimeout(() => {
                  this.file = null;
                  this.loadingStatus = false;
                  this.$Message.success('下载成功!')
                }, 2000);
              let url = window.URL.createObjectURL(new Blob([res]));
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.setAttribute('download', '批量查询结果.xlsx');
              document.body.appendChild(link);
              link.click();
          }
        })
      },
      //模板下载
      templateDownload(params) {
        getTemplateDownload(params).then(res => {
          setTimeout(() => {
            this.$Message.success('下载成功!')
          }, 1000);
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = 'excel批量查询模板.xlsx'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        }).catch(err => {
          console.log(err);
        })
      },
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
    font-size: 20px;
    vertical-align: middle;
    margin-left: 10px;
    color:#C8E0FF;
  }

  .result {
    margin: 30px 0px 30px 140px;
    color:#fff !important;

    span {
      font-size: 20px;
      font-weight: 600;
    }

    .active {
      color: red
    }
  }
  .ivu-tabs-bar{
    margin-bottom: 30px;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    font-size: 20px;
  }

  .icon_action {
    font-size: 18px;
    color: #81A0D0;
  }

  .infomation {
    margin-bottom: -5px;
    font-size: 18px;
    color: #81A0D0;
  }

  .ivu-upload-select {
    width: 100%;
    text-align: center;
    border: 1px solid;
    cursor:pointer;
  }

  .ivu-upload-select:hover {
    border: 1px solid #13b3fc;
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

</style>


