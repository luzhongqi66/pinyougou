import request from '@/axios/request.js'

export const readuesrdata = ({ username, password }) => {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  }).then(res => res.data)
}
