import { apiHandleErr } from '@/module/errorHandler';
import { Config } from '@/conf/config';
import { createView } from '@/helpers/view';
import { FORM_MUTATION_TYPES } from '@/store/modules/form';
import { PATH_LIST } from '@/helpers/path';

export default {
  data: () => {
    return {
      data: {}
    }
  },
  created () {
    document.cookie = Config.FUNCTION_ID + this.screenId;
  },
  mounted() {
    this.findById(this.$route.params.id);
  },
  methods: {
    callApi: id => { /* callApi */ }, //<--- 個別に定義
    async findById(id) {
      const response = await this.callApi(id).catch(apiHandleErr);
      this.data = this.$_.head(response.data);
    },
    results() { 
      return createView(this.data, this.columSetting);
    },
    goEdit() {
      this.$store.commit(FORM_MUTATION_TYPES.SET_VALUES, this.data);
      this.$router.push({ path: this.editScreenId, query: { id: this.data.id } });
    },
  },
  computed: {
    screenId: () => null, //<--- 個別に定義
    namespace: () => null, //<--- 個別に定義
    columSetting: () => null, //<--- 個別に定義
    editScreenId() { return '/' + this.namespace + PATH_LIST.EDIT },
  },
}