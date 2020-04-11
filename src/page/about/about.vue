<template>
  <div class="about">
    <div class="box ft">
      <div >
        <Row>
          <i-col span="20" offset="2">
            <div class="title">公司介绍</div>
            <div class="itemBox">
              <p>1.	庞大的教学资源--开放式的资源平台，全国范围内共享。</p>
              <p>2.	安全的就学通道--不用担心招生诈骗，就学陷阱，在启点百川网上，权威的第三方信用网站，让求学招生路畅通。</p>
              <p>3.	精心组织的教学材料--内容更科学，风格简单易读，有明确的教学目标。</p>
              <p>4.	教学全方位训练--写作、句型、语法知识题型同步更新。</p>
              <p>5.	启点百川教育--让学习更有趣。</p>
            </div>
          </i-col>
        </Row>
      </div>

      <img class="img" src="../../assets/ft.png" alt="">
    </div>
    <div class="box fr">
      <div >
        <Row>
          <i-col span="20" offset="2">
            <div class="title">联系我们</div>
          </i-col>
        </Row>
      </div>

      <img class="img" src="../../assets/fr.png" alt="">
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
        /*readmsg()
        //console.log(this.$route.params.id)
        if(this.$route.params.id !==undefined){
          this.id = this.$route.params.id
          this.getMenuTable(this.id)
        }else{
          this.id = 2
          this.getMenuTable(this.id)
        }*/
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
  .about{
    font-size: 12px;
    background: #fff;
    min-height: 600px;
    width: 100%;
    .box{
      position: relative;
      padding-bottom: 40px;
      .img{
        width: 100%;
        z-index: 999;
        height: 80px;
        position: absolute;
        bottom: -40px;
        margin-top: 40px;
      }
      .title{
        padding: 36px 0px 0px;
        font-size: 2em;
        font-weight: 900;
      }
      .itemBox{
        padding: 16px 16px;
        font-size: 1.4em;
        line-height: 28px;
        p{
          line-height: 28px;
          text-indent: 2em;
          margin-bottom: 8px;
        }
      }
    }
    .ft{
      background: #fff;
    }
    .fr{
      background: #eee;
    }
  }
</style>
