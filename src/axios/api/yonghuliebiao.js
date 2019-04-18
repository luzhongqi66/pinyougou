import request from '@/axios/request.js'

export const duqu = () => {
  return request({
    method: 'get',
    url: '/users',
    params: {
      pagenum: 1,
      pagesize: 10
    }
  }).then(res => res.data)
}

export const handstate = (item) => {
  return request({
    method: 'put',
    url: `/users/${item.id}/state/${item.mg_state}`
  }).then(res => res.data)
}

export const handadduser = (usersdata) => {
  return request({
    method: 'post',
    url: '/users',
    data: {
      username: usersdata.username,
      password: usersdata.password,
      email: usersdata.email,
      mobile: usersdata.mobile
    }
  }).then(res => res.data)
}

export const deleteur = (id) => {
  return request({
    method: 'delete',
    url: `/users/${id}`,
  }).then(res => res.data)
}

export const edit = (data) => {
  return request({
    method: 'put',
    url: `/users/${data.id}`,
    data: {
      email: data.email,
      mobile: data.mobile
    }

  }).then(res => res.data)
}

export const idAssignroles = (id) => {
  return request({
    method: 'get',
    url: `users/${id}`
  }).then(res => res.data)
}

export const getroleslist = () => {
  return request({
    method: 'get',
    url: '/rolse'
  }).then(res => res.data)
}
