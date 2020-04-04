<template>
  <div class="container">
<!--    <img class="background" src="../assets/images/login-bg.png" />-->
    <div class="login-con">
      <div>百川教育</div>
<!--      <img class="logo_img" src="../assets/images/logo.png">-->
      <Form ref="loginForm" class="login-form" :model="form" :rules="rules">
        <FormItem prop="username">
          <img src="../assets/images/user.png">
          <input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></input>
        </FormItem>
        <FormItem prop="password">
          <img src="../assets/images/pwd.png">
          <input type="password" v-model="form.password" autocomplete="off" placeholder="请输入登录密码"></input>
        </FormItem>
        <FormItem>
          <Button class="login-btn" @on-enter="handleSubmit('loginForm')" @click="handleSubmit('loginForm')" type="primary" long>立即登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import {login} from "../api/login";
  import {getUser ,getVerCode} from "../api/login";
  import {mapMutations} from 'vuex'
  // 消息
  import {applyMsgList} from "../api/review";
  // import { getUUID } from '@/utils'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
          ],

        }
      }
    },
    mounted(){},
    created () {},
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formdata = new FormData();
            formdata.append("username",this.form.username)
            formdata.append("password",this.form.password)
            login(formdata).then((res) => {
              if(res.code == 200){
                //登录成功 -- 跳转到首页
                this.$router.push('/index')
              } else {
                //登录失败-返回错误信息
                this.$Message.error(res.message);
              }
            })
          } else {
            //校验不通过
          }
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100vh;
    position: relative;
    .login-con {
      background: #1f7bde;
      text-align: center;
      margin: 0 auto;
      padding: 16px 0;
      transform: translateY(22%);
      border-radius: 10px;
      width: 500px;
      img.logo_img {
        /*margin-top: 100px;*/
        padding: 8px;
      }
      form {
        input.verCode {
          width: 240px;
        }
        img.codePng {
          cursor: pointer;
          border-radius: 5px;
          width: 140px;
          height: 50px;
          margin-left: 20px;
          vertical-align: middle;
          margin-top: 0px;
        }
        input {
          background: #0f2640;
          padding-left: 45px;
          border-radius: 5px;
          overflow: hidden;
          height: 50px;
          width: 400px;
          font-size: 14px;
          color: #9dadba;
          font-family: 微软雅黑;
          border: 0;
          outline: none;
        }
        img.verCode {
          width: 20px;
          height: 20px;
        }
        img {
          position: absolute;
          margin-left: 17px;
          margin-top: 14px;
        }

        /* WebKit browsers*/
        input::-webkit-input-placeholder {
          color:#777777 !important;
        }
        /* Mozilla Firefox 4 to 18*/
        input:-moz-placeholder {
          color:#777777 !important;
        }
        /* Mozilla Firefox 19+*/
        input::-moz-placeholder {
          color:#777777 !important;
        }
        /* Internet Explorer 10+*/
        input:-ms-input-placeholder {
          color:#777777 !important;
        }

        .ivu-form-item-error-tip {
          margin-left: 15px !important;
        }

      }
    }
    .login-btn{
      width: 400px;
      height: 52px;
      font-size: 16px;
      background: #f3b13e;
      color: #fff;
      font-weight: bold;
      border-radius: 5px;
      border: none;
      /*font-family: 微软雅黑;*/
      /*margin-bottom: 80px;*/
    }
  }

</style>
