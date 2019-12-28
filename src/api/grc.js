import fetch from '../utils/fetch'

export function getAccountOpen(params) {
  return fetch({
    url:'/api/account/open',
    data:params,
    method:'post'
  })
}

export function getAccountOpen6m(params) {
  return fetch({
    url:'/api/account/open6M',
    data:params,
    method:'post'
  })
}

export function getCardOpen(params) {
  return fetch({
    url:'/api/card/open',
    data:params,
    method:'post'
  })
}

export function getCardOpen6m(params) {
  return fetch({
    url:'/api/card/open6M',
    data:params,
    method:'post'
  })
}
