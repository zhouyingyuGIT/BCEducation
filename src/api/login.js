import  fetch from '../utils/fetch'

export function login(params) {
  return fetch({
    url:`/api/sso/login`,
    method:'post',
    data:params
  })
}

export function getUser() {
  return fetch({
    url:`/api/sys/user`,
    method: 'get'
  })
}

/*修改密码*/
export function confirmPassword(params) {
  return fetch({
    url:`/api/sys/password`,
    method:'post',
    data:params
  })
}

// 反馈
export  function feedback(params) {
  return fetch({
    url:`/api/feedBack/add`,
    method:'post',
    data:params
  })
}
