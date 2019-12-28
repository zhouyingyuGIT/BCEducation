<template>
  <div class="container">
    <div id="timeline">
      <div class="timeline-item" v-for="(item ,i) in dataList">
        <div v-if="i%2 !==0">
          <div class="timeline-icon"></div>
          <div class="timeline-content">
            <p>{{item.date}}</p>
            <span>{{item.desc}}</span>
          </div>
        </div>
        <div v-else>
          <div class="timeline-icon"></div>
          <div class="timeline-content right">
            <p>{{item.date}}</p>
            <span>{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "timeAxis",
      data() {
        return {

        }
      },
      props:['dataList']
    }
</script>

<style scoped>
  #timeline .timeline-item:after,#timeline .timeline-item:before {
    content: '';
    display: block;
    width: 100%;
    clear: both;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
  #timeline {
    width: 80%;
    margin: 30px auto;
    position: relative;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -ms-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }
  #timeline:before {
    content: "";
    width: 1px;
    height: 100%;
    background: #eee;
    left: 50%;
    top: 0;
    position: absolute;
  }
  #timeline:after {
    content: "";
    clear: both;
    display: table;
    width: 100%
  }
  #timeline .timeline-item {
    margin-bottom: 1px;
    position: relative;
  }
  #timeline .timeline-item .timeline-icon {
    /*background: #eee;*/
    background: #FFFFFF;
    border: 1px solid #DFDFDF;
    width: 17px;
    height: 17px;
    position: absolute;
    top: 20px;
    left: 52%;
    overflow: hidden;
    margin-left: -22px;
    border-radius: 50%;
  }
  #timeline .timeline-item .timeline-content {
    width: 45%;
    /*background: #eee;*/
    padding: 15px;
    -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    border-radius: 5px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;
    text-align: left;
    background: #FAFAFA;
    border: 1px solid #E5E5E5;
  }
  #timeline .timeline-item .timeline-content p {
    /*font-size: 18px;*/
    /*font-weight: 500;*/
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #666666;
    line-height: 30px;
  }
  #timeline .timeline-item .timeline-content span {
    /*font-size: 16px;*/
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #77797F;
    line-height: 30px;
  }
  #timeline .timeline-item .timeline-content:before {
    content: '';
    position: absolute;
    left: 45%;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 7px solid #E5E5E5;
  }
  #timeline .timeline-item .timeline-content.right {
    float: right;
  }
  #timeline .timeline-item .timeline-content.right:before {
    content: '';
    right: 45%;
    left: inherit;
    border-left: 0;
    border-right: 7px solid #E5E5E5;
  }


</style>
