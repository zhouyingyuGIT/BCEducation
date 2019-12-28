export   function formatDate(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if(month<10){
    month="0"+month;
  }
  if(date<10){
    date="0"+date;
  }
  return year  + month  + date;
}

export  function formatMonth(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if(month<10){
    month="0"+month;
  }
  if(date<10){
    date="0"+date;
  }
  return year.toString()  +  month;
}

export function format(now) {
  var now= new Date(now)
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  if(month<10){
    month="0"+month;
  }
  if(date<10){
    date="0"+date;
  }
  return year + '年' + month + '月';
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('')
}

export function formatAllTime(date,type) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(!type){
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }else{
    return [year, month, day].map(formatNumber).join('-')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

