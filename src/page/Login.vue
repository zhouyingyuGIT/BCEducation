<template>
  <div class="container">
    <div class="login-con">
      <div @click="handleLoginRegister(login_register)" class="lr">
        <img v-bind:src="login_register_src" alt="">
      </div>
      <Form v-show="login_register" ref="loginForm" class="login-form" :model="login" :rules="rules">
        <div class="logo">百川教育</div>
        <FormItem prop="username">
          <img src="../assets/images/user.png">
          <input v-model="login.username" placeholder="请输入手机号"></input>
        </FormItem>
        <FormItem prop="password">
          <img src="../assets/images/pwd.png">
          <input type="password" v-model="login.password" placeholder="请输入登录密码"></input>
        </FormItem>
        <FormItem>
          <Button class="login-btn" @on-enter="handleSubmit('loginForm')" @click="handleSubmit('loginForm')" type="primary" long>立即登录</Button>
        </FormItem>
      </Form>
      <Form v-show="!login_register" ref="registerForm" class="login-form" :model="register" :rules="registerRules">
        <div class="logo">注册</div>
        <FormItem prop="username">
          <img src="../assets/images/user.png">
          <input v-model="register.username" placeholder="请输入用户名"></input>
        </FormItem>
        <FormItem prop="phone">
          <img src="../assets/images/user.png">
          <input v-model="register.phone" placeholder="请输入手机号"></input>
        </FormItem>
        <FormItem prop="authCode">
          <div style="width: 400px;position:relative;margin: 0px auto;height: 38px;">
            <img src="../assets/images/pwd.png">
            <input style="width: 260px;position: absolute;left: 0px" v-model="register.authCode" autocomplete="off" placeholder="请输入短信验证码">
            </input>
            <Button :disabled="authCodeBtn" @click="verificationCode()" type="success" style="height: 38px;width: 120px;position: absolute;right: 0px;border-radius: 10px;">{{authCodeTitle}}</Button>
          </div>
        </FormItem>
        <FormItem prop="nickname">
          <img src="../assets/images/user.png">
          <input v-model="register.nickname" placeholder="请输入昵称"></input>
        </FormItem>
        <FormItem prop="password">
          <img src="../assets/images/pwd.png">
          <input type="password" v-model="register.password" placeholder="请输入密码"></input>
        </FormItem>
        <FormItem prop="password">
          <img src="../assets/images/pwd.png">
          <input type="password" v-model="password1" placeholder="再次输入密码"></input>
        </FormItem>
        <FormItem>
          <Button class="login-btn" @on-enter="handleRegister('registerForm')" @click="handleRegister('registerForm')" type="primary" long>注册</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import {login,getAuthCode,register} from "../api/login";
  import loginUrl from "../assets/logo/login.png";
  import registerUrl from "../assets/logo/register.png";
  import {mapMutations} from 'vuex'
  // 消息
  import {applyMsgList} from "../api/review";
  // import { getUUID } from '@/utils'
  export default {
    data() {
      return {
        login: {
          username: '',
          password: '',
        },
        login_register_src:registerUrl,
        authCodeBtn:false,
        authCodeTitle:"发送验证码",
        password1: '123456',
        register: {
          username: 'zhou',
          password: '123456',
          nickname:'周',
          phone: '18001157326',
          authCode:"1234"
        },
        login_register:true,
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入1登录密码', trigger: 'blur'},
          ],

        },
        registerRules: {
          username: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
          ],
          password1: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
          ],
          authCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
          ],

        }
      }
    },
    mounted(){},
    created () {},
    methods: {
      handleLoginRegister(data){
        console.log(data);
        if(data){
          this.login_register=false;
          this.login_register_src=loginUrl
        }else {
          this.login_register=true;
          this.login_register_src=registerUrl
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formdata = new FormData();
            formdata.append("username",this.login.username);
            formdata.append("password",this.login.password);
            login(formdata).then((res) => {
              if(res.code == 200){
                //登录成功 -- 跳转到首页
                console.log(res)
                localStorage.setItem("username",res.data.userName);
                // this.$router.push('/index')
              } else {
                //登录失败-返回错误信息
                this.$Message.error(res.message);
              }
            })
          } else {
            //校验不通过
          }
        })
      },
      handleRegister(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formdata = new FormData();
            formdata.append("username",this.register.username);
            formdata.append("password",this.register.password);
            formdata.append("nickname",this.register.nickname);
            formdata.append("phone",this.register.phone);
            formdata.append("authCode",this.register.authCode);
            register(formdata).then((res) => {
              console.log(res)
              if(res.code == 200){
                //登录成功 -- 跳转到首页
                this.$Message.success(res.message);
                this.login_register=false;
                // this.$router.push('/index')
              } else {
                //登录失败-返回错误信息
                this.$Message.error(res.message);
              }
            })
          } else {
            //校验不通过
          }
        })
      },
      verificationCode(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(!reg.test(this.register.phone)){
          this.$Notice.warning({
            title: '手机号码错误',
          });
        }else {
          var Code=this.register.phone;
          getAuthCode(Code).then((res) => {
            if(res.code == 200){
              this.authCodeBtn=true;
              this.authCodeTitle="60秒";
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    this.authCodeTitle=this.count+"秒"
                  } else {
                    this.authCodeBtn=false;
                    this.authCodeTitle="再次发送验证码";
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)

              }
            } else {
              //登录失败-返回错误信息
              this.$Message.error(res.message);
            }
          })

        }

      }
    }

  }
</script>

<style lang="scss" scoped>
  .ivu-form-item{
    width: 400px;
    margin: 0 auto 24px;
  }
  .ivu-form-item-error-tip{
    left: 60px !important;
  }
  .ivu-form-item-error-tip{
    left: 60px !important;
  }
  .container {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items:center;
    justify-content:center;
    .logo{
      font-size: 32px;
      padding: 18px 0;
      color: #fff;
      font-weight: 900;
    }
    .login-con {
      background: #1f7bde;
      text-align: center;
      margin: 0 auto;
      /*transform: translateY(10%);*/
      border-radius: 10px;
      width: 500px;
      position: relative;
      .lr{
        position: absolute;
        right: 0px;
        top: -1px;
        height: 60px;
        width: 60px;
        border-radius: 10px;
        cursor: pointer;
        img{
          max-height: 100%;
          max-width: 100%;
        }
      }
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
          height: 38px;
          margin-left: 20px;
          vertical-align: middle;
          margin-top: 0px;
        }
        input {
          padding-left: 45px;
          border-radius: 5px;
          overflow: hidden;
          height: 38px;
          width: 400px;
          font-size: 14px;
          color: #000;
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
          margin-top: 8px;
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
      background: #19be6b;
      color: #fff;
      font-weight: bold;
      border-radius: 5px;
      border: none;
      /*font-family: 微软雅黑;*/
      /*margin-bottom: 80px;*/
    }
  }

</style>
