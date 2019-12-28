<template>
  <div class="set">
    <my-modal :title="title">
      <div slot="my-modal-body">
        <template>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="130">
            <FormItem label="当前用户:" prop="username">
              <Input class="resets-input" type="text" autocomplete="off" v-model="formCustom.username" disabled/>
            </FormItem>
            <FormItem label="账户密码:" prop="oldPasswd">
              <Input class="resets-input" type="password" autocomplete="off" v-model="formCustom.oldPasswd"/>
            </FormItem>
            <FormItem label="新密码:" prop="passwd">
              <Input class="resets-input" type="password" autocomplete="off" v-model="formCustom.passwd"/>
            </FormItem>
            <FormItem label="确认新密码:" prop="passwdCheck">
              <Input class="resets-input" type="password" autocomplete="off" v-model="formCustom.passwdCheck"/>
            </FormItem>
            <FormItem>
              <Button class="my-btn handle" @click="handleSubmit('formCustom')">确认修改</Button>
              <Button class="my-btn" @click="handleReset('formCustom')">重置</Button>
            </FormItem>
          </Form>
        </template>
      </div>
    </my-modal>
  </div>
</template>

<script>
  import myModal from './MyModal'
  export default {
    data(){
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码!'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码!'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入的新密码不一致!'));
        } else {
          callback();
        }
      };
      const validateOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空!'));
        } else {
          callback();
        }
      };
      return{
        title:'修改密码',
        formCustom: {
          username: sessionStorage.getItem('username'),
          oldPasswd: '',
          passwd: '',
          passwdCheck: '',
        },
        ruleCustom: {
          oldPasswd: [
            {required: true,validator: validateOldPass, trigger: 'blur'}
          ],
          passwd: [
            {required: true,validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {required: true,validator: validatePassCheck, trigger: 'blur'}
          ],
        },
      }
    },
    components:{
      myModal
    },
    methods:{
      // 修改密码
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            const params = {
              oldPassword: this.formCustom.oldPasswd,
              newPassword: this.formCustom.passwd
            }
          } else {
            // this.$Message.error('Fail!');
          }
        })
      },
      // 取消
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style lang="scss">
  .set{
    .my-modal-body{
      margin: 20px 0px  0px 35px;
      .ivu-form-item:last-child{
        margin-bottom: 0;
      }
    }
    .ivu-form  .ivu-form-item-label{
      line-height: 1;
      color:#abd0ff;
    }
    .resets-input .ivu-input{
      width: 350px;
      height: 40px;
    }
  }
</style>
