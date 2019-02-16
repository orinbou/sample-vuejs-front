import is from 'is_js'
import { apiHandleErr } from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import { COMMON_MESSAGE } from '@/conf/message'
import { createView } from '@/helpers/view';
import { Config } from '@/conf/config'
import { isErrorPath } from '@/helpers/pathHelper'

export default {
  beforeRouteLeave (to, from, next) {
    //更新完了、エラーの場合は、確認ダイアログスキップ
    if( !this.store.updated && !isErrorPath(to.path)){
      this.confirmClean(to, next)
    } else {
      next()
    }
  },
  data: () => {
    return {
    }
  },
  created () {
    document.cookie = Config.FUNCTION_ID + this.screenId
  },
  mounted() {
    const query = this.$router.history.current.query
    if(!is.empty(query)) {
      console.log(this.$router.history.current.name + ' Update Start target = ' + query.id)
      this.findById(query.id)
    } else {
      this.$router.push(Config.BAD_REQUEST_PATH)
    }
  },
  methods: {
    doValidate() { return true }, //<--- 個別バリデーション
    customizeData(data) {}, //<--- 必要に応じ個別実装
    findById(id) {
      this.$store.dispatch(this.namespace + Type.FIND_BY_ID, id)
                  .catch(apiHandleErr)
    },
    results() { 
      return createView(this.data, this.columSetting);
    },
    confirmClean(to, next) {
      this.$showModal(
        COMMON_MESSAGE.CLEAR_CONFIRM, 
        undefined, 
        ()=>{
          this.$store.commit(this.namespace + Type.UNSET_ALL)
          if(to.path === Config.LOGOUT_PATH) {
            //編集画面の場合は、確認ダイアログを経てログアウト
            this.$logout()
          }
          next()
        },
        ()=>{/*cancel*/}
      )
    },
    async update() {
      const checkResult = await this.doValidate()
      if(this.existsEmptyNode() || !checkResult || this.hasError) return  //Validateはmixinされる前提

      let modifiedData = Object.assign({}, this.data)
      const getVaule = (key) => document.querySelector("[data-key='" + key + "']")

      //値の詰め替え
      Object.keys(this.store.data)
                    .filter(key => !is.null(getVaule(key)))
                    .forEach(key => modifiedData[key] = getVaule(key).value)

      this.customizeData(modifiedData)
      this.doUpdate(modifiedData)
    },
    doUpdate(modifiedData) {
      this.$store.dispatch(this.namespace + Type.UPDATE, modifiedData )
                    .then(async ()=> {
                      await this.$store.dispatch(this.namespace + Type.UPDATED)
                      this.$router.push(this.store.listPath)
                    })
                    .catch(apiHandleErr)
    },
    getType: (type) => type ? type : 'text',
  },
  computed: {
    type: () => 'update',
    screenId: () => null, //<--- 個別に定義
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    data() { return this.store.data },
    posting() { return this.store.posting },
  },
}