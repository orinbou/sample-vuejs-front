import router from '@/router'
import store from '@/store'
import handler from '@/module/errorHandler'
import Screenlist from '@/conf/screenList'
import Config from '@/conf/config'

const isUnAuthorize = (targetPath) => {
  return Config.UNAUTHORITHED_PATH.find(path => targetPath.indexOf(path)!==-1)
}

const checkSessionErrorHandler = (error) => {
  if(error.response.status===401) {
    router.push(Config.SESSION_TIMEOUT_PATH)
  } else {
    handler.apiHandleErr(error)
  }
}

const checkSession = (path) => {
  if(!isUnAuthorize(path)) {
    store.dispatch('session/checkSession')
                .then(() => console.info('session available!'))
                .catch(checkSessionErrorHandler)
  }
}

const isAllowAction = (targetPath, roleList) => {
  const targetScreen = Screenlist.find(screen=>targetPath.indexOf(screen.url)!==-1)
  if(undefined === targetScreen) {
    return true //対象なしは許可
  }
  const allowRole = Object.keys(targetScreen).filter(key=>targetScreen[key]===true)
  return allowRole.some(role => role === "all" || roleList.includes(role))
}

export default {
  checkSession,
  isAllowAction,
}