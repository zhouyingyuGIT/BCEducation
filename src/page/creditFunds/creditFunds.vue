<template>
  <div>
    <div class="my-breadCrumb">当前位置: 首页 - 风控API - 信贷资金流向监控</div>
    <div class="my-content">
      <h3 class="my-menu-name">信贷资金流向监控</h3>
      <div class="my-text-tip"><img src="../../assets/img/tip.png" alt="">查询时间段：{{startTime}}～{{endTime}}借据号需精确匹配，只能匹配到本行的借据号</div>
        <template>
          <Form class="my-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="83">
            <FormItem label="借据号" prop="iousNumber">
<!--              <input ref="myInput" class="my-input" type="text" v-model="formValidate.iousNumber" placeholder="请填写借据号">-->
              <Input v-model="formValidate.iousNumber"  class="creditFunds-input"
                     placeholder="请填写借据号" autocomplete="off"></Input>
            </FormItem>
            <FormItem>
              <button type="button" class="my-btn handle" @click="handleSubmit('formValidate')">查询</button>
              <button type="button" class="my-btn" @click="handleReset('formValidate')" >重置</button>
            </FormItem>
          </Form>
          <div class="results" v-if="resCode >= 0">
            <p>查询结果</p>
            <div class="result-content" v-if="resCode == 1 || resCode == 3">
              <img src="../../assets/img/null.png" alt="">
              <p class="result-text">{{resMsg}}</p>
            </div>
            <div class="result-content" v-if="resCode == 0">
              <div class="time-box">
                <time-axis :dataList="dataList"></time-axis>
              </div>
            </div>
            <div class="result-content" v-if="resCode == 2">
              <img src="../../assets/img/auth.png" alt="">
              <p class="result-text">{{resMsg}}</p>
            </div>
          </div>
        </template>
    </div>
  </div>
</template>

<script>
  import {formatDate,format} from "../../utils/tools";
  import {getFundFlow} from '../../api/manageRisk'
  import TimeAxis from '../../components/timeAxis'
  export default {
    data() {
      return {
        startTime:'',
        endTime:'',
        formValidate: {
          iousNumber: '',
        },
        ruleValidate: {
          iousNumber: [
            {required: true, message: '请填写借据号', trigger: 'blur'}
          ]
        },
        result: '',
        resCode:-1,
        resMsg:'',
        dataList: [
          {
          time:'2018年3月2号',
          content:'发放给小瓶子贷款5630.00万元'
          },
          {
            time:'2018年3月2号',
            content:'发放给小瓶子贷款5630.00万元'
          },
          {
            time:'2018年3月2号',
            content:'发放给小瓶子贷款5630.00万元'
          },
          {
            time:'2018年3月2号',
            content:'小瓶子给李玉明转5630.00万元'
          },
          {
            time:'2018年3月2号',
            content:'发放给小瓶子贷款5630.00万元'
          }
        ]
      }
    },
    created() {
      if(this.$route.params.startTime !==undefined){
        this.startTime = format(this.$route.params.startTime)
        sessionStorage.setItem('creditStart',format(this.$route.params.startTime))
      }else{
        this.startTime = sessionStorage.getItem('creditStart')
      }

      if(this.$route.params.endTime !== undefined){
        this.endTime = format(this.$route.params.endTime)
        sessionStorage.setItem('creditEnd',format(this.$route.params.endTime))
      }else{
        this.endTime = sessionStorage.getItem('creditEnd')
      }
    },
    components:{
      TimeAxis
    },

    watch:{
      'formValidate.iousNumber':function (val,oldVal) {
        if(val !== oldVal){
          this.resMsg = []
          this.resCode = -1
        }
      }
    },
    methods: {
      //表单提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let par = {
              param: this.formValidate
            }
            this.handleGetFundFlow(par)
          } else {
            return
          }
        })
      },
      handleGetFundFlow(params) {
        getFundFlow(params).then(res => {
          if(res.data !==null){
            if(res.data.code >0){
              this.resCode = res.data.code
              this.resMsg = res.data.resultModle
            }else{
              this.resCode = res.data.code
              this.dataList = res.data.wtms
            }
          }else{
            this.resMsg =''
            this.resCode = -1
          }
        })
      },
      //表单重置
      handleReset(name) {
        this.$refs[name].resetFields();
        this.resMsg = ''
        this.resCode = -1
      }
    }
  }
</script>

<style lang="scss">
  .creditFunds-input input{
    width: 62%;
  }

  .handle{
    margin-left: 2px;
  }
  /*为使和input对齐*/
  .ivu-form .ivu-form-item-label{
    line-height: 2;
  }
  .results{
    margin-top: 54px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #444444;
    width: 100%;
    .result-content{
     text-align: center;
      .result-text{
        margin-top: 19px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #999999;
      }
    }
  }
</style>
