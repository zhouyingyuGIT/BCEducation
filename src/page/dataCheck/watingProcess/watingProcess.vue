<template>
  <div class="myApply">
    <div class="my-breadCrumb">当前位置: 首页 - 数据复合 - 待我处理</div>
    <div class="my-content">
      <h3 class="my-menu-name">待我处理</h3>
      <template>
        <div class="my-apply-form-box">
          <Form class="apply-form" ref="applyForm"  :model="form"  :label-width="0">
            <FormItem label="" class="apply-form-content">
              <Input v-model="form.applyCode" class="apply-input"   autocomplete="off"
                     placeholder="请输入复核申请ID"></Input>
            </FormItem>
            <FormItem label="" class="apply-form-content">
              <Select  v-model="form.applyStatus" placeholder="请选择">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="" class="apply-form-content">
              <Select  v-model="form.apiId" placeholder="请选择API名称">
                <Option v-for="item in apiNameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="" class="apply-form-content">
              <DatePicker type="date" v-model="form.commitTime"
                          format="yyyy-MM-dd"   placeholder="请选择申请日期" ></DatePicker>
            </FormItem>
            <FormItem label="" class="apply-form-content">
              <Button class="my-btn " @click="handleSubmit('applyForm')">查询</Button>
              <Button class="my-btn handle" @click="handleReset('applyForm')" >重置</Button>
            </FormItem>
          </Form>
          <template>
            <div class="my-list-table-box">
              <loading v-if="isLoading"></loading>
              <table v-if="isLoading == false" class="my-list-table">
                <tr class="my-list-table-header">
                  <th></th>
                  <th v-if="applyInfoList.length >0" style="text-align: left">序号</th>
                  <th v-if="applyInfoList.length ==0" >序号</th>
                  <th>复核请求ID</th>
                  <th>查询API名称</th>
                  <th>查询时间</th>
                  <th>当前状态</th>
                  <th>操作</th>
                </tr>
                <template v-for="(item,index) in applyInfoList" >
                  <tr class="my-list-table-content">
                    <td style="width: 50px;text-align: right"><span class="apply-message" v-if="checkCodeList.includes(item.applyCode)">未读</span></td>
                    <td style="text-align: left">{{ index < 9 ? '0' +(index + 1) : index +1}}</td>
                    <td @click="handleDetails(item)">{{item.applyCode}}</td>
                    <td >{{item.apiName}}</td>
                    <td >{{item.commitTime}}</td>
                    <td >{{formatter(item.applyStatus)}}</td>
                    <td @click="handleDetails(item)"><a href="#">查看详情</a></td>
                  </tr>
                </template>
              </table>
              <div class="tempEmpty" v-if="applyInfoList.length ==0"><span>暂无数据</span></div>
            </div>
            <div class="page" v-if="applyInfoList.length >0">
              <Page :total="params.total" :current="params.page" :page-size="form.pageSize" @on-change="changePage" />
            </div>
          </template>
        </div>

      </template>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {applyCheckList,applyApiList,applyMsgList} from "../../../api/review";
  import {formatAllTime,formatTime} from '../../../utils/tools'
  import loading from '../../../components/loading/loading'
  export default {
    data(){
      return{
        isLoading:false,
        form:{
          page:1,
          pageSize:10,
          applyCode:'',
          apiId:'',
          applyStatus:'',
          commitTime:'',
        },
        tempCommitTime:'',
        params:{
          total:'',
          page:'',
          pageSize:''
        },
        statusList:[
          {
            label:'待复核',
            value:'0'
          },
          {
            label:'已拒绝',
            value:'-1'
          },
          {
            label:'已复核',
            value:'1'
          }
        ],
        apiNameList:[],
        applyInfoList:[],
        // 消息
        // includes
        checkCodeList:[],
        commitCodeList:[]
      }
    },
    components:{
      loading
    },
    mounted(){
      this.updateNav('2')
      this.updateSider('2')
      this.handleApplyCheckList(this.form)
      this.hanldleApplyApiList()
      this.handleMsgList()
    },
    methods:{
      //获取API名称列表
      hanldleApplyApiList(){
        applyApiList().then((res) => {
          console.log(res);
          this.apiNameList = res.data
        })
      },
      //查询申请列表
      handleApplyCheckList(params){
        this.loading = true
        // this.form.commitTime = this.tempCommitTime
        applyCheckList(params).then((res) => {
          this.loading =false
          console.log(res);
          this.applyInfoList = res.data.applyInfoList
          this.applyInfoList.forEach((val,index,arr) => {
            arr[index].commitTime = formatAllTime(new Date(arr[index].commitTime))
          })
          this.params.total = res.data.total
          this.params.page = res.data.page
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
      // 查询
      handleSubmit(){
        console.log(this.form)
        // this.tempCommitTime = this.form.commitTime
        if(this.form.commitTime !== ''){
          this.form.commitTime = formatTime(this.form.commitTime)
        }
        // 清理数据
        if(this.form.applyCode ==undefined){
          this.form.applyCode =''
        }
        if(this.form.applyStatus ==undefined){
          this.form.applyStatus =''
        }
        if(this.form.commitTime ==undefined){
          this.form.commitTime =''
        }
        if(this.form.commitTime ==undefined){
          this.form.apiId =''
        }
        if(this.form.applyCode !=='' || this.form.applyStatus !=='' || this.form.commitTime !=='' || this.form.apiId !==''){
          this.handleApplyCheckList(this.form)
        }else{
          this.$Notice.warning({
            title:'请至少填入一项查询条件',
            duration:10
          })
          return false
        }

      },
      handleReset(name){
        this.$refs['applyForm'].resetFields();
        this.form ={
          applyCode:'',
          applyStatus:'',
          commitTime:'',
          apiId:'',
          page:1,
          pageSize:10,
        }
        this.handleApplyCheckList(this.form)
      },
      //查看详情
      handleDetails(item){
        console.log(item);
        this.$router.push({path:'/watingProcess/checkDetails',query:{detailsId:item.id,applyCode:item.applyCode}})
      },
      changePage(page){
        this.form.page = page
        this.handleApplyCheckList(this.form)
        console.log(page);
      },
      //消息
      handleMsgList(){
        applyMsgList().then((res) => {
          console.log(res);
          this.checkCodeList = res.data.checkCodeList
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
  @import "../myApply/index";
  .apply-message{
    display: inline-block;
    box-sizing: border-box;
    width: 30px;
    height: 16px;
    line-height: 16px;
    border: 1px solid #1585FF;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #1585FF;
    margin: 15px 10px 15px 0px;
    text-align: center;
  }
  .demo-spin-container{
    display: inline-block;
    position: relative;
  }
</style>
