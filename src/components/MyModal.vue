<!--<template>-->
<!--<div class="my-modal" v-show="showModal">-->
<!--      <div class="my-modal-wrapper">-->
<!--          <div class="my-modal-content">-->
<!--            <div class="my-modal-header">-->
<!--              <h3>{{title}}</h3>-->
<!--              <img @click="close" src="../assets/images/guanbi.png" alt="">-->
<!--            </div>-->
<!--            <div class="my-modal-body">-->
<!--              <slot name="my-modal-body"></slot>-->
<!--            </div>-->
<!--            <div class="my-modal-footer">-->
<!--              <slot name="my-modal-footer"></slot>-->
<!--            </div>-->
<!--          </div>-->
<!--      </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "MyModal",-->
<!--        props:{-->
<!--          title:{-->
<!--            type:String,-->
<!--            default:''-->
<!--          }-->
<!--        },-->
<!--        data(){-->
<!--          return{-->
<!--            showModal:true,-->
<!--          }-->
<!--        },-->
<!--        methods:{-->
<!--          close(){-->
<!--            this.showModal = false-->
<!--          }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="scss">-->
<!--.my-modal{-->
<!--  position: fixed;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  top: 0;-->
<!--  bottom: 0;-->
<!--  z-index: 998;-->
<!--  background: rgba(0, 0, 0, 0.3);-->
<!--  .my-modal-wrapper{-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%,-50%);-->
<!--    z-index: 999;-->
<!--    background: rgb(0,0,0);-->
<!--    .my-modal-content{-->
<!--      width: 600px;-->
<!--      padding: 40px 30px;-->
<!--      .my-modal-header{-->
<!--        font-size: 22px;-->
<!--        font-weight: 700;-->
<!--        background: -webkit-gradient(linear,left top,left bottom,from(#fff),to(#3587ff));-->
<!--        -webkit-background-clip: text;-->
<!--        color: transparent;-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--        img{-->
<!--          width: 30px;-->
<!--          height: 30px;-->
<!--          cursor: pointer;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
