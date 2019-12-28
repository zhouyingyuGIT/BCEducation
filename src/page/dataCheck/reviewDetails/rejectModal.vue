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
          <div class="my-reject-modal-body-box">
            <template>
              <Form  ref="rejectForm" :model="formItem" :rules="rule"  :label-width="90">
                <FormItem label="原因说明" prop="checkDesc">
                  <Input v-model="formItem.checkDesc" type="textarea"  placeholder="请输入原因,字数限制在200字以内"></Input>
                </FormItem>
                <FormItem>
                  <Button class="my-btn" @click="handleSubmit('rejectForm')">确定</Button>
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
  import {applyRefuse} from "../../../api/review";
  export default {
    data(){
      return{
        showModal:false,
        title:'',
        formItem:{
          id:'',
          checkDesc:''
        },
        rule:{
          checkDesc: [
            { required: true, message: '请输入原因说明', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //初始化
      init(title,params){
        this.showModal = true
        this.title = title
        this.formItem.id = params.id
        this.$refs['rejectForm'].resetFields();
      },
      // 确定
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const params = new FormData();
            params.append('id',this.formItem.id);
            params.append('checkDesc',this.formItem.checkDesc);
            applyRefuse(params).then((res) => {
              if(res.code ==10000){
                //通知父组件刷新
                this.$emit('refreshDetails')
                this.$Notice.success({
                  title:'提交成功',
                  duration:10
                })
                this.close()
              }
            })
          } else {
          }
        })
      },
      // 关闭
      close(){
        this.showModal = false
        this.$refs['rejectForm'].resetFields();
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
          .my-reject-modal-body-box{
            padding: 30px 33px 0px;
          }
          .my-modal-btn{
            margin: 14px 0px 0px
          }
        }

      }
    }
  }
</style>
