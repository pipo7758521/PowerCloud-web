import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    // url: '/userlogin.json',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    // url: '/user/info',
    url: '/userinfo.json',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
