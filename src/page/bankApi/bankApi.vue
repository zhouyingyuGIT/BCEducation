<template>
  <div>
    <div class="my-breadCrumb">当前位置: 首页 - 风险合规 - 银行卡情况查询</div>
    <div class="my-content">
      <h3 class="my-menu-name">银行卡情况查询</h3>
      <div class="my-account-content">
        <div class="my-text-tip"><img src="../../assets/img/tip.png" alt=""><span>1.只能查询北京辖内的银行卡</span><span>2.截止{{endTime}}的银行账户情况</span>
        </div>
        <template>
          <template>
            <Form class="my-form" ref="form" :model="form" :rules="rule" :label-width="90">
              <FormItem label="证件号码" prop="zjhm" class="clrearable">
                <Input v-model="form.zjhm" class="bank-input" clearable  autocomplete="off"
                       placeholder="请输入开户证件号码"></Input>
              </FormItem>
              <FormItem label="查询最近" prop="num" style="position: relative">
                <Select class="bank-select" v-model="form.num" style="width:100px !important;">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select><span class="my-select-text">个月的卡片开立和销户情况</span>
              </FormItem>
              <FormItem>
                <Button class="my-btn handle" @click="handleSubmit('form')">查询</Button>
                <Button class="my-reset-btn" @click="handleReset('form')">重置</Button>
              </FormItem>
            </Form>

            <div class="bankCardRes" v-if="result !== '' || cardOpenResult.length>0">
              <p class="bank-text"><span v-if="result ==''">证件{{cardOpenObj.zjhm}}的</span>查询结果：<span class="msg" v-if="result !==''">{{result}}</span></p>
              <template>
                <!--一人持有多卡-->
                <div class="bankResult" v-if="cardOpenResult.length>0">
                  <span class="result-title">当前持有{{cardOpenObj.kpsl}}张卡,明细如下：</span>
                  <template>
                    <div class="my-list-table-box bank-table-box">
                      <table class="my-list-table">
                        <template>
                          <tr class="my-list-table-header">
                            <th style="width: 25% !important;" v-for="(item,index) in cardOpenResult">{{item.pbName}}</th>
                          </tr>
                        </template>
                        <template>
                          <tr class="my-list-table-content">
                            <td style="width: 25% !important;" v-for="(item,index) in cardOpenResult">{{item.kpsl}}</td>
                          </tr>
                        </template>
                      </table>
                    </div>
                  </template>
                </div>
                <!--最近开立卡片-->
                <div class="bankResult" v-if="cardOpen6mResult.length>0">
                  <span class="result-title">最近{{cardOpen6mObj.num}}个月借记卡开立情况如下：</span>
                  <template>
                    <div class="my-list-table-box bank-table-box">
                      <table class="my-list-table">
                        <template>
                          <tr class="my-list-table-header">
                            <th style="width: 50% !important;" v-for="(item,index) in cardOpen6mResult">{{item.cdName}}</th>
                          </tr>
                        </template>
                        <template>
                          <tr class="my-list-table-content">
                            <td style="width: 50% !important;" v-for="(item,index) in cardOpen6mResult">{{item.kpsl}}</td>
                          </tr>
                        </template>
                      </table>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>


</template>

<script>
  import {getCardOpen, getCardOpen6m} from "../../api/grc";
  import {format} from "../../utils/tools";
  import {readmsg} from "../../api/review";

  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        cityList: [
          {
            value: '1',
            label: '1'
          },
          {
            value: '2',
            label: '2'
          },
          {
            value: '3',
            label: '3'
          },
          {
            value: '4',
            label: '4'
          },
          {
            value: '5',
            label: '5'
          },
          {
            value: '6',
            label: '6'
          },
          {
            value: '7',
            label: '7'
          },
          {
            value: '8',
            label: '8'
          },
          {
            value: '9',
            label: '9'
          },
          {
            value: '10',
            label: '10'
          },
          {
            value: '11',
            label: '11'
          },
          {
            value: '12',
            label: '12'
          }
        ],
        form: {
          zjhm: '',
          num: ''
        },
        rule: {
          zjhm: [
            {required: true, message: '请输入开户证件号码', trigger: 'blur'}
          ],
          num: [
            {required: true, message: '请选择查询时间段', trigger: 'change'}
          ],
        },
        result:'',
        cardOpenObj:{
          zjhm:'',
          kpsl:''
        },
        cardOpenResult: [],
        cardOpen6mObj:{
          zjhm:'',
          num:''
        },
        cardOpen6mResult: []
      }
    },
    created() {
      // 消息
      readmsg()
      if (this.$route.params.startTime !== undefined) {
        this.startTime = format(this.$route.params.startTime)
        sessionStorage.setItem('bankStart', format(this.$route.params.startTime))
      } else {
        this.startTime = sessionStorage.getItem('bankStart')
      }

      if (this.$route.params.endTime !== undefined) {
        this.endTime = format(this.$route.params.endTime)
        sessionStorage.setItem('bankEnd', format(this.$route.params.endTime))
      } else {
        this.endTime = sessionStorage.getItem('bankEnd')
      }
    },
    watch: {
      'form.zjhm': function (val, oldVal) {
        if (val !== oldVal) {
          this.clearRes()
        }
      },
      'form.num':function (val,oldVal) {
        if (val !== oldVal) {
          this.clearRes()
        }
      }
    },
    methods: {
      //表单提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let par = {
              param: this.form
            }
            this.handleGetCardOpen(par)
          } else {
            return
          }
        })
      },

      // 一人持有多卡
      handleGetCardOpen(params) {
        getCardOpen(params).then(res => {
          if(res.data.result ==''){
            this.cardOpenObj.kpsl = res.data.kpsl
            this.cardOpenObj.zjhm = res.data.zjhm
            this.cardOpenResult = res.data.infoDataList
            let par = {
              param: this.form
            }
            this.handleGetCard6m(par)
          }else{
            // 账户不存在
            this.result = res.data.result
          }
        })
      },

      //最近开立卡片
      handleGetCard6m(params) {
        getCardOpen6m(params).then(res => {
          //console.log(res);
          this.cardOpen6mObj.zjhm = res.data.zjhm
          this.cardOpen6mObj.num = res.data.num
          this.cardOpen6mResult = res.data.infoDataList
        })
      },
      //表单重置
      handleReset(name) {
        this.$refs[name].resetFields();
        this.clearRes()
      },
      clearRes:function () {
        this.result = ''
        this.cardOpenResult = []
        this.cardOpen6mResult = []
      }
    }
  }
</script>

<style lang="scss">
  @import "./index";
</style>
