import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/conf/config'
import store from '@/store'
import auth from '@/module/auth'
import router from '@/router'
import statistics from '@/module/statistics'

import SystemError from '@/components/controller/error/SystemError'
import BadRequest from '@/components/controller/error/BadRequest'
import SessionTimeOut from '@/components/controller/error/SessionTimeOut'
import Index from '@/components/controller/index/Index'
import Login from '@/components/controller/login/Login'
import StaffList from '@/components/controller/staff/StaffList'
import StaffEdit from '@/components/controller/staff/StaffEdit'
import StaffDetail from '@/components/controller/staff/StaffDetail'
import StaffRegister from '@/components/controller/staff/StaffRegister'
import PasswordEdit from '@/components/controller/staff/PasswordEdit'
import CodeList from '@/components/controller/code/CodeList'
import CodeDetail from '@/components/controller/code/CodeDetail'
import CodeEdit from '@/components/controller/code/CodeEdit'
import CodeRegister from '@/components/controller/code/CodeRegister'

Vue.use(Router)

const StateRoot = store.state

export default new Router({
  routes: [
    {
      path: Config.SYSERR_PATH,
      name: 'SystemError',
      component: SystemError
    },
    {
      path: Config.SESSION_TIMEOUT_PATH,
      name: 'SessionTimeOut',
      component: SessionTimeOut
    },
    {
      path: Config.BAD_REQUEST_PATH,
      name: 'BadRequest',
      component: BadRequest
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: Config.LOGIN_PATH,
      name: 'Login',
      component: Login
    },
    {
      path: Config.LOGOUT_PATH,
      name: 'Logout',
    },
    {
      path: Config.EDIT_PASSWORD,
      name: 'PasswordEdit',
      component: PasswordEdit
    },
    {
      path: StateRoot.staff.listPath,
      name: 'StaffList',
      component: StaffList
    },
    {
      path: StateRoot.staff.editPath,
      name: 'StaffEdit',
      component: StaffEdit
    },
    {
      path: StateRoot.staff.detailPath + "/:id",
      name: 'StaffDetail',
      component: StaffDetail
    },
    {
      path: StateRoot.staff.registerPath,
      name: 'StaffRegister',
      component: StaffRegister
    },
    {
      path: StateRoot.code.listPath,
      name: 'CodeList',
      component: CodeList
    },
    {
      path: StateRoot.code.detailPath + "/:id",
      name: 'CodeDetail',
      component: CodeDetail
    },
    {
      path: StateRoot.code.editPath,
      name: 'CodeEdit',
      component: CodeEdit
    },
    {
      path: StateRoot.code.registerPath,
      name: 'CodeRegister',
      component: CodeRegister
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(!auth.isAllowAction(to.path, StateRoot.session.roleList)) {
    console.log('UnAuthorize Action')
    router.push(Config.BAD_REQUEST_PATH)
  }
  auth.checkSession(to.path)
  if(from.path !== to.path) {
    statistics.store(to.path)
  }
  next()
})

router.afterEach((to, from) => {
})