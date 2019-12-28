<template>
  <div>
    <div class="my-breadCrumb">当前位置: 首页 - 支持实体 - 支持实体列表信息</div>
    <div class="my-content">
      <h3 class="my-menu-name">支持实体信息列表</h3>
      <div class="my-list-table-box">
        <table class="my-list-table">
          <tr class="my-list-table-header">
            <th class="my-table-header1">支持实体列表</th>
            <th class="my-table-header2">描述</th>
          </tr>
          <template v-for="(item,index) in tableData" >
            <tr class="my-list-table-content listTable">
              <td class="toRoute" @click="toRoute(item)">{{item.name}}</td>
              <td  v-html="item.desc"></td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {getGroupMenu} from "../../api/group";
  import {readmsg} from "../../api/review";

  export default {
      data(){
        return{
          id:'',
          tableData:[
            // {
            //   name:'银行卡和账户情况查询',
            //   startTime: "2018-10-31T16:00:00.000+0000",
            //   desc:"1.查询(北京辖内)统计客户持有银行卡的总开立情况;<br/>2.查询(北京辖内)客户最近1,3,6个月内新开立和销户的银行卡数量;<br/>3.查询(北京辖内)统计客户在银行开立的账户数据,按银行类型(国有,股份,城商及其他银行)和账户类型(I类户,II类户,III类户)统计;<br/>4.查询(北京辖内)客户最近1,3,6个月内新开立和销户的账户数量。",
            //   path:'/bankApi'
            // }
          ]
        }
      },
      created(){
        // 消息
        readmsg()
        //console.log(this.$route.params.id)
        if(this.$route.params.id !==undefined){
          this.id = this.$route.params.id
          this.getMenuTable(this.id)
        }else{
          this.id = 2
          this.getMenuTable(this.id)
        }
      },
      methods:{
        getMenuTable(id) {
          getGroupMenu(id).then((res) => {
            this.tableData = res.data
          })
        },
        toRoute(row){
          this.$router.push({name: row.path,params:{startTime:row.startTime,endTime:row.endTime,id:row.id}})
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>
