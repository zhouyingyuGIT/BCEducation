<template>
  <div class="bg">
    <div class="my-breadCrumb">当前位置: 首页 - 风险合规</div>
      <div class="my-content">
        <h3 class="my-menu-name">风险合规</h3>
        <div class="my-list-table-box">
          <table class="my-list-table">
            <tr class="my-list-table-header">
              <th class="my-table-header1">风险合规API名称</th>
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
        id:'1',
        tableData:[]
      }
    },
    created(){
      // 消息
      readmsg()
      if(this.$route.params.id){
        this.id = this.$route.params.id
      }
      this.getMenuTable(this.id)
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
