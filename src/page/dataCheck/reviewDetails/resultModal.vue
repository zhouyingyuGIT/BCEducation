<template>
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
          <div class="my-modal-body-box">
            <template>
              <Form :label-width="80">
                <FormItem label="核实结果" v-if="formItem.applyStatus ==1">
                  <RadioGroup v-model="checkResult">
                    <Radio label="1" :disabled="checkResult !='1'">结果与本行数据一致</Radio>
                    <Radio label="-1" :disabled="checkResult !='-1'">结果与本行数据不一致</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="原因说明">
                  <span class="reason">{{checkDesc}}</span>
                </FormItem>
                <FormItem label="附件" v-if="formItem.applyStatus ==1">
                  <ul class="downloadList">
                    <li v-if="checkFileInfoList.length ==0">暂无附件</li>
                    <li v-for="(item,index) in checkFileInfoList" :key="index">
                      <p>{{item.fileName}}</p><a href="#" @click="handleDownload(item)">下载</a>
                    </li>
                  </ul>
                </FormItem>
              </Form>
              <div class="my-modal-btn" @click="close">
                <Button class="my-btn">取消</Button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {applyResult,applyFiledownload} from "../../../api/review";
    export default {
      data(){
        return{
          showModal:false,
          title:'',
          formItem:{
            applyStatus:'',
          },
          checkResult:'1',
          checkDesc:'',
          checkFileInfoList:[],
          id:'', //按ID查询结果
          fileName:''
        }
      },
      methods:{
        init(title,params){
          this.showModal = true
          this.title = title
          this.handleApplyResult(params.id)
        },
        handleApplyResult(params){
          applyResult(params).then((res) => {
            console.log(res);
            this.formItem = res.data
            this.checkDesc = res.data.checkDesc
            this.checkResult = res.data.checkResult.toString()
            this.checkFileInfoList = res.data.checkFileInfoList
          })
        },
        handleDownload(item){
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
    .my-modal-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 999;
      background: #EEF0F8;
      border-radius: 5px;
      .my-modal-content{
        width: 650px;
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
           .my-modal-body-box{
             padding: 30px 33px 0px;
             .reason{
               display: inline-block;
               box-sizing: border-box;
               width: 470px;
               height: 222px;
               padding:10px 15px;
               overflow-y: auto;
               text-align: left;
               background: #F8FAFF;
               border: 1px solid #D7DAE3;
               border-radius: 3px;
               font-family: PingFangSC-Regular;
               font-size: 16px;
               color: #62717E;
               line-height: 26px;
               word-break: break-all;
             }
             .downloadList{
               box-sizing: border-box;
               width: 470px;
               height: 182px;
               padding:10px 15px;
               /*overflow-y: scroll;*/
               background: #F8FAFF;
               border: 1px solid #D7DAE3;
               border-radius: 3px;
               font-family: PingFangTC-Regular;
               font-size: 16px;
               color: #62717E;
               /*line-height: 35px;*/
               li{
                 display: flex;
                 flex-direction: row;
                 justify-content: space-between;
                 p{
                   overflow: hidden;
                   text-overflow:ellipsis;
                   white-space: nowrap;
                 }
                 a{
                   width: 80px;
                   text-align: center;
                 }
                 &:hover{
                   cursor: pointer;
                 }
                 a{
                   cursor: pointer;
                 }
               }
             }
           }
        }
        .my-modal-btn{
          margin-left: 80px;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
