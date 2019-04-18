import request from '@/axios/request.js'

export const cebianlan = () => {
  return request({
    method: 'get',
    url: '/menus'
  }).then(res => res.data)
}
