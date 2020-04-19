<template>
  <div class="resetPassword">
    <Modal title="修改密码" v-model="passwordModal" :mask-closable="false">
      <div slot="header" style="color:#444444;text-align:left;font-size: 22px">
        <Icon type="md-lock"/>
        <span>修改密码</span>
      </div>
      <div class="reset-box">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
          <FormItem label="当前用户:" prop="username">
            <Input class="reset-input" type="text" autocomplete="off" v-model="formCustom.username" disabled/>
          </FormItem>
          <FormItem label="账户密码:" prop="oldPasswd">
            <Input class="reset-input" type="password" autocomplete="off" v-model="formCustom.oldPasswd"/>
          </FormItem>
          <FormItem label="新密码:" prop="passwd">
            <Input class="reset-input" type="password" autocomplete="off" v-model="formCustom.passwd"/>
          </FormItem>
          <FormItem label="确认新密码:" prop="passwdCheck">
            <Input class="reset-input" type="password" autocomplete="off" v-model="formCustom.passwdCheck"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center;">
        <Row :gutter="16">
          <Col span="12">
            <Button type="primary" :loading="modal_loading" @click="handleSubmit('formCustom')">
              <span v-if="!modal_loading"><Icon type="ios-checkmark"/>确认修改</span>
              <span v-else><Icon type="ios-checkmark"/>提交中</span>
            </Button>
          </Col>
          <Col span="12">
            <Button type="primary" @click="handleReset('formCustom')">
              <Icon type="ios-refresh"/>
              重置
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {confirmPassword} from "../api/login";
  import { Notice } from 'iview'
  export default {
    name: "resetPassword",
    data() {
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
      return {
        passwordModal: false,
        modal_loading: false,
        formCustom: {
          username: sessionStorage.getItem('username'),
          oldPasswd: '',
          passwd: '',
          passwdCheck: '',
        },
        ruleCustom: {
          oldPasswd: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      init() {
        this.passwordModal = true
        this.$refs['formCustom'].resetFields()
      },
      // 修改密码
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            const params = {
              oldPassword: this.formCustom.oldPasswd,
              newPassword: this.formCustom.passwd
            }
            confirmPassword(params).then(res => {
              console.log(res);
              if (res.status === '10000') {
                this.modal_loading = false;
                Notice.success({
                  title: '密码修改成功!',
                  duration: 10
                })
                //this.$Message.success('密码修改成功!');
                this.passwordModal = false;
                this.handleReset('formCustom');
              } else {
                this.modal_loading = false;
              }
            })
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

<style>
  .reset-box {
    text-align: left;
    margin-top: 20px;
  }

  .reset-input input {
    width: 85%;
  }
</style>
