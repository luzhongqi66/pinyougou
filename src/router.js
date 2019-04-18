import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import kuangjia from '@/views/kuangjia.vue'
import users from '@/views/yonghuliebiao/yonghuliebiao.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: kuangjia,
      children: [
        { path: '', component: home, },
        { path: '/users', component: users }
      ]
    }
  ],

})

router.beforeEach((to, from, next) => {

  if (to === '/login') {
    return next()
  }

  const token = window.localStorage.getItem('token')

  if (!token) {
    return next('/login')
  }

  next()

})

export default router
