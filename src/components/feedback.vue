<template>
  <div class="feedback">
    <Modal
      v-model="visible"
      footer-hide
      class-name="vertical-center-modal"
      :mask-closable="false">
      <div class="feedback-modal" slot="header"><img src="../../static/img/feedback.png" alt="">反馈意见</div>
      <Form class="feedback-form" ref="feedback-form" :model="formValidate" :rules="ruleValidate" :label-width="130">
        <FormItem label="联系方式" prop="contact">
<!--          <input ref="myInput" class="my-input feedback-input" type="text" v-model="formValidate.contact"-->
<!--                 placeholder="请输入身份证号码">-->
          <Input class="feedback-input" v-model="formValidate.contact" autocomplete="off" placeholder="请输入身份证号码"></Input>
        </FormItem>
        <FormItem label="反馈内容" prop="content">
          <Input v-model="formValidate.content" class="feedback-textarea" autocomplete="off" type="textarea"placeholder="请填写需要反馈的内容"></Input>
<!--          <textarea class="feedback-textarea" v-model="formValidate.content" placeholder="请填写需要反馈的内容">-->
<!--         </textarea>-->
        </FormItem>
        <FormItem class="handle-top">
          <button type="button" class="my-btn handle" @click="handleSubmit('feedback-form')">提交</button>
          <button  type="button" class="my-btn" @click="handleCancel('feedback-form')">取消</button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
    import {feedback} from "../api/login";

    export default {
      data(){
        return {
          visible:false,
          formValidate: {
            contact: '',
            content: ''
          },
          ruleValidate: {
            contact: [
              {required: true, message: '请输入身份证号码', trigger: 'blur'}
            ],
            content: [
              {required: true, message: '请填写需要反馈的内容', trigger: 'blur'}
            ],
          }
        }
      },
      methods:{
        init(){
          this.visible = true
          this.$refs['feedback-form'].resetFields()
        },
        handleSubmit(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              let params = {
                contact:this.formValidate.contact,
                content:this.formValidate.contact
              }
              feedback(params).then((res) => {
                if(res.code == 10000){
                  this.visible = false
                  this.$Notice.success({
                    title: '反馈提交成功',
                  });
                  //this.$Message.success('反馈提交成功！')
                }else{
                  this.visible = false
                }
              })
            } else {
              return
              //this.$Message.error('Fail!');
            }
          })
        },
        handleCancel(name){
          this.$refs[name].resetFields()
          this.visible = false
        }
      }
    }
</script>

<style lang="scss">
  textarea::-webkit-input-placeholder {
    color: #999 !important;
  }


  /*为使和input对齐*/
  .ivu-form .ivu-form-item-label {
    line-height: 2;
  }
  .feedback-modal {
    font-family: PingFangTC-Regular;
    font-size: 22px;
    color: #444444;
    img{
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 10px;
      margin-top: -6px;
    }
  }
  .feedback-form{
    margin-top: 20px;
  }
  .feedback-input input{
    width: 92% !important;
  }

  .feedback-textarea textarea{
    display: inline-block;
    width: 92%;
    min-height: 220px;
    background: #FAFAFA;
    border: 1px solid #E4E4E4;
    border-radius: 3px;
    padding: 10px 10px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #999999;
    outline: none;
  }
  .handle-top{
    padding-top: 20px;
    margin-bottom: 20px;
  }

</style>
