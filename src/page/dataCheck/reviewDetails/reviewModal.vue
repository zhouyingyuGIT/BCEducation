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
          <div class="my-review-body-box">
            <template>
              <Form ref="reviewForm" :model="formItem" :rules="rule" :label-width="90">
                <FormItem label="核实结果" prop="checkResult">
                  <RadioGroup v-model="formItem.checkResult">
                    <Radio label="1">结果与本行数据一致</Radio>
                    <Radio label="-1">结果与本行数据不一致</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="原因说明" prop="checkDesc">
                    <Input v-model="formItem.checkDesc" type="textarea"  placeholder="请输入原因说明,字数限制在200字以内"></Input>
                </FormItem>
                <FormItem label="上传附件">
                  <ul class="downloadList">
                    <li v-for="(item,index) in uploadList" :key="index"><p>{{item.name}}</p>
                      <Icon class="trash" type="ios-trash-outline" @click="handleRemove(index)" /></li>
                    <div class="uploda-small">
                      <Upload
                        ref="upload"
                        multiple
                        type="drag"
                        :show-upload-list='isShow'
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="handleBeforeUpload"
                        action="#">
                        <div class="handle-box">
                          <Button class="my-reset-btn">添加</Button>
                        </div>
                      </Upload>
                      <Button class="my-reset-btn clear" @click="handleClearUploadFile">清空</Button>
                    </div>
                  </ul>
                </FormItem>
                <FormItem label="核实结果">
                  <Button :loading="submitLoading" class="my-btn" @click="handleSubmit('reviewForm')">{{submitLoading ? '提交中' : '确定'}}</Button>
                  <Button class="my-reset-btn" @click="close">取消</Button>
                </FormItem>
              </Form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {applyCheck} from "../../../api/review";

  export default {
    data(){
      return{
        showModal:false,
        title:'',
        isShow:false,
        formItem:{
          id:'',
          checkResult:'',//-1 不一致;1一致
          checkDesc:''
        },
        uploadList:[],
        submitLoading:false,
        rule:{
          checkResult: [
            {required: true, message: '请选择结果', trigger: 'change'}
          ],
          checkDesc: [
            { required: true, message: '请输入原因说明', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      // 初始化
      init(title,params){
        this.showModal = true
        this.title = title
        this.formItem.id = params.id
        this.$refs['reviewForm'].resetFields();
      },
      // 关闭
      close(){
        this.showModal = false
        this.$refs['reviewForm'].resetFields();
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            const params = new FormData();
            params.append('id',this.formItem.id);
            params.append('checkResult',this.formItem.checkResult);
            params.append('checkDesc',this.formItem.checkDesc);
            //多个文件上传
            console.log(this.uploadList)
            for(var i=0; i< this.uploadList.length; i++){
              params.append("files",this.uploadList[i]);   // 文件对象
            }
            this.handleApplyCheck(params)
          } else {
            return false
          }
        })

      },
      handleApplyCheck(params){
        this.submitLoading = true
        applyCheck(params).then((res) => {
          console.log(res);
          this.submitLoading = false
          if(res.code ==10000){
            this.$Notice.success({
              title:'提交复核成功',
              duration:10
            })
            this.close()
            //通知父组件刷新
            this.$emit('refreshDetails')
          }
        })
      },
      //上传文件之前的处理
      handleBeforeUpload (file) {
        console.log(file)
        let arry_ = file.name.split('.');
        if(file.size < 2*1024*1024){
          if (arry_[arry_.length-1] === 'xls' || 'rar' ||'zip' || 'doc' || 'docx' || 'xlsx' || 'xls' ||'jpg' || 'png' ) {
            let that = this;
            if(that.uploadList.length >= 5){
              this.$Notice.warning({
                title: '最多只能上传5个文件',
                duration: 10
              })
            }else{
              that.uploadList.push(file);
            }
          } else {
            this.$Notice.error({
              title: '文件格式不正确',
              duration: 10
            })
            return false;
          }
        }else{
          this.$Notice.error({
            title: file.name + '文件大小不能超过2M',
            duration: 10
          })
        }
        return false;
      },
      //文件列表移除文件
      handleRemove(index){
        let that = this;
        that.uploadList.splice(index, 1);
      },
      // 清空上传文件列表
      handleClearUploadFile(){
        this.uploadList = []
      },
      // 清空
      clear(){

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
          .my-review-body-box{
            padding: 30px 33px 0px;
            .reason{
              display: inline-block;
              box-sizing: border-box;
              width: 470px;
              height: 182px;
              padding:10px 15px;
              overflow-y: scroll;
              text-align: left;
              background: #F8FAFF;
              border: 1px solid #D7DAE3;
              border-radius: 3px;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #62717E;
              line-height: 26px;
            }
            .downloadList{
              box-sizing: border-box;
              width: 470px;
              height: 182px;
              padding:10px 0px;
              /*overflow-y: scroll;*/
              background: #F8FAFF;
              border: 1px solid #D7DAE3;
              border-radius: 3px;
              font-family: PingFangTC-Regular;
              font-size: 16px;
              color: #62717E;
              line-height: 25px;
              li{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0px 15px;
                cursor: pointer;
                p{
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
                .trash{
                  width: 30px;
                }
                &:hover{
                  background: #E6F2FF;
                  border-radius: 2px;
                  p{
                    font-family: PingFangTC-Regular;
                    font-size: 16px;
                    color: #1585FF;
                  }
                  .trash{
                    color: #1585FF;
                  }
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
