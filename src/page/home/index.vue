<template>
  <div>
    <Carousel style="height: 500px" autoplay v-model="value2" loop>
      <CarouselItem>
        <div class="demo-carousel">
          <img style="height: 100%;width: 100%" src="../../assets/img/logo1.jpg" alt="">
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img style="height: 100%;width: 100%" src="../../assets/img/logo2.jpg" alt="">
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img style="height: 100%;width: 100%" src="../../assets/img/logo3.jpg" alt=""></div>
      </CarouselItem>
    </Carousel>

    <div class="product">
      <div class="title">产品介绍</div>
      <Row>
        <Col class="item" span="6"  offset="9">
          <Card class="box">
            <div @click="handleDownload(product[0])" style="width: 100%;height: 100%">
              <div class="img">
                <img src="../../assets/index/eng.png" alt="">
              </div>
              <div class="title">启点英语</div>
              <p class="introduce">启点英语是为了解决哑巴英语而诞生</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

    <div class="indexBox">
      <div class="title">为学生提供“3”大支撑</div>
      <div class="describe">百川教育全面革新英语教学模式，线上线下相结合，构筑智能英语学习生态</div>

      <Row>
        <Col span="18" offset="3">
          <Row>
            <Col span="6" class="item">
              <div class="imgBox">
                <img src="../../assets/index/pinpai.png" alt="">
              </div>
              <p class="title">品牌升级</p>
              <p class="cont">线上线下结合，全面实现互联网+</p>
            </Col>
            <Col span="6" offset="3" class="item">
              <div class="imgBox">
                <img src="../../assets/index/cont.png" alt="">
              </div>
              <p class="title">内容深度定制</p>
              <p class="cont">根据机构教材定制，实现课堂、课后无缝衔接</p>
            </Col>
            <Col span="6" offset="3" class="item">
              <div class="imgBox">
                <img src="../../assets/index/yuyin.png" alt="">
              </div>
              <p class="title">智能语音评测</p>
              <p class="cont">科大讯飞评测技术，对接中高考口语标准</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

    <div class="">

    </div>



    <Modal
      :title="download.title"
      v-model="modalDownload"
      class-name="vertical-center-modal">
      <p>
        <Row>
          <Col span="12">
            <div @click="handleDownloadSoftware(download.windowsUrl)" class="download">
              <div class="imgBox">
                <img src="../../assets/index/windows.png" alt="">
              </div>
              <div class="title">windows下载</div>
            </div>
          </Col>
          <Col span="12" style="text-align: center">
            <div @click="handleDownloadSoftware(download.iosUrl)" class="download">
              <div class="imgBox">
                <img src="../../assets/index/iOS.png" alt="">
              </div>
              <div class="title">ios下载</div>
            </div>
          </Col>
        </Row>
      </p>
    </Modal>
  </div>
</template>

<script>
  import {getGroupMenu} from "../../api/group";
   import {readmsg} from "../../api/review";

  export default {
    data(){
      return{
        value2:0,
        modalDownload:false,
        tableData:[],
        download:{
          title:"启点英语",
          windowsUrl:"",
          iosUrl:""
        },
        product:[
          {
            title:"启点英语",
            windowsUrl:"windowsUrl",
            iosUrl:""
          }
        ]
      }
    },
    created(){
      // 消息

    },
    methods:{
      handleDownload(data){
        console.log(data);
        this.download.title=data.title+"下载";
        this.download.windowsUrl=data.windowsUrl;
        this.download.iosUrl=data.iosUrl;
        // this.Title=data.title+"下载";
        this.modalDownload=true;
      },

      handleDownloadSoftware(data){
        if(data.length==0){
          this.$Notice.warning({
            title: '开发中',
          });
        }

        this.modalDownload=false;
      }
    }
  }
</script>

<style lang="scss" scoped>
.demo-carousel{
  height: 500px;
  width: 100%;
}
  .product{
    width: 100%;
    background: #f7f8fd;
    font-size: 12px;
    padding: 60px 0;
    .title{
      font-size: 2.8em;
      padding-bottom: 16px;
      text-align: center;
      color: #000;
      font-family: PingFang SC,MicrosoftYaHei,arial,sans-serif;
    }
    .item{

      height: 340px;
      border-radius: 5px;
      .box{
        background: #fff;
        width: 90%;
        height: 100%;
        cursor: pointer;
        margin: 0 auto;
        .img{
          height: 180px;
          width: 100%;
          display: flex;
          align-items:center;
          justify-content:center;
          img{
            max-height: 80%;
            max-width: 80%;
          }
        }

        .title{
          padding: 16px 32px 16px;
          text-align: center;
          font-size: 1.6em;
          color: #2d8cd3;
          font-weight: 900;
        }

        .introduce{
          padding: 0px 32px 32px;
          font-size: 1.2em;
          line-height: 1.4em;
          text-indent: 2em;
          font-family: "楷体";
        }
      }
    }
  }
  .download{
    width: 60%;
    margin: 0 auto;
    height: 140px;
    cursor: pointer;
    .imgBox{
      height: 100px;
      width: 90%;
      margin: 0 auto;
      display: flex;
      align-items:center;
      justify-content:center;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .title{
      line-height: 40px;
      text-align: center;
      font-size: 1.6em;
    }

  }
  .indexBox{
    padding: 48px 0px;
    background: #fff;
    font-size: 12px;
    .title{
      font-size: 2.4em;
      text-align: center;
      line-height: 1.2em;
      margin-bottom: 32px;
      font-weight: 900;
    }
    .describe{
      text-align: center;
      font-size: 1.6em;
      margin-bottom: 48px;
    }
    .item{
      /*background: #2d8cd3;*/
      height: 300px;
      .imgBox{
        height: 120px;
        width: 100%;
        text-align: center;
        margin-bottom: 18px;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      .title{
        font-size: 2em;
        color: #000;
        font-weight: 900;
        margin-bottom: 16px;
      }
      .cont{
        padding: 0 16px;
        text-align: center;
        font-size: 1.6em;
      }
    }
  }
</style>
