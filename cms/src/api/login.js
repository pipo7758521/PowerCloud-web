import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login?account='+username+'&password='+password,
    // url: '/userlogin.json',
    method: 'post',
    /*data: {
      username,
      password
    }*/
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserInfo',
    // url: '/userinfo.json',
    method: 'post',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
